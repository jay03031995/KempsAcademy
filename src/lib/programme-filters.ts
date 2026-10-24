import type { LearningMode, Programme } from "@/lib/types";

export type DurationBand = "short" | "medium" | "long";

export const durationBandLabels: Record<DurationBand, string> = {
  short: "Short (days)",
  medium: "Medium (weeks–3 months)",
  long: "Long (4+ months)",
};

export function getDurationBand(programme: Programme): DurationBand {
  const d = programme.duration.toLowerCase();
  if (d.includes("day") || d.includes("hour")) return "short";
  if (d.includes("week")) return "medium";
  const monthMatch = d.match(/(\d+)\s*month/);
  if (monthMatch) {
    const months = Number(monthMatch[1]);
    return months <= 3 ? "medium" : "long";
  }
  return "long";
}

export type EligibilityBand = "doctors" | "open";

export function getEligibilityBand(programme: Programme): EligibilityBand {
  const text = programme.eligibility.join(" ").toLowerCase();
  return text.includes("mbbs") || text.includes("medical registration") || text.includes("licensed") || text.includes("bds") || text.includes("md") ? "doctors" : "open";
}

export const eligibilityBandLabels: Record<EligibilityBand, string> = {
  doctors: "Medical professionals",
  open: "Non-medical entry routes",
};

export interface ProgrammeFilters {
  q?: string;
  category?: string;
  mode?: LearningMode;
  duration?: DurationBand;
  eligibility?: EligibilityBand;
}

export function filterProgrammes(programmes: Programme[], filters: ProgrammeFilters): Programme[] {
  const q = filters.q?.trim().toLowerCase();
  return programmes.filter((p) => {
    if (q) {
      const haystack = `${p.title} ${p.summary} ${p.eligibility.join(" ")}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.category && p.categorySlug !== filters.category) return false;
    if (filters.mode && p.format !== filters.mode) return false;
    if (filters.duration && getDurationBand(p) !== filters.duration) return false;
    if (filters.eligibility && getEligibilityBand(p) !== filters.eligibility) return false;
    return true;
  });
}
