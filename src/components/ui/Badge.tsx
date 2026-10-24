import type { ProgrammeStatus } from "@/lib/types";

const statusLabels: Record<ProgrammeStatus, string> = {
  open: "Open for enquiries",
  "filling-fast": "Filling fast",
  waitlist: "Waitlist only",
  closed: "Closed",
};

const statusStyles: Record<ProgrammeStatus, string> = {
  open: "bg-blush text-plum",
  "filling-fast": "bg-gold/20 text-gold-dark",
  waitlist: "bg-charcoal/10 text-charcoal-muted",
  closed: "bg-charcoal/10 text-charcoal-muted",
};

export function StatusBadge({ status }: { status: ProgrammeStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blush px-3 py-1 text-xs font-medium text-plum">
      {children}
    </span>
  );
}
