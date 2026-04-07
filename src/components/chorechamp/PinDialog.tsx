"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Delete } from "lucide-react";

interface PinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (pin: string) => boolean;
  onSuccess: () => void;
}

export function PinDialog({ open, onOpenChange, onVerify, onSuccess }: PinDialogProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (onVerify(next)) {
        setPin("");
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => {
          setPin("");
          setError(false);
        }, 800);
      }
    }
  };

  const handleDelete = () => {
    setPin((p) => p.slice(0, -1));
    setError(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cc-purple" />
            Parent PIN
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">Enter your 4-digit PIN</p>

        {/* PIN dots */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                error
                  ? "bg-cc-red animate-bounce"
                  : i < pin.length
                  ? "bg-cc-purple scale-110"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-cc-red text-sm mb-2 font-medium">Wrong PIN, try again</p>
        )}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((key) => {
            if (key === "") return <div key="empty" />;
            if (key === "del") {
              return (
                <Button
                  key="del"
                  variant="outline"
                  className="h-14 text-lg"
                  onClick={handleDelete}
                >
                  <Delete className="h-5 w-5" />
                </Button>
              );
            }
            return (
              <Button
                key={key}
                variant="outline"
                className="h-14 text-lg font-semibold"
                onClick={() => handleDigit(key)}
              >
                {key}
              </Button>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-4">Default PIN: 1234</p>
      </DialogContent>
    </Dialog>
  );
}
