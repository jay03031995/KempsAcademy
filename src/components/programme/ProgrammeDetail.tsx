import {getCmsContent} from "@/lib/cms";
import type { Programme } from "@/lib/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { StickyEnquiry } from "@/components/programme/StickyEnquiry";
import { MobileCTA } from "@/components/programme/MobileCTA";
import { BatchList } from "@/components/programme/BatchList";
import { TrainerCard } from "@/components/trainer/TrainerCard";
import { ProgrammeCard } from "@/components/programme/ProgrammeCard";
import { Accordion } from "@/components/ui/Accordion";
import Image from "next/image";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Eligibility" },
  { id: "curriculum", label: "Curriculum" },
  { id: "practical-training", label: "Practical Training" },
  { id: "trainers", label: "Trainers" },
  { id: "batches", label: "Batches" },
  { id: "fees", label: "Fees" },
  { id: "faqs", label: "FAQs" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export async function ProgrammeDetail({ programme, basePath }: { programme: Programme; basePath: "courses" | "workshops" }) {
  const content = await getCmsContent();
  const trainers = content.trainers.filter((trainer) => programme.trainerSlugs.includes(trainer.slug));
  const today = new Date().toISOString().slice(0, 10);
  const batches = content.batches.filter((batch) => batch.programmeSlug === programme.slug && batch.startDate >= today).sort((a, b) => a.startDate.localeCompare(b.startDate));
  const faqs = content.faqs.filter(f => programme.faqSlugs.includes(f._id));
  const related = content.programmes.filter(p => p._id !== programme._id && p.categorySlug === programme.categorySlug).slice(0,3);
  const category = content.categories.find(c => c.slug === programme.categorySlug);
  const nextBatch = batches[0];
  const listLabel = basePath === "courses" ? "Courses" : "Workshops";

  return (
    <div className="programme-detail pb-24 lg:pb-0">
      <section className="programme-masthead"><div className="content-container">
        <Breadcrumbs items={[{name:"Home",path:"/"},{name:listLabel,path:`/${basePath}`},{name:programme.title,path:`/${basePath}/${programme.slug}`}]} />
        <div className="programme-masthead-grid"><div><p className="eyebrow">KEMPS ACADEMY · {category?.title || listLabel}</p><h1>{programme.title}</h1><p className="masthead-summary">{programme.summary}</p><div className="masthead-facts"><span>{programme.duration}</span><span>{programme.format}</span><span>{listLabel === "Courses" ? "Professional programme" : "Focused workshop"}</span></div><ButtonLink href="/admissions" className="mt-6">Enquire about this programme</ButtonLink></div><div className="programme-masthead-photo"><Image src={programme.image.url} alt={programme.image.alt} fill priority sizes="(max-width:768px) 100vw, 430px" className="object-cover"/>{programme.image.credit&&<span className="programme-photo-credit">{programme.image.credit}</span>}</div></div>
      </div></section>
      <div className="content-container programme-detail-grid">
        <div className="programme-detail-body">
          {/* Mobile-only quick facts + enquiry CTA (desktop uses sticky sidebar) */}
          <dl className="lg:hidden mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm rounded-2xl border border-blush p-4">
            <div><dt className="text-charcoal-muted">Duration</dt><dd className="font-medium">{programme.duration}</dd></div>
            <div><dt className="text-charcoal-muted">Format</dt><dd className="font-medium">{programme.format}</dd></div>
            <div><dt className="text-charcoal-muted">Next batch</dt><dd className="font-medium">{nextBatch ? formatDate(nextBatch.startDate) : "Contact admissions"}</dd></div>
            <div><dt className="text-charcoal-muted">Fees</dt><dd className="font-medium">{programme.feesVisible && programme.feeInfo ? programme.feeInfo : "Request Fee Details"}</dd></div>
          </dl>

          <nav aria-label="Section" className="detail-section-nav">
            <ul className="flex gap-1 px-1 min-w-max border-b border-blush">
              {sections.filter(s => s.id !== "trainers" || trainers.length > 0).map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block px-3 py-2 text-sm font-medium text-charcoal-muted hover:text-plum border-b-2 border-transparent hover:border-gold transition-colors duration-150"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section id="overview" className="pt-8 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Overview</h2>
            <ul className="mt-3 flex flex-col gap-2 text-charcoal-muted">
              {programme.learningObjectives.map((obj) => (
                <li key={obj} className="flex gap-2">
                  <span aria-hidden="true" className="text-gold-dark">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="eligibility" className="pt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Who This Is For &amp; Eligibility</h2>
            <ul className="mt-3 flex flex-col gap-2 text-charcoal-muted">
              {programme.eligibility.map((e) => (
                <li key={e} className="flex gap-2">
                  <span aria-hidden="true" className="text-gold-dark">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="curriculum" className="pt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Curriculum</h2>
            <div className="mt-4 flex flex-col gap-4">
              {programme.curriculum.map((mod) => (
                <div key={mod.title} className="rounded-2xl border border-blush p-5">
                  <h3 className="font-medium text-charcoal">{mod.title}</h3>
                  <p className="text-sm text-charcoal-muted mt-1">{mod.summary}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {mod.topics.map((t) => (
                      <li key={t} className="text-xs bg-blush text-plum rounded-full px-3 py-1">{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="practical-training" className="pt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Practical Training &amp; Assessment</h2>
            <p className="mt-3 text-charcoal-muted leading-relaxed">{programme.practicalTraining}</p>
            <p className="mt-3 text-charcoal-muted leading-relaxed"><span className="font-medium text-charcoal">Assessment: </span>{programme.assessment}</p>
            {programme.certification && (
              <p className="mt-3 text-charcoal-muted leading-relaxed"><span className="font-medium text-charcoal">Certification: </span>{programme.certification}</p>
            )}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-blush p-4">
                <p className="text-sm font-medium text-charcoal">Included</p>
                <ul className="mt-2 text-sm text-charcoal-muted flex flex-col gap-1">
                  {programme.included.map((i) => <li key={i}>✓ {i}</li>)}
                </ul>
              </div>
              {programme.excluded && programme.excluded.length > 0 && (
                <div className="rounded-2xl border border-blush p-4">
                  <p className="text-sm font-medium text-charcoal">Not Included</p>
                  <ul className="mt-2 text-sm text-charcoal-muted flex flex-col gap-1">
                    {programme.excluded.map((i) => <li key={i}>– {i}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {trainers.length > 0 && <section id="trainers" className="pt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Trainers</h2>
            <div className="mt-4 flex flex-col gap-5">
              {trainers.map((t, i) => <TrainerCard key={t._id} trainer={t} index={i} />)}
            </div>
          </section>}
          <section id="batches" className="pt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Upcoming Batches</h2>
            <div className="mt-4"><BatchList batches={batches} /></div>
          </section>

          <section id="fees" className="pt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-plum">Fees</h2>
            <p className="mt-3 text-charcoal-muted">
              {programme.feesVisible && programme.feeInfo
                ? programme.feeInfo
                : "Fees are confirmed by our admissions team based on the current batch. Submit an enquiry or contact admissions to request fee details."}
            </p>
          </section>

          {faqs.length > 0 && (
            <section id="faqs" className="pt-10 scroll-mt-24">
              <h2 className="text-xl font-semibold text-plum">FAQs</h2>
              <div className="mt-4"><Accordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} /></div>
            </section>
          )}

          {related.length > 0 && (
            <section className="pt-12">
              <h2 className="text-xl font-semibold text-plum">Related Programmes</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((p) => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </section>
          )}

          <div className="pt-10 lg:hidden">
            <ButtonLink href="/admissions" variant="primary" className="w-full">Speak to Admissions</ButtonLink>
          </div>
        </div>

        <StickyEnquiry programme={programme} nextBatch={nextBatch} />
      </div>

      <MobileCTA programme={programme} />
    </div>
  );
}
