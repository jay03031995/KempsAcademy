import Link from "next/link";
import type { Batch } from "@/lib/types";
import { StatusBadge } from "@/components/ui/Badge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function BatchList({ batches, emptyMessage }: { batches: Batch[]; emptyMessage?: string }) {
  if (batches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-blush p-8 text-center text-charcoal-muted">
        {emptyMessage ?? "No upcoming batches are confirmed right now. Contact admissions for the next available date."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-blush bg-white">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-blush text-left text-charcoal-muted">
            <th className="py-3 px-4 font-medium">Programme</th>
            <th className="py-3 px-4 font-medium">Start Date</th>
            <th className="py-3 px-4 font-medium">Schedule</th>
            <th className="py-3 px-4 font-medium">Location</th>
            <th className="py-3 px-4 font-medium">Trainer</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium sr-only">Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => {
            const href = batch.programmeSlug && batch.programmeType ? `/${batch.programmeType === "course" ? "courses" : "workshops"}/${batch.programmeSlug}` : "/admissions";
            return (
              <tr key={batch._id} className="border-b border-blush last:border-0">
                <td className="py-3 px-4 font-medium text-charcoal">{batch.programmeTitle}</td>
                <td className="py-3 px-4 text-charcoal-muted">{formatDate(batch.startDate)}</td>
                <td className="py-3 px-4 text-charcoal-muted">{batch.schedule}</td>
                <td className="py-3 px-4 text-charcoal-muted">{batch.location} · {batch.mode}</td>
                <td className="py-3 px-4 text-charcoal-muted">{batch.trainerName || "To be confirmed"}</td>
                <td className="py-3 px-4"><StatusBadge status={batch.status} /></td>
                <td className="py-3 px-4">
                  <Link href={href} className="text-plum font-medium hover:underline whitespace-nowrap">
                    Enquire
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
