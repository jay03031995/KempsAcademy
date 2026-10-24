"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {trainers, articles} from "@/lib/content";
import {useContent} from "@/components/ContentProvider";
import type {Programme,FaqItem} from "@/lib/types";

interface Result {
  type: "Course" | "Workshop" | "Trainer" | "Article" | "FAQ";
  title: string;
  description: string;
  href: string;
}

function buildIndex(programmes:Programme[], faqs:FaqItem[]): Result[] {
  return [
    ...programmes.map((p) => ({
      type: p.type === "course" ? ("Course" as const) : ("Workshop" as const),
      title: p.title,
      description: p.summary,
      href: `/${p.type === "course" ? "courses" : "workshops"}/${p.slug}`,
    })),
    ...trainers.map((t) => ({
      type: "Trainer" as const,
      title: t.name,
      description: t.credentials,
      href: `/trainers/${t.slug}`,
    })),
    ...articles.map((a) => ({
      type: "Article" as const,
      title: a.title,
      description: a.summary,
      href: `/insights/${a.slug}`,
    })),
    ...faqs.map((f) => ({
      type: "FAQ" as const,
      title: f.question,
      description: f.answer,
      href: `/faqs`,
    })),
  ];
}

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const {programmes,faqs} = useContent();
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildIndex(programmes,faqs), [programmes,faqs]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, index]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-charcoal/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-start justify-center p-4 pt-24">
        <DialogPanel className="w-full max-w-xl rounded-2xl bg-white shadow-[var(--shadow-card-hover)] p-5">
          <Dialog.Title className="sr-only">Search Kemps</Dialog.Title>
          <label htmlFor="site-search" className="sr-only">
            Search courses, workshops, trainers, and articles
          </label>
          <div className="flex items-center gap-3 border-b border-blush pb-3">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" className="text-charcoal-muted shrink-0">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="site-search"
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, workshops, trainers, articles…"
              className="w-full outline-none text-base placeholder:text-charcoal-muted"
            />
          </div>

          <div className="mt-3 max-h-80 overflow-y-auto">
            {query.trim() === "" && (
              <p className="text-sm text-charcoal-muted py-6 text-center">Start typing to search Kemps.</p>
            )}
            {query.trim() !== "" && results.length === 0 && (
              <p className="text-sm text-charcoal-muted py-6 text-center">
                No results for &ldquo;{query}&rdquo;. Try a different term, or{" "}
                <Link href="/contact" onClick={onClose} className="text-plum underline">
                  ask admissions
                </Link>
                .
              </p>
            )}
            <ul className="flex flex-col divide-y divide-blush">
              {results.map((r) => (
                <li key={`${r.type}-${r.title}`}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex flex-col gap-0.5 py-3 px-1 rounded-lg hover:bg-blush transition-colors duration-150"
                  >
                    <span className="text-xs font-medium text-gold-dark uppercase tracking-wide">{r.type}</span>
                    <span className="font-medium text-charcoal">{r.title}</span>
                    <span className="text-sm text-charcoal-muted line-clamp-1">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
