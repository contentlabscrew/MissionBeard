"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { StatsBar } from "@/components/chorechamp/StatsBar";
import { ChoreCard } from "@/components/chorechamp/ChoreCard";
import { CompletionFlow } from "@/components/chorechamp/CompletionFlow";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Button } from "@/components/ui/button";
import { LogOut, Clock } from "lucide-react";
import { useState } from "react";
import { Chore } from "@/types/chorechamp";

export default function KidDashboard() {
  const router = useRouter();
  const { data, getKidStats, getChoresForKid, submitCompletion } = useChoreChamp();
  const [completionChore, setCompletionChore] = useState<Chore | null>(null);

  const activeKid = data.settings.kids.find((k) => k.id === data.settings.activeKidId);
  if (!activeKid) {
    return (
      <EmptyState
        emoji="\u{1F914}"
        title="No kid selected"
        description="Go back and select who you are"
        action={
          <Button onClick={() => router.push("/")}>Go Back</Button>
        }
      />
    );
  }

  const stats = getKidStats(activeKid.id);
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

  const availableChores = chores.filter((c) => getChoreStatus(c.id) === "available");
  const doneChores = chores.filter((c) => getChoreStatus(c.id) !== "available");

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: activeKid.color + "20" }}
          >
            {activeKid.avatarEmoji}
          </div>
          <div>
            <h1 className="text-xl font-black">Hey {activeKid.name}!</h1>
            <p className="text-sm text-gray-500">Ready to earn screen time?</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-gray-400"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Screen Time CTA */}
      {stats.availableMinutes > 0 && (
        <Link href="/chorechamp/kid/screentime">
          <div className="mt-4 bg-gradient-to-r from-cc-blue to-cc-purple text-white rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-sm font-medium opacity-80">Screen Time Available</p>
              <p className="text-2xl font-black">{stats.availableMinutes} minutes</p>
            </div>
            <Clock className="h-8 w-8 opacity-80" />
          </div>
        </Link>
      )}

      {/* Today's Chores */}
      <h2 className="font-bold text-gray-700 mt-6 mb-3">
        Today&apos;s Chores ({availableChores.length} remaining)
      </h2>

      {availableChores.length === 0 && doneChores.length === 0 ? (
        <EmptyState
          emoji="\u{1F3C6}"
          title="No chores assigned"
          description="Ask your parent to add some chores!"
        />
      ) : availableChores.length === 0 ? (
        <div className="text-center py-4 bg-cc-green/10 rounded-xl mb-4">
          <span className="text-3xl">{"\u{1F389}"}</span>
          <p className="font-bold text-cc-green mt-1">All done for today!</p>
        </div>
      ) : (
        <div className="space-y-2 mb-4">
          {availableChores.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              status="available"
              onComplete={() => setCompletionChore(chore)}
            />
          ))}
        </div>
      )}

      {/* Completed today */}
      {doneChores.length > 0 && (
        <>
          <h2 className="font-bold text-gray-700 mt-4 mb-3">
            Completed Today
          </h2>
          <div className="space-y-2">
            {doneChores.map((chore) => (
              <ChoreCard
                key={chore.id}
                chore={chore}
                status={getChoreStatus(chore.id)}
              />
            ))}
          </div>
        </>
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
