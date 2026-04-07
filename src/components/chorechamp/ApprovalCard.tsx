"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Clock, Star, Camera } from "lucide-react";
import { ChoreCompletion, Chore, Kid } from "@/types/chorechamp";

interface ApprovalCardProps {
  completion: ChoreCompletion;
  chore: Chore;
  kid: Kid;
  onApprove: () => void;
  onReject: () => void;
}

export function ApprovalCard({ completion, chore, kid, onApprove, onReject }: ApprovalCardProps) {
  const timeAgo = getTimeAgo(completion.completedAt);

  return (
    <Card className="overflow-hidden">
      <div className="h-1" style={{ backgroundColor: kid.color }} />
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-xl shrink-0"
            style={{ backgroundColor: kid.color + "20" }}
          >
            {kid.avatarEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">{kid.name}</h3>
              <span className="text-xs text-gray-400">{timeAgo}</span>
            </div>
            <p className="text-sm text-gray-700 mt-0.5">
              Completed <strong>{chore.icon} {chore.title}</strong>
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-cc-yellow" />
                +{chore.points} pts
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-cc-green" />
                +{chore.screenTimeMinutes} min
              </span>
            </div>

            {completion.photoDataUrl && (
              <div className="mt-2 relative">
                <Camera className="h-3 w-3 absolute top-2 left-2 text-white drop-shadow-md" />
                <img
                  src={completion.photoDataUrl}
                  alt="Proof"
                  className="rounded-lg w-full max-h-40 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            className="flex-1 bg-cc-green hover:bg-cc-green/90"
            onClick={onApprove}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-cc-red border-cc-red/30 hover:bg-cc-red/10"
            onClick={onReject}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
