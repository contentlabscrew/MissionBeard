"use client";

import { useState } from "react";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { KidForm } from "@/components/chorechamp/KidForm";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Star, Clock, Flame } from "lucide-react";
import { Kid } from "@/types/chorechamp";

export default function ParentKidsPage() {
  const { data, getKidStats, deleteKid } = useChoreChamp();
  const [formOpen, setFormOpen] = useState(false);
  const [editKid, setEditKid] = useState<Kid | null>(null);

  const handleEdit = (kid: Kid) => {
    setEditKid(kid);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditKid(null);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this kid? Their data will be deleted.")) deleteKid(id);
  };

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Family</h1>
        <Button size="sm" onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1" />
          Add Kid
        </Button>
      </div>

      {data.settings.kids.length === 0 ? (
        <EmptyState
          emoji="\u{1F46A}"
          title="No kids yet"
          description="Add your kids to start assigning chores"
          action={
            <Button size="sm" onClick={handleNew}>
              <Plus className="h-4 w-4 mr-1" />
              Add Kid
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {data.settings.kids.map((kid) => {
            const stats = getKidStats(kid.id);
            return (
              <Card key={kid.id} className="overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: kid.color }} />
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-14 w-14 rounded-full flex items-center justify-center text-3xl shrink-0"
                      style={{ backgroundColor: kid.color + "20" }}
                    >
                      {kid.avatarEmoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{kid.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-cc-yellow" />
                          {stats.totalPoints} pts
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-cc-green" />
                          {stats.availableMinutes}m
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-cc-red" />
                          {stats.currentStreak}d
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(kid)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-cc-red" onClick={() => handleDelete(kid.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <KidForm open={formOpen} onOpenChange={setFormOpen} editKid={editKid} />
    </div>
  );
}
