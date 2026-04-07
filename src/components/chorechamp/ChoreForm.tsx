"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChoreEmojiPicker } from "./EmojiPicker";
import { Chore, ChoreFrequency, ChoreDifficulty } from "@/types/chorechamp";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { cn } from "@/lib/utils";

interface ChoreFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editChore?: Chore | null;
}

const frequencies: { value: ChoreFrequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "once", label: "One-time" },
];

const difficulties: { value: ChoreDifficulty; label: string; color: string }[] = [
  { value: "easy", label: "Easy", color: "bg-cc-green" },
  { value: "medium", label: "Medium", color: "bg-cc-yellow" },
  { value: "hard", label: "Hard", color: "bg-cc-red" },
];

export function ChoreForm({ open, onOpenChange, editChore }: ChoreFormProps) {
  const { data, addChore, updateChore } = useChoreChamp();
  const [icon, setIcon] = useState(editChore?.icon || "\u{1F6CF}\uFE0F");
  const [title, setTitle] = useState(editChore?.title || "");
  const [description, setDescription] = useState(editChore?.description || "");
  const [points, setPoints] = useState(editChore?.points || 10);
  const [screenTimeMinutes, setScreenTimeMinutes] = useState(editChore?.screenTimeMinutes || 15);
  const [frequency, setFrequency] = useState<ChoreFrequency>(editChore?.frequency || "daily");
  const [difficulty, setDifficulty] = useState<ChoreDifficulty>(editChore?.difficulty || "medium");
  const [assignedKidIds, setAssignedKidIds] = useState<string[]>(
    editChore?.assignedKidIds || data.settings.kids.map((k) => k.id)
  );

  const handleSubmit = () => {
    if (!title.trim()) return;
    const choreData = { icon, title, description, points, screenTimeMinutes, frequency, difficulty, assignedKidIds };
    if (editChore) {
      updateChore(editChore.id, choreData);
    } else {
      addChore(choreData);
    }
    onOpenChange(false);
  };

  const toggleKid = (kidId: string) => {
    setAssignedKidIds((prev) =>
      prev.includes(kidId) ? prev.filter((id) => id !== kidId) : [...prev, kidId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editChore ? "Edit Chore" : "New Chore"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Icon</label>
            <ChoreEmojiPicker value={icon} onChange={setIcon} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Make Your Bed" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What needs to be done?" rows={2} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Points</label>
              <Input type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} min={1} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Screen Time (min)</label>
              <Input type="number" value={screenTimeMinutes} onChange={(e) => setScreenTimeMinutes(Number(e.target.value))} min={1} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Frequency</label>
            <div className="flex gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFrequency(f.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    frequency === f.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDifficulty(d.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    difficulty === d.value
                      ? `${d.color} text-white border-transparent`
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Assign to</label>
            <div className="flex gap-2">
              {data.settings.kids.map((kid) => (
                <button
                  key={kid.id}
                  type="button"
                  onClick={() => toggleKid(kid.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors",
                    assignedKidIds.includes(kid.id)
                      ? "border-primary bg-primary/10"
                      : "border-gray-200"
                  )}
                >
                  <span>{kid.avatarEmoji}</span>
                  <span className="text-sm">{kid.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={!title.trim()}>
            {editChore ? "Save Changes" : "Create Chore"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
