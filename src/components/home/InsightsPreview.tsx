import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCmsContent } from "@/lib/cms";

export async function InsightsPreview() {
  const { articles } = await getCmsContent();
  const latest = articles.slice(0, 3);
  if (!latest.length) return null;
  return (
    <section className="content-container py-16">
      <SectionHeading eyebrow="Insights" title="Latest from Kemps" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latest.map((a) => (
          <Link
            key={a._id}
            href={`/insights/${a.slug}`}
            className="group flex flex-col rounded-2xl border border-blush bg-white overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-[3px] transition-all duration-200"
          >
            <div className="relative aspect-[16/9] bg-blush">
              <Image src={a.coverImage.url} alt={a.coverImage.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="font-semibold text-charcoal group-hover:text-plum transition-colors duration-150">{a.title}</h3>
              <p className="text-sm text-charcoal-muted line-clamp-2">{a.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
