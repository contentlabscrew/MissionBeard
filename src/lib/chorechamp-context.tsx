"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ChoreChampData, Chore, Kid, FamilySettings } from "@/types/chorechamp";
import * as storage from "./chorechamp-storage";

interface ChoreChampContextValue {
  data: ChoreChampData;
  reload: () => void;
  // Settings
  updateSettings: (updates: Partial<FamilySettings>) => void;
  verifyPin: (pin: string) => boolean;
  // Kids
  addKid: (kid: Omit<Kid, "id" | "createdAt">) => void;
  updateKid: (id: string, updates: Partial<Kid>) => void;
  deleteKid: (id: string) => void;
  // Chores
  addChore: (chore: Omit<Chore, "id" | "createdAt">) => void;
  updateChore: (id: string, updates: Partial<Chore>) => void;
  deleteChore: (id: string) => void;
  // Completions
  submitCompletion: (choreId: string, kidId: string, photoDataUrl: string | null) => void;
  approveCompletion: (completionId: string) => void;
  rejectCompletion: (completionId: string) => void;
  // Screen Time
  startScreenTimeSession: (kidId: string, minutes: number) => void;
  // Stats
  getKidStats: typeof storage.getKidStats;
  getChoresForKid: typeof storage.getChoresForKid;
}

const ChoreChampContext = createContext<ChoreChampContextValue | null>(null);

export function ChoreChampProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ChoreChampData>(storage.loadData);

  useEffect(() => {
    setData(storage.loadData());
  }, []);

  const reload = useCallback(() => setData(storage.loadData()), []);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const wrap = useCallback(
    <T extends (...args: any[]) => ChoreChampData>(fn: T): T =>
      ((...args: any[]) => {
        const updated = fn(...args);
        setData(updated);
      }) as T,
    []
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const value: ChoreChampContextValue = {
    data,
    reload,
    updateSettings: wrap(storage.updateSettings),
    verifyPin: storage.verifyPin,
    addKid: wrap(storage.addKid),
    updateKid: wrap(storage.updateKid),
    deleteKid: wrap(storage.deleteKid),
    addChore: wrap(storage.addChore),
    updateChore: wrap(storage.updateChore),
    deleteChore: wrap(storage.deleteChore),
    submitCompletion: wrap(storage.submitCompletion),
    approveCompletion: wrap(storage.approveCompletion),
    rejectCompletion: wrap(storage.rejectCompletion),
    startScreenTimeSession: wrap(storage.startScreenTimeSession),
    getKidStats: storage.getKidStats,
    getChoresForKid: storage.getChoresForKid,
  };

  return (
    <ChoreChampContext.Provider value={value}>
      {children}
    </ChoreChampContext.Provider>
  );
}

export function useChoreChamp(): ChoreChampContextValue {
  const ctx = useContext(ChoreChampContext);
  if (!ctx) throw new Error("useChoreChamp must be used within ChoreChampProvider");
  return ctx;
}
