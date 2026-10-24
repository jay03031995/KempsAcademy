import { SectionHeading } from "@/components/ui/SectionHeading";
import { BatchList } from "@/components/programme/BatchList";
import { getCmsContent } from "@/lib/cms";
import { ButtonLink } from "@/components/ui/Button";

export async function UpcomingBatchesSection() {
  const { batches } = await getCmsContent();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = batches.filter((batch) => batch.startDate >= today).sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 5);
  return (
    <section className="content-container py-16">
      <SectionHeading eyebrow="Plan Ahead" title="Upcoming Batches" description="Past batches are removed automatically." />
      <div className="mt-8">
        <BatchList batches={upcoming} />
      </div>
      <ButtonLink href="/batches" variant="text" className="mt-6 inline-block">
        View all upcoming batches
      </ButtonLink>
    </section>
  );
}
