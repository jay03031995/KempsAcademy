import {PageHero} from '@/components/ui/PageHero';
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getCmsContent } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Explore the treatments and techniques covered by our programme collection.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const { galleryItems } = await getCmsContent();
  return (
    <div className="resource-page">
      <PageHero eyebrow="TREATMENT PERSPECTIVES" title="A closer look at aesthetics." description="Explore the treatments and techniques covered in our programme collection. Photography is illustrative." crumbs={[{name:'Gallery',path:'/gallery'}]} image="/images/indian/indian-skin-training.png"/>
      <div className="content-container inner-section">
      <div className="mt-8"><GalleryGrid items={galleryItems} /></div>
      </div>
    </div>
  );
}
