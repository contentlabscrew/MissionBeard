"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { ChoreCard } from "@/components/chorechamp/ChoreCard";
import { CompletionFlow } from "@/components/chorechamp/CompletionFlow";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Button } from "@/components/ui/button";
import { Chore } from "@/types/chorechamp";

export default function KidChoresPage() {
  const router = useRouter();
  const { data, getChoresForKid, submitCompletion } = useChoreChamp();
  const [completionChore, setCompletionChore] = useState<Chore | null>(null);

  const activeKid = data.settings.kids.find((k) => k.id === data.settings.activeKidId);
  if (!activeKid) {
    return (
      <EmptyState
        emoji="\u{1F914}"
        title="No kid selected"
        description="Go back and select who you are"
        action={<Button onClick={() => router.push("/")}>Go Back</Button>}
      />
    );
  }

  const chores = getChoresForKid(activeKid.id);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStr = todayStart.toISOString();

  const todayCompletions = data.completions.filter(
    (c) => c.kidId === activeKid.id && c.completedAt >= todayStr
  );

  const getChoreStatus = (choreId: string) => {
    const comp = todayCompletions.find((c) => c.choreId === choreId);
    if (!comp) return "available" as const;
    return comp.status as "pending" | "approved" | "rejected";
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-4">All Chores</h1>

      {chores.length === 0 ? (
        <EmptyState
          emoji="\u{1F9F9}"
          title="No chores yet"
          description="Your parent hasn't assigned any chores to you yet"
        />
      ) : (
        <div className="space-y-2">
          {chores.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              status={getChoreStatus(chore.id)}
              onComplete={() => setCompletionChore(chore)}
            />
          ))}
        </div>
      )}

      <CompletionFlow
        open={!!completionChore}
        onOpenChange={(open) => !open && setCompletionChore(null)}
        chore={completionChore}
        onSubmit={(choreId, photo) => submitCompletion(choreId, activeKid.id, photo)}
      />
    </div>
  );
}
