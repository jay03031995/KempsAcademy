"use client";

import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import Link from "next/link";
import {useContent} from "@/components/ContentProvider";

export function MobileNav({
  open,
  onClose,
  onAskKemps,
}: {
  open: boolean;
  onClose: () => void;
  onAskKemps: () => void;
}) {
  const {categories, siteSettings, navigation} = useContent();
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <div className="fixed inset-0 bg-charcoal/40" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="h-full w-full max-w-sm bg-white p-5 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-plum">Menu</Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 hover:bg-blush transition-colors duration-150"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            <Disclosure>
              <DisclosureButton className="flex w-full items-center justify-between py-3 text-left font-medium text-charcoal border-b border-blush">
                Courses
                <span aria-hidden="true">+</span>
              </DisclosureButton>
              <DisclosurePanel className="pl-3 pb-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/courses?category=${c.slug}`}
                    onClick={onClose}
                    className="block py-2 text-sm text-charcoal-muted hover:text-plum"
                  >
                    {c.title}
                  </Link>
                ))}
                <Link href="/courses" onClick={onClose} className="block py-2 text-sm font-medium text-gold-dark">
                  View All Courses
                </Link>
              </DisclosurePanel>
            </Disclosure>

            {navigation.primaryLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={onClose}
                className="py-3 font-medium text-charcoal border-b border-blush hover:text-plum"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onAskKemps();
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-blush px-5 py-3 font-medium text-plum hover:bg-blush transition-colors duration-150"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6L8 1z" fill="currentColor" />
              </svg>
              Ask Kemps
            </button>
            <Link
              href="/admissions"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-full bg-plum px-5 py-3 font-medium text-white hover:bg-plum-dark transition-colors duration-150"
            >
              {siteSettings.admissionsCtaLabel}
            </Link>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
