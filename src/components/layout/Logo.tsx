"use client";
import Image from "next/image";
import {useContent} from "@/components/ContentProvider";
export function Logo({ className = "" }: { className?: string }) {
  const {siteSettings} = useContent();
  if (siteSettings.logo?.url && !siteSettings.logo.url.includes("placeholder")) return <Image src={siteSettings.logo.url} alt={siteSettings.logo.alt || siteSettings.academyName} width={145} height={48} className={`max-h-12 w-auto object-contain ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="shrink-0">
        <path d="M17 3c3.5 2 5.5 5.6 5.5 9.4 0 3.4-2 6-5.5 6s-5.5-2.6-5.5-6C11.5 8.6 13.5 5 17 3z" fill="var(--color-plum)" />
        <path d="M17 13.4c3.6-1 7.3.2 9.8 3 2.3 2.6 2.9 6.1.7 8.4-2.1 2.2-5.8 1.7-8.4-.7-2.6-2.4-3.6-6.7-2.1-10.7z" fill="var(--color-gold)" opacity="0.9" />
        <path d="M17 13.4c-3.6-1-7.3.2-9.8 3-2.3 2.6-2.9 6.1-.7 8.4 2.1 2.2 5.8 1.7 8.4-.7 2.6-2.4 3.6-6.7 2.1-10.7z" fill="var(--color-plum)" opacity="0.75" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-tight text-plum">KEMPS</span>
        <span className="text-[10px] font-medium tracking-[0.2em] text-gold-dark">ACADEMY</span>
      </span>
    </span>
  );
}
