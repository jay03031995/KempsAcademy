import {PageHero} from '@/components/ui/PageHero';
import {Accordion} from '@/components/ui/Accordion';
import {getCmsContent} from '@/lib/cms';
import Link from 'next/link';
import {buildMetadata} from '@/lib/seo';
export const metadata=buildMetadata({title:'Frequently asked questions',description:'Answers about Kemps programmes, eligibility, fees and training.',path:'/faqs'});
export default async function Page(){const {faqs}=await getCmsContent();return <><PageHero eyebrow="YOUR QUESTIONS, ANSWERED" title="Everything you’d like to know." description="Find answers about choosing a course, learning formats, practical training and getting started." crumbs={[{name:'FAQs',path:'/faqs'}]}/><section className="content-container inner-section faq-layout"><aside><h2>Before you enrol</h2><p>Start with the essentials. If you need advice specific to your qualification, our team can help.</p><Link className="gold-button" href="/contact">Ask a question</Link></aside><Accordion items={faqs.map(f=>({question:f.question,answer:f.answer}))}/></section></>}
