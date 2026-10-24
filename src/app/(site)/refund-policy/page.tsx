import {PageHero} from '@/components/ui/PageHero';
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund & Cancellation Policy",
  description: "Kemps' policy on enrolment cancellations and refunds.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="policy-page">
      <PageHero eyebrow="ACADEMY INFORMATION" title="Refund & cancellation policy" description="Speak to admissions about the terms applicable to your chosen programme." crumbs={[{name:'Refund & cancellation policy',path:'/refund-policy'}]}/>
      <div className="content-container policy-content">

      <div className="mt-4 rounded-xl bg-blush/60 p-4 text-sm text-charcoal-muted">
        DRAFT — no approved refund/cancellation policy has been provided yet. Do not publish this page until Kemps
        confirms exact terms (cutoff windows, percentages, processing time). See CONTENT_CHECKLIST.md.
      </div>

      <div className="mt-6 flex flex-col gap-5 text-charcoal-muted leading-relaxed">
        <section>
          <h2 className="font-semibold text-charcoal">Cancellations before a batch starts</h2>
          <p className="mt-2">[CONFIG: specify the cancellation window and any applicable refund percentage.]</p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Cancellations after a batch starts</h2>
          <p className="mt-2">[CONFIG: specify whether partial refunds apply once training has begun.]</p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Rescheduling</h2>
          <p className="mt-2">[CONFIG: specify whether learners can transfer to a later batch, and any fee.]</p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">How to request a refund</h2>
          <p className="mt-2">Contact admissions directly at {siteSettings.email} or {siteSettings.phone}.</p>
        </section>
      </div>
      </div>
    </div>
  );
}
