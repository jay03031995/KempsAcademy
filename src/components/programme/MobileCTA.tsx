"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import type { Programme } from "@/lib/types";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export function MobileCTA({ programme }: { programme: Programme }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-blush p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-full bg-plum text-white font-medium py-3 hover:bg-plum-dark transition-colors duration-200"
        >
          Enquire About {programme.title}
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-charcoal/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-end">
          <DialogPanel className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between mb-3">
              <Dialog.Title className="font-semibold text-plum">Enquire about this programme</Dialog.Title>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-blush">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <EnquiryForm presetCourseSlug={programme.slug} source={`programme-mobile:${programme.slug}`} compact />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
