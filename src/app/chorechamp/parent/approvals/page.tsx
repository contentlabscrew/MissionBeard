"use client";

import { useChoreChamp } from "@/lib/chorechamp-context";
import { ApprovalCard } from "@/components/chorechamp/ApprovalCard";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Badge } from "@/components/ui/badge";

export default function ApprovalsPage() {
  const { data, approveCompletion, rejectCompletion } = useChoreChamp();
  const pending = data.completions.filter((c) => c.status === "pending");

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-xl font-bold">Approvals</h1>
        {pending.length > 0 && (
          <Badge variant="destructive">{pending.length}</Badge>
        )}
      </div>

      {pending.length === 0 ? (
        <EmptyState
          emoji="\u{2705}"
          title="All caught up!"
          description="No chores waiting for approval right now"
        />
      ) : (
        <div className="space-y-3">
          {pending.map((comp) => {
            const chore = data.chores.find((c) => c.id === comp.choreId);
            const kid = data.settings.kids.find((k) => k.id === comp.kidId);
            if (!chore || !kid) return null;
            return (
              <ApprovalCard
                key={comp.id}
                completion={comp}
                chore={chore}
                kid={kid}
                onApprove={() => approveCompletion(comp.id)}
                onReject={() => rejectCompletion(comp.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
