"use client";

import { useState } from "react";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { ChoreForm } from "@/components/chorechamp/ChoreForm";
import { EmptyState } from "@/components/chorechamp/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Clock, Star } from "lucide-react";
import { Chore } from "@/types/chorechamp";

const difficultyColors: Record<string, string> = {
  easy: "bg-cc-green text-white",
  medium: "bg-cc-yellow text-white",
  hard: "bg-cc-red text-white",
};

export default function ParentChoresPage() {
  const { data, deleteChore } = useChoreChamp();
  const [formOpen, setFormOpen] = useState(false);
  const [editChore, setEditChore] = useState<Chore | null>(null);

  const handleEdit = (chore: Chore) => {
    setEditChore(chore);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditChore(null);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this chore?")) deleteChore(id);
  };

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Chore Management</h1>
        <Button size="sm" onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>

      {data.chores.length === 0 ? (
        <EmptyState
          emoji="\u{1F9F9}"
          title="No chores yet"
          description="Create chores for your kids to complete"
          action={
            <Button size="sm" onClick={handleNew}>
              <Plus className="h-4 w-4 mr-1" />
              Create Chore
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {data.chores.map((chore) => {
            const assignedKids = data.settings.kids.filter((k) =>
              chore.assignedKidIds.includes(k.id)
            );
            return (
              <Card key={chore.id}>
                <CardContent className="py-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{chore.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{chore.title}</h3>
                        <Badge className={difficultyColors[chore.difficulty]}>
                          {chore.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{chore.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-cc-yellow" />
                          {chore.points} pts
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-cc-green" />
                          {chore.screenTimeMinutes} min
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          {chore.frequency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {assignedKids.map((kid) => (
                          <span key={kid.id} className="text-sm" title={kid.name}>
                            {kid.avatarEmoji}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(chore)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-cc-red" onClick={() => handleDelete(chore.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ChoreForm open={formOpen} onOpenChange={setFormOpen} editChore={editChore} />
    </div>
  );
}
