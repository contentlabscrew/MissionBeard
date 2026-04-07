"use client";

import { cn } from "@/lib/utils";

const EMOJI_OPTIONS = [
  "\u{1F981}", "\u{1F438}", "\u{1F431}", "\u{1F436}", "\u{1F427}", "\u{1F98A}",
  "\u{1F984}", "\u{1F60E}", "\u{1F929}", "\u{1F47E}", "\u{1F680}", "\u{1F308}",
  "\u{2B50}", "\u{1F525}", "\u{1F3AE}", "\u{1F3B5}", "\u{26BD}", "\u{1F3C0}",
  "\u{1F3A8}", "\u{1F33B}", "\u{1F98B}", "\u{1F40C}", "\u{1F422}", "\u{1F996}",
];

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  className?: string;
}

export function EmojiPicker({ value, onChange, className }: EmojiPickerProps) {
  return (
    <div className={cn("grid grid-cols-6 gap-2", className)}>
      {EMOJI_OPTIONS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onChange(emoji)}
          className={cn(
            "text-2xl p-2 rounded-lg transition-all hover:bg-gray-100",
            value === emoji && "bg-primary/10 ring-2 ring-primary"
          )}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

const CHORE_EMOJI_OPTIONS = [
  "\u{1F6CF}\uFE0F", "\u{1FAE7}", "\u{1F415}", "\u{1F4DA}", "\u{1F9F9}", "\u{1F5D1}\uFE0F",
  "\u{1F963}", "\u{1F4D6}", "\u{1F3E0}", "\u{1F9FA}", "\u{1F9F9}", "\u{1F455}",
  "\u{1F33F}", "\u{1F37D}\uFE0F", "\u{1F6BF}", "\u{1F6D2}", "\u{2702}\uFE0F", "\u{1F4E6}",
];

export function ChoreEmojiPicker({ value, onChange, className }: EmojiPickerProps) {
  return (
    <div className={cn("grid grid-cols-6 gap-2", className)}>
      {CHORE_EMOJI_OPTIONS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onChange(emoji)}
          className={cn(
            "text-2xl p-2 rounded-lg transition-all hover:bg-gray-100",
            value === emoji && "bg-primary/10 ring-2 ring-primary"
          )}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
