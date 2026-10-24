import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited } from "@/lib/rate-limit";
import { getCmsContent } from "@/lib/cms";
import { getEnquiryWriteClient } from "@/lib/sanity/server";

// Admissions enquiries are written only to the authenticated private dataset.

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^\+?[\d\s().-]{7,20}$/),
  email: z.string().trim().email().optional().or(z.literal("")),
  courseInterest: z.string().trim().max(200).optional(),
  qualification: z.string().trim().max(200).optional(),
  preferredContact: z.enum(["phone", "whatsapp", "email"]),
  consent: z.literal(true),
  source: z.string().trim().max(200).optional(),
  preferredDate: z.iso.date().optional().or(z.literal("")),
  preferredTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in.
  website: z.string().max(0).optional(),
}).superRefine((value, context) => {
  if (Boolean(value.preferredDate) !== Boolean(value.preferredTime)) {
    context.addIssue({ code: "custom", message: "Select both an appointment date and time, or leave both blank.", path: ["preferredDate"] });
  }
  const now = new Date();
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const currentTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
  if (value.preferredDate && (value.preferredDate < today || (value.preferredDate === today && value.preferredTime && value.preferredTime < currentTime))) {
    context.addIssue({ code: "custom", message: "Appointment date must not be in the past.", path: ["preferredDate"] });
  }
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
  }

  const { website, ...enquiry } = parsed.data;
  if (website) {
    // Honeypot tripped — pretend success, do not store or forward.
    return NextResponse.json({ ok: true });
  }

  const { programmes } = await getCmsContent();
  const programme = enquiry.courseInterest ? programmes.find((item) => item.slug === enquiry.courseInterest) : undefined;
  if (enquiry.courseInterest && !programme) {
    return NextResponse.json({ ok: false, error: "Please select a course from the list." }, { status: 400 });
  }

  try {
    await getEnquiryWriteClient().create({
      _type: enquiry.preferredDate ? "appointmentRequest" : "admissionEnquiry",
      fullName: enquiry.name,
      phone: enquiry.phone,
      ...(enquiry.email ? { email: enquiry.email } : {}),
      ...(programme ? { courseInterest: programme.title, courseSlug: programme.slug } : {}),
      ...(enquiry.qualification ? { qualification: enquiry.qualification } : {}),
      preferredContact: enquiry.preferredContact,
      ...(enquiry.preferredDate ? { requestedDate: enquiry.preferredDate, requestedTime: enquiry.preferredTime, timezone: "Asia/Kolkata" } : {}),
      consent: true,
      submittedAt: new Date().toISOString(),
      source: enquiry.source ?? "website",
      status: enquiry.preferredDate ? "requested" : "new",
    });
  } catch (error) {
    // Keep the error useful for server diagnostics without logging form data.
    console.error("Failed to persist submission in Sanity:", error instanceof Error ? error.message : "Unknown Sanity error");
    return NextResponse.json({ ok: false, error: "Something went wrong. Please call admissions directly." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
