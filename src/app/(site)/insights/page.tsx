import {PageHero} from '@/components/ui/PageHero';
import Image from "next/image";
import Link from "next/link";
import { getCmsContent } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Guidance on choosing programmes, understanding hands-on training, and evaluating trainer qualifications.",
  path: "/insights",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function InsightsPage() {
  const { articles } = await getCmsContent();
  return (
    <div className="resource-page">
      <PageHero eyebrow="LEARNING RESOURCES" title="Resources for better decisions." description="Practical reading on choosing a programme, understanding clinical training and preparing to learn." crumbs={[{name:'Insights',path:'/insights'}]} image="/images/indian/indian-clinical-training.jpg"/>
      <div className="content-container inner-section">
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Link
            key={a._id}
            href={`/insights/${a.slug}`}
            className="group flex flex-col rounded-2xl border border-blush bg-white overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-[3px] transition-all duration-200"
          >
            <div className="relative aspect-[16/9] bg-blush">
              <Image src={a.coverImage.url} alt={a.coverImage.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-xs text-charcoal-muted">{formatDate(a.publishedAt)}</span>
              <h2 className="font-semibold text-charcoal group-hover:text-plum transition-colors duration-150">{a.title}</h2>
              <p className="text-sm text-charcoal-muted line-clamp-2">{a.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}
