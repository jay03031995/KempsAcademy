import {getCmsContent} from "@/lib/cms";
import { notFound } from "next/navigation";
import {siteSettings} from "@/lib/content";
import { ProgrammeDetail } from "@/components/programme/ProgrammeDetail";
import { buildMetadata, courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getCmsContent()).programmes.filter(p => p.type === "workshop").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workshop = (await getCmsContent()).programmes.find(p => p.slug === slug);
  if (!workshop || workshop.type !== "workshop") return buildMetadata({ title: "Workshop Not Found", description: "", path: `/workshops/${slug}`, noIndex: true });
  return buildMetadata({
    title: workshop.seo?.metaTitle ?? workshop.title,
    description: workshop.seo?.metaDescription ?? workshop.summary,
    path: `/workshops/${workshop.slug}`,
  });
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workshop = (await getCmsContent()).programmes.find(p => p.slug === slug);
  if (!workshop || workshop.type !== "workshop") notFound();

  const courseLd = courseJsonLd({
    name: workshop.title,
    description: workshop.summary,
    path: `/workshops/${workshop.slug}`,
    providerName: siteSettings.academyName,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Workshops", path: "/workshops" },
    { name: workshop.title, path: `/workshops/${workshop.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProgrammeDetail programme={workshop} basePath="workshops" />
    </>
  );
}
