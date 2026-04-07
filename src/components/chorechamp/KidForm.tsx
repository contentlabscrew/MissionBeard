"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "./EmojiPicker";
import { Kid } from "@/types/chorechamp";
import { useChoreChamp } from "@/lib/chorechamp-context";
import { cn } from "@/lib/utils";

interface KidFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editKid?: Kid | null;
}

const COLORS = ["#7C3AED", "#3B82F6", "#10B981", "#EC4899", "#F59E0B", "#EF4444"];

export function KidForm({ open, onOpenChange, editKid }: KidFormProps) {
  const { addKid, updateKid } = useChoreChamp();
  const [name, setName] = useState(editKid?.name || "");
  const [avatarEmoji, setAvatarEmoji] = useState(editKid?.avatarEmoji || "\u{1F981}");
  const [color, setColor] = useState(editKid?.color || COLORS[0]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (editKid) {
      updateKid(editKid.id, { name, avatarEmoji, color });
    } else {
      addKid({ name, avatarEmoji, color });
    }
    onOpenChange(false);
    setName("");
    setAvatarEmoji("\u{1F981}");
    setColor(COLORS[0]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editKid ? "Edit Kid" : "Add Kid"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview */}
          <div className="flex justify-center">
            <div
              className="h-20 w-20 rounded-full flex items-center justify-center text-4xl"
              style={{ backgroundColor: color + "20" }}
            >
              {avatarEmoji}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Alex"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Avatar</label>
            <EmojiPicker value={avatarEmoji} onChange={setAvatarEmoji} />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Color</label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-8 w-8 rounded-full transition-all",
                    color === c && "ring-2 ring-offset-2 ring-gray-400 scale-110"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={!name.trim()}>
            {editKid ? "Save Changes" : "Add Kid"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
