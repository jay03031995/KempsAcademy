import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    title: "Trainer-led, not video-led",
    description: "Every module is taught directly by a verified, practicing dermatologist — not a pre-recorded course.",
  },
  {
    title: "Supervised hands-on practice",
    description: "Theory and demonstration are followed by supervised, hands-on practice sessions, not observation alone.",
  },
  {
    title: "Structured curriculum",
    description: "Each programme is broken into clear modules with defined learning objectives, not an open-ended syllabus.",
  },
  {
    title: "Small, focused batches",
    description: "Workshops and courses run in small batches so trainer supervision stays meaningful throughout.",
  },
];

export function WhyLearn() {
  return (
    <section className="content-container py-16">
      <SectionHeading eyebrow="Why Kemps" title="Why Learn at Kemps?" align="center" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-blush bg-white p-6">
            <h3 className="font-semibold text-plum">{b.title}</h3>
            <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
