import { EnquiryForm } from "@/components/forms/EnquiryForm";
import {getCmsContent} from "@/lib/cms";

export async function AdmissionsEnquirySection() {
 const {siteSettings} = await getCmsContent();
  return (
    <section className="bg-plum py-16">
      <div className="content-container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="text-white flex flex-col gap-4">
          <span className="text-xs font-medium tracking-wide uppercase text-gold">Get Started</span>
          <h2 className="text-2xl md:text-3xl font-semibold">Have a Question? Talk to Admissions</h2>
          <p className="text-white/80 leading-relaxed max-w-md">
            Share a few details and an admissions counsellor will get in touch to discuss eligibility, available
            batches, and fees for {siteSettings.academyName}.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <EnquiryForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
