import {getCmsContent} from "@/lib/cms";
import {ContentProvider} from "@/components/ContentProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { educationalOrganizationJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getCmsContent();
  const jsonLd = educationalOrganizationJsonLd();
  return (
    <ContentProvider content={content}><div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-plum focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div></ContentProvider>
  );
}
