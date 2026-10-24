import { getCmsContent } from "@/lib/cms";

/**
 * Builds a compact, text-only snapshot of published content for "Ask Kemps"
 * to ground its answers in. Only published/approved content goes in here —
 * never raw enquiry/lead data.
 */
export async function buildAskKempsContext(): Promise<string> {
  const { programmes, trainers, faqs, categories, batches } = await getCmsContent();
  const categoryLines = categories.map((c) => `- ${c.title} (${c.slug}): ${c.description}`).join("\n");

  const programmeLines = programmes
    .map((p) => {
      const batch = batches.filter((item) => item.programmeSlug === p.slug && item.startDate >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
      return [
        `### ${p.title} [${p.type}] — slug: ${p.slug} — url: /${p.type === "course" ? "courses" : "workshops"}/${p.slug}`,
        `Category: ${p.categorySlug} | Duration: ${p.duration} | Format: ${p.format} | Location: ${p.location}`,
        `Eligibility: ${p.eligibility.join("; ")}`,
        `Summary: ${p.summary}`,
        `Practical training: ${p.practicalTraining}`,
        `Fees: ${p.feesVisible && p.feeInfo ? p.feeInfo : "Not published — direct to admissions"}`,
        `Next confirmed batch: ${batch ? `${batch.startDate} (${batch.status})` : "None confirmed — direct to admissions"}`,
      ].join("\n");
    })
    .join("\n\n");

  const trainerLines = trainers
    .map((t) => `- ${t.name} (${t.credentials}) — teaches: ${t.teachingAreas.join(", ")} — url: /trainers/${t.slug}`)
    .join("\n");

  const faqLines = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  return [
    "## Categories\n" + categoryLines,
    "## Programmes\n" + programmeLines,
    "## Trainers\n" + trainerLines,
    "## FAQs\n" + faqLines,
  ].join("\n\n");
}
