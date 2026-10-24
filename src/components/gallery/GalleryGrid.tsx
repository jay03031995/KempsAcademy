"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import type { GalleryItem } from "@/lib/types";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? items[activeIndex] : null;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-blush p-12 text-center">
        <p className="font-medium text-charcoal">Gallery photos are coming soon.</p>
        <p className="text-sm text-charcoal-muted mt-2">
          Real training-room and facility photography is being added. Contact admissions to arrange an in-person
          visit in the meantime.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square rounded-xl overflow-hidden bg-blush focus-visible:outline-2"
          >
            <Image src={item.image.url} alt={item.image.alt} fill className="object-cover hover:scale-105 transition-transform duration-200" sizes="25vw" />
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onClose={() => setActiveIndex(null)} className="relative z-50">
        <div className="fixed inset-0 bg-charcoal/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-3xl w-full">
            {active && (
              <figure>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={active.image.url} alt={active.image.alt} fill className="object-cover" sizes="800px" />
                </div>
                <figcaption className="text-white text-sm mt-3 text-center">{active.caption}</figcaption>
              </figure>
            )}
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="mt-4 mx-auto flex items-center justify-center rounded-full bg-white/10 text-white px-4 py-2 text-sm hover:bg-white/20"
            >
              Close
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
