"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { ProgressRing } from "@/components/chorechamp/ProgressRing";
import { ScreenTimeTimer } from "@/components/chorechamp/ScreenTimeTimer";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Button } from "@/components/ui/button";
import { Clock, Play, Minus, Plus } from "lucide-react";

export default function ScreenTimePage() {
  const router = useRouter();
  const { data, getKidStats, startScreenTimeSession } = useChoreChamp();
  const [timerActive, setTimerActive] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(15);

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

  const stats = getKidStats(activeKid.id);

  const handleTimerComplete = (usedMinutes: number) => {
    startScreenTimeSession(activeKid.id, usedMinutes);
    setTimerActive(false);
  };

  if (timerActive) {
    return (
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold text-center mb-4">Screen Time</h1>
        <ScreenTimeTimer
          minutes={selectedMinutes}
          onComplete={handleTimerComplete}
          onCancel={() => setTimerActive(false)}
        />
      </div>
    );
  }

  const maxMinutes = Math.max(stats.earnedMinutes, 1);

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold text-center mb-6">Screen Time</h1>

      {/* Balance display */}
      <div className="flex justify-center mb-6">
        <ProgressRing
          value={stats.availableMinutes}
          max={maxMinutes}
          size={180}
          strokeWidth={14}
          color={stats.availableMinutes > 0 ? "var(--cc-green)" : "var(--cc-red)"}
        >
          <Clock className="h-6 w-6 text-gray-400 mb-1" />
          <p className="text-3xl font-black">{stats.availableMinutes}</p>
          <p className="text-xs text-gray-500">minutes left</p>
        </ProgressRing>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-cc-green/10 rounded-xl p-3 text-center">
          <p className="text-sm text-gray-500">Earned</p>
          <p className="text-xl font-bold text-cc-green">{stats.earnedMinutes}m</p>
        </div>
        <div className="bg-cc-blue/10 rounded-xl p-3 text-center">
          <p className="text-sm text-gray-500">Used</p>
          <p className="text-xl font-bold text-cc-blue">{stats.usedMinutes}m</p>
        </div>
      </div>

      {/* Start timer */}
      {stats.availableMinutes > 0 ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-bold text-center mb-4">Start a Session</h2>

          {/* Time selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10"
              onClick={() => setSelectedMinutes((m) => Math.max(5, m - 5))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <p className="text-4xl font-black">{selectedMinutes}</p>
              <p className="text-xs text-gray-500">minutes</p>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10"
              onClick={() => setSelectedMinutes((m) => Math.min(stats.availableMinutes, m + 5))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-cc-blue to-cc-purple hover:opacity-90 rounded-xl"
            onClick={() => setTimerActive(true)}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Timer
          </Button>
        </div>
      ) : (
        <div className="text-center bg-gray-50 rounded-2xl p-6">
          <span className="text-4xl">{"\u{1F6AB}"}</span>
          <h3 className="font-bold mt-2">No screen time available</h3>
          <p className="text-sm text-gray-500 mt-1">
            Complete some chores to earn more screen time!
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/chorechamp/kid/chores")}
          >
            View Chores
          </Button>
        </div>
      )}
    </div>
  );
}
