"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Send, X } from "lucide-react";
import { Chore } from "@/types/chorechamp";

interface CompletionFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chore: Chore | null;
  onSubmit: (choreId: string, photoDataUrl: string | null) => void;
}

export function CompletionFlow({ open, onOpenChange, chore, onSubmit }: CompletionFlowProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!chore) return null;

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const maxW = 400;
      const scale = Math.min(maxW / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = URL.createObjectURL(file);
  };

  const handleSubmit = () => {
    onSubmit(chore.id, photo);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPhoto(null);
      onOpenChange(false);
    }, 1500);
  };

  const handleClose = () => {
    setPhoto(null);
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="text-center">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>
                <span className="text-4xl block mb-2">{chore.icon}</span>
                {chore.title}
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-500 mb-4">
              Great job! Want to add a photo as proof?
            </p>

            {photo ? (
              <div className="relative mb-4">
                <img src={photo} alt="Proof" className="rounded-lg w-full max-h-48 object-cover" />
                <button
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="mb-4"
                onClick={() => fileRef.current?.click()}
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo (Optional)
              </Button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhoto}
            />

            <Button
              className="w-full bg-cc-green hover:bg-cc-green/90 text-white font-bold text-lg h-12"
              onClick={handleSubmit}
            >
              <Send className="h-5 w-5 mr-2" />
              Submit for Approval
            </Button>
          </>
        ) : (
          <div className="py-8 animate-bounce-in">
            <span className="text-6xl block mb-4">{"\u{1F389}"}</span>
            <h2 className="text-2xl font-black text-cc-green">Awesome!</h2>
            <p className="text-gray-500 mt-2">Waiting for parent approval...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
