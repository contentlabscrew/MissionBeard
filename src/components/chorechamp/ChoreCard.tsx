"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, CheckCircle } from "lucide-react";
import { Chore } from "@/types/chorechamp";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  easy: "bg-cc-green text-white",
  medium: "bg-cc-yellow text-white",
  hard: "bg-cc-red text-white",
};

interface ChoreCardProps {
  chore: Chore;
  status?: "available" | "pending" | "approved" | "rejected";
  onComplete?: () => void;
}

export function ChoreCard({ chore, status = "available", onComplete }: ChoreCardProps) {
  const isDone = status === "pending" || status === "approved";

  return (
    <Card className={cn("transition-all", isDone && "opacity-60")}>
      <CardContent className="py-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl shrink-0">{chore.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">{chore.title}</h3>
              <Badge className={cn("text-[10px]", difficultyColors[chore.difficulty])}>
                {chore.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-cc-yellow" />
                +{chore.points}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-cc-green" />
                +{chore.screenTimeMinutes}m
              </span>
            </div>
          </div>

          {status === "available" && onComplete && (
            <Button
              size="sm"
              className="bg-cc-green hover:bg-cc-green/90 text-white font-bold shrink-0"
              onClick={onComplete}
            >
              I Did It!
            </Button>
          )}
          {status === "pending" && (
            <Badge variant="warning" className="shrink-0 bg-cc-yellow text-white">
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </Badge>
          )}
          {status === "approved" && (
            <Badge variant="success" className="shrink-0">
              <CheckCircle className="h-3 w-3 mr-1" />
              Done
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
