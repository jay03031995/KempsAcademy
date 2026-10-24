import { notFound } from "next/navigation";
import Image from "next/image";
import { getCmsContent } from "@/lib/cms";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getCmsContent()).articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = (await getCmsContent()).articles.find((item) => item.slug === slug);
  if (!article) return buildMetadata({ title: "Article Not Found", description: "", path: `/insights/${slug}`, noIndex: true });
  return buildMetadata({ title: article.title, description: article.summary, path: `/insights/${article.slug}` });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = (await getCmsContent()).articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const articleLd = articleJsonLd({
    headline: article.title,
    description: article.summary,
    path: `/insights/${article.slug}`,
    authorName: article.author,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: article.title, path: `/insights/${article.slug}` },
  ]);

  return (
    <article className="content-container article-page inner-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: article.title, path: `/insights/${article.slug}` }]} />

      <h1 className="mt-4 text-2xl md:text-4xl font-semibold text-plum">{article.title}</h1>
      <p className="mt-3 text-sm text-charcoal-muted">
        By {article.author} · Published {formatDate(article.publishedAt)}
        {article.updatedAt ? ` · Updated ${formatDate(article.updatedAt)}` : ""}
      </p>

      <div className="relative mt-6 aspect-[16/9] rounded-2xl overflow-hidden bg-blush">
        <Image src={article.coverImage.url} alt={article.coverImage.alt} fill className="object-cover" sizes="800px" priority />
      </div>

      <div className="mt-8 flex flex-col gap-5 text-charcoal leading-relaxed">
        {article.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
