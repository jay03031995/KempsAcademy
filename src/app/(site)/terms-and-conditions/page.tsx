import {PageHero} from '@/components/ui/PageHero';
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms governing use of the Kemps website and enrolment in Kemps programmes.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <div className="policy-page">
      <PageHero eyebrow="ACADEMY INFORMATION" title="Terms & conditions" description="Information about using the website and enquiring about programmes." crumbs={[{name:'Terms & conditions',path:'/terms-and-conditions'}]}/>
      <div className="content-container policy-content">

      <div className="mt-4 rounded-xl bg-blush/60 p-4 text-sm text-charcoal-muted">
        DRAFT — this page has not been reviewed or approved by Kemps&apos; legal counsel. Replace this draft with the
        academy&apos;s approved terms before launch. See CONTENT_CHECKLIST.md.
      </div>

      <div className="mt-6 flex flex-col gap-5 text-charcoal-muted leading-relaxed">
        <section>
          <h2 className="font-semibold text-charcoal">Use of this website</h2>
          <p className="mt-2">
            This website is provided for informational purposes to help you learn about Kemps&apos; courses, workshops,
            and trainers. It is not a substitute for direct communication with our admissions team.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Enquiries are not enrolment</h2>
          <p className="mt-2">
            Submitting an enquiry or application form does not confirm a seat in any batch. Enrolment is confirmed
            only after eligibility verification and any required payment, as communicated directly by admissions.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Scope of training</h2>
          <p className="mt-2">
            Completing a Kemps programme does not itself grant a professional licence or authorise independent
            performance of medical or cosmetic procedures. Learners remain responsible for complying with
            applicable professional regulations.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Intellectual property</h2>
          <p className="mt-2">
            Course materials, curricula, and website content are the property of Kemps and may not be reproduced
            without permission. [CONFIG: confirm exact IP ownership terms.]
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Contact</h2>
          <p className="mt-2">Questions about these terms can be directed to {siteSettings.email}.</p>
        </section>
      </div>
      </div>
    </div>
  );
}
