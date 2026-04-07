"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Kid, KidStats } from "@/types/chorechamp";
import { Clock, Star, Flame, AlertCircle } from "lucide-react";

interface KidOverviewCardProps {
  kid: Kid;
  stats: KidStats;
}

export function KidOverviewCard({ kid, stats }: KidOverviewCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: kid.color }} />
      <CardContent className="pt-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: kid.color + "20" }}
          >
            {kid.avatarEmoji}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{kid.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Flame className="h-3 w-3 text-cc-red" />
              <span>{stats.currentStreak} day streak</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <Star className="h-4 w-4 mx-auto text-cc-yellow mb-1" />
            <p className="text-sm font-bold">{stats.totalPoints}</p>
            <p className="text-[10px] text-gray-500">Points</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <Clock className="h-4 w-4 mx-auto text-cc-green mb-1" />
            <p className="text-sm font-bold">{stats.availableMinutes}m</p>
            <p className="text-[10px] text-gray-500">Available</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <AlertCircle className="h-4 w-4 mx-auto text-cc-purple mb-1" />
            <p className="text-sm font-bold">{stats.pendingApproval}</p>
            <p className="text-[10px] text-gray-500">Pending</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
