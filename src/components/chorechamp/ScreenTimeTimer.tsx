"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "./ProgressRing";
import { Play, Pause, StopCircle } from "lucide-react";

interface ScreenTimeTimerProps {
  minutes: number;
  onComplete: (usedMinutes: number) => void;
  onCancel: () => void;
}

export function ScreenTimeTimer({ minutes, onComplete, onCancel }: ScreenTimeTimerProps) {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            stop();
            setFinished(true);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, stop]);

  const usedSeconds = totalSeconds - secondsLeft;
  const usedMinutes = Math.ceil(usedSeconds / 60);
  const displayMins = Math.floor(secondsLeft / 60);
  const displaySecs = secondsLeft % 60;

  const handleDone = () => {
    stop();
    onComplete(usedMinutes || 1);
  };

  if (finished) {
    return (
      <div className="text-center py-8 animate-bounce-in">
        <span className="text-7xl block mb-4">{"\u{23F0}"}</span>
        <h2 className="text-2xl font-black text-cc-purple mb-2">Time&apos;s Up!</h2>
        <p className="text-gray-500 mb-6">Great job managing your screen time!</p>
        <Button onClick={() => onComplete(minutes)} className="bg-cc-purple hover:bg-cc-purple/90">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <ProgressRing
        value={secondsLeft}
        max={totalSeconds}
        size={200}
        strokeWidth={14}
        color={secondsLeft < 60 ? "var(--cc-red)" : "var(--cc-green)"}
      >
        <p className="text-4xl font-black tabular-nums">
          {String(displayMins).padStart(2, "0")}:{String(displaySecs).padStart(2, "0")}
        </p>
        <p className="text-xs text-gray-500 mt-1">remaining</p>
      </ProgressRing>

      <div className="flex justify-center gap-3 mt-8">
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 rounded-full"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button
          size="lg"
          className="h-14 px-6 rounded-full bg-cc-red hover:bg-cc-red/90"
          onClick={handleDone}
        >
          <StopCircle className="h-5 w-5 mr-2" />
          I&apos;m Done
        </Button>
      </div>

      <Button
        variant="ghost"
        className="mt-4 text-gray-400"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}
