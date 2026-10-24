import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import {getCmsContent} from "@/lib/cms";
import { ButtonLink } from "@/components/ui/Button";

export async function FaqSection() {
  const {faqs} = await getCmsContent();
  return (
    <section className="content-container py-16">
      <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" align="center" />
      <div className="mt-8 max-w-2xl mx-auto">
        <Accordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        <ButtonLink href="/faqs" variant="text" className="mt-6 inline-block">
          See all FAQs
        </ButtonLink>
      </div>
    </section>
  );
}
