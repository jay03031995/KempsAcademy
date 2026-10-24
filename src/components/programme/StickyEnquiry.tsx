import { EnquiryForm } from "@/components/forms/EnquiryForm";
import type { Programme } from "@/lib/types";
import type { Batch } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function StickyEnquiry({ programme, nextBatch }: { programme: Programme; nextBatch?: Batch }) {
  return (
    <aside className="programme-enquiry hidden lg:block">
      <div className="sticky top-28 rounded-2xl border border-blush bg-white p-6 shadow-[var(--shadow-card)]">
        <p className="enquiry-card-label">YOUR PROGRAMME AT A GLANCE</p>
        <dl className="flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Duration</dt>
            <dd className="font-medium text-charcoal text-right">{programme.duration}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Format</dt>
            <dd className="font-medium text-charcoal text-right">{programme.format}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Location</dt>
            <dd className="font-medium text-charcoal text-right">{programme.location}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Next batch</dt>
            <dd className="font-medium text-charcoal text-right">
              {nextBatch ? formatDate(nextBatch.startDate) : "Contact admissions"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Fees</dt>
            <dd className="font-medium text-charcoal text-right">
              {programme.feesVisible && programme.feeInfo ? programme.feeInfo : "Request Fee Details"}
            </dd>
          </div>
        </dl>

        {programme.brochureUrl ? (
          <a
            href={programme.brochureUrl}
            className="mt-5 flex w-full items-center justify-center rounded-full border border-plum text-plum px-5 py-2.5 text-sm font-medium hover:bg-blush transition-colors duration-150"
          >
            Download Brochure
          </a>
        ) : null}

        <div className="mt-5 pt-5 border-t border-blush">
          <p className="text-sm font-medium text-charcoal mb-3">Enquire about this programme</p>
          <EnquiryForm presetCourseSlug={programme.slug} source={`programme:${programme.slug}`} compact />
        </div>
      </div>
    </aside>
  );
}
