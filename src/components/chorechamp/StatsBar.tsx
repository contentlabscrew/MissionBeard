"use client";

import { Flame, Star, Clock } from "lucide-react";
import { KidStats } from "@/types/chorechamp";

export function StatsBar({ stats }: { stats: KidStats }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 text-center">
        <Flame className="h-5 w-5 mx-auto text-cc-red mb-1" />
        <p className="text-lg font-black">{stats.currentStreak}</p>
        <p className="text-[10px] text-gray-500 font-medium">Day Streak</p>
      </div>
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-3 text-center">
        <Star className="h-5 w-5 mx-auto text-cc-yellow mb-1" />
        <p className="text-lg font-black">{stats.totalPoints}</p>
        <p className="text-[10px] text-gray-500 font-medium">Points</p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-center">
        <Clock className="h-5 w-5 mx-auto text-cc-green mb-1" />
        <p className="text-lg font-black">{stats.availableMinutes}m</p>
        <p className="text-[10px] text-gray-500 font-medium">Screen Time</p>
      </div>
    </div>
  );
}
