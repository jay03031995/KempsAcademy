import {PageHero} from '@/components/ui/PageHero';
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Kemps collects, uses, and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="policy-page">
      <PageHero eyebrow="ACADEMY INFORMATION" title="Privacy policy" description="How enquiry information is collected, used and protected." crumbs={[{name:'Privacy policy',path:'/privacy-policy'}]}/>
      <div className="content-container policy-content">

      <div className="mt-4 rounded-xl bg-blush/60 p-4 text-sm text-charcoal-muted">
        DRAFT — this page has not been reviewed or approved by Kemps&apos; legal counsel. Replace this draft with the
        academy&apos;s approved policy before launch. See CONTENT_CHECKLIST.md.
      </div>

      <div className="mt-6 flex flex-col gap-5 text-charcoal-muted leading-relaxed">
        <section>
          <h2 className="font-semibold text-charcoal">What we collect</h2>
          <p className="mt-2">
            When you submit an enquiry or brochure request, we collect your name, phone number, and any additional
            details you choose to share (such as email, qualification, or course interest).
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">How we use it</h2>
          <p className="mt-2">
            We use this information to respond to your enquiry, discuss eligibility and batch availability, and
            share relevant programme information. We do not sell your personal information to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">How we store it</h2>
          <p className="mt-2">
            Enquiry data is stored in our private admissions system and is not publicly accessible. [CONFIG:
            specify retention period and any third-party processors once confirmed.]
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Your rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your personal information by contacting us at{" "}
            {siteSettings.email}.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-charcoal">Contact</h2>
          <p className="mt-2">Questions about this policy can be directed to {siteSettings.email}.</p>
        </section>
      </div>
      </div>
    </div>
  );
}
