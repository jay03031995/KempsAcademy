import {getCmsContent} from "@/lib/cms";
import { notFound } from "next/navigation";
import {siteSettings} from "@/lib/content";
import { ProgrammeDetail } from "@/components/programme/ProgrammeDetail";
import { buildMetadata, courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getCmsContent()).programmes.filter(p => p.type === "course").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = (await getCmsContent()).programmes.find(p => p.slug === slug);
  if (!course || course.type !== "course") return buildMetadata({ title: "Course Not Found", description: "", path: `/courses/${slug}`, noIndex: true });
  return buildMetadata({
    title: course.seo?.metaTitle ?? course.title,
    description: course.seo?.metaDescription ?? course.summary,
    path: `/courses/${course.slug}`,
  });
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = (await getCmsContent()).programmes.find(p => p.slug === slug);
  if (!course || course.type !== "course") notFound();

  const courseLd = courseJsonLd({
    name: course.title,
    description: course.summary,
    path: `/courses/${course.slug}`,
    providerName: siteSettings.academyName,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: course.title, path: `/courses/${course.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProgrammeDetail programme={course} basePath="courses" />
    </>
  );
}
