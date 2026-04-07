"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { KidOverviewCard } from "@/components/chorechamp/KidOverviewCard";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, LogOut, CheckCircle, X } from "lucide-react";

export default function ParentDashboard() {
  const router = useRouter();
  const { data, getKidStats, approveCompletion, rejectCompletion } = useChoreChamp();
  const { kids } = data.settings;
  const pendingCompletions = data.completions.filter((c) => c.status === "pending");

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Chore<span className="text-primary">Champ</span>
          </h1>
          <p className="text-sm text-gray-500">Parent Dashboard</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-gray-400"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Exit
        </Button>
      </div>

      {/* Kids overview */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-700">Kids</h2>
        <Link href="/chorechamp/parent/kids">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </Link>
      </div>

      {kids.length === 0 ? (
        <EmptyState
          emoji="\u{1F46A}"
          title="No kids yet"
          description="Add your first kid to get started"
          action={
            <Link href="/chorechamp/parent/kids">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Kid
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3 mb-6">
          {kids.map((kid) => (
            <KidOverviewCard key={kid.id} kid={kid} stats={getKidStats(kid.id)} />
          ))}
        </div>
      )}

      {/* Pending approvals preview */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-700">
          Pending Approvals
          {pendingCompletions.length > 0 && (
            <Badge variant="destructive" className="ml-2">{pendingCompletions.length}</Badge>
          )}
        </h2>
        {pendingCompletions.length > 0 && (
          <Link href="/chorechamp/parent/approvals">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        )}
      </div>

      {pendingCompletions.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center text-gray-500 text-sm">
            All caught up! No pending approvals.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {pendingCompletions.slice(0, 3).map((comp) => {
            const chore = data.chores.find((c) => c.id === comp.choreId);
            const kid = kids.find((k) => k.id === comp.kidId);
            if (!chore || !kid) return null;
            return (
              <Card key={comp.id}>
                <CardContent className="py-3 flex items-center gap-3">
                  <span className="text-2xl">{kid.avatarEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{chore.title}</p>
                    <p className="text-xs text-gray-500">{kid.name}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-cc-green hover:bg-cc-green/90"
                      onClick={() => approveCompletion(comp.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 text-cc-red border-cc-red/30"
                      onClick={() => rejectCompletion(comp.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
