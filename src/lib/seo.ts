import type { Metadata } from "next";
import { siteSettings } from "@/lib/content";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-kemps-academy.com";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, path, ogImage, noIndex } = opts;
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSettings.academyName,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export function educationalOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteSettings.academyName,
    url: SITE_URL,
    logo: absoluteUrl(siteSettings.logo.url),
    ...(siteSettings.address.startsWith("[CONFIG") ? {} : { address: siteSettings.address }),
    ...(siteSettings.email.startsWith("[CONFIG") ? {} : { email: siteSettings.email }),
    ...(siteSettings.phone.startsWith("[CONFIG") ? {} : { telephone: siteSettings.phone }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function courseJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  providerName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: {
      "@type": "EducationalOrganization",
      name: opts.providerName,
      sameAs: SITE_URL,
    },
  };
}

export function personJsonLd(opts: { name: string; jobTitle: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    description: opts.description,
    url: absoluteUrl(opts.path),
  };
}

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    author: { "@type": "Person", name: opts.authorName },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
  };
}
