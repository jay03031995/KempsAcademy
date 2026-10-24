"use client";

import { useState, type FormEvent } from "react";
import {useContent} from "@/components/ContentProvider";

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({
  presetCourseSlug,
  source,
  compact = false,
}: {
  presetCourseSlug?: string;
  source?: string;
  compact?: boolean;
}) {
  const {programmes} = useContent();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const todayInIndia = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      courseInterest: String(data.get("courseInterest") ?? ""),
      qualification: String(data.get("qualification") ?? ""),
      preferredContact: String(data.get("preferredContact") ?? "phone"),
      consent: data.get("consent") === "on",
      source: source ?? "website",
      preferredDate: String(data.get("preferredDate") ?? ""),
      preferredTime: String(data.get("preferredTime") ?? ""),
      website: String(data.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setAppointmentRequested(Boolean(payload.preferredDate));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-blush bg-blush/60 p-6 text-center">
        <p className="font-semibold text-plum">{appointmentRequested ? "Thanks — your appointment request has been received." : "Thanks — your enquiry has been received."}</p>
        <p className="text-sm text-charcoal-muted mt-2">
          {appointmentRequested ? "Our team will contact you to confirm availability. Your requested date and time are not reserved until confirmed." : "An admissions counsellor will reach out using your preferred contact method. This does not confirm a seat in any batch."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${compact ? "" : "max-w-xl"}`} noValidate>
      {/* Honeypot — hidden from real users, left blank. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-charcoal">Full name</label>
        <input id="name" name="name" type="text" required minLength={2} maxLength={120}
          className="rounded-xl border border-blush px-4 py-2.5 text-sm focus-visible:outline-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-charcoal">Phone number</label>
          <input id="phone" name="phone" type="tel" required minLength={7} maxLength={20}
            className="rounded-xl border border-blush px-4 py-2.5 text-sm focus-visible:outline-2" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-charcoal">Email <span className="text-charcoal-muted font-normal">(optional)</span></label>
          <input id="email" name="email" type="email" maxLength={200}
            className="rounded-xl border border-blush px-4 py-2.5 text-sm focus-visible:outline-2" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="courseInterest" className="text-sm font-medium text-charcoal">Course of interest</label>
        <select id="courseInterest" name="courseInterest" defaultValue={presetCourseSlug ?? ""}
          className="rounded-xl border border-blush px-4 py-2.5 text-sm bg-white focus-visible:outline-2">
          <option value="">Not sure yet — help me choose</option>
          {programmes.map((p) => (
            <option key={p.slug} value={p.slug}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="qualification" className="text-sm font-medium text-charcoal">Highest qualification</label>
        <input id="qualification" name="qualification" type="text" maxLength={200} placeholder="e.g. MBBS"
          className="rounded-xl border border-blush px-4 py-2.5 text-sm focus-visible:outline-2" />
      </div>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredDate" className="text-sm font-medium text-charcoal">Request an appointment date <span className="text-charcoal-muted font-normal">(optional)</span></label>
          <input id="preferredDate" name="preferredDate" type="date" min={todayInIndia} className="rounded-xl border border-blush px-4 py-2.5 text-sm focus-visible:outline-2" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredTime" className="text-sm font-medium text-charcoal">Preferred time</label>
          <input id="preferredTime" name="preferredTime" type="time" className="rounded-xl border border-blush px-4 py-2.5 text-sm focus-visible:outline-2" />
        </div>
        <p className="text-xs text-charcoal-muted sm:col-span-2">A date and time are a request only. Admissions will confirm availability with you.</p>
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-sm font-medium text-charcoal">Preferred contact method</legend>
        <div className="flex flex-wrap gap-4 mt-1">
          {(["phone", "whatsapp", "email"] as const).map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm text-charcoal-muted">
              <input type="radio" name="preferredContact" value={method} defaultChecked={method === "phone"} />
              {method === "phone" ? "Phone call" : method === "whatsapp" ? "WhatsApp" : "Email"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-2.5 text-sm text-charcoal-muted">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>I agree to be contacted by Kemps admissions regarding this enquiry.</span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-2.5">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-plum px-5 py-3 font-medium text-white hover:bg-plum-dark transition-colors duration-200 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit Enquiry"}
      </button>
      <p className="text-xs text-charcoal-muted">
        Submitting this form does not confirm admission or a batch seat — admissions will follow up to confirm eligibility and availability.
      </p>
    </form>
  );
}
