"use client";

import {
  ChoreChampData,
  Chore,
  ChoreCompletion,
  Kid,
  KidStats,
  ScreenTimeSession,
  FamilySettings,
} from "@/types/chorechamp";
import { getSeedData } from "./chorechamp-seed";

const STORAGE_KEY = "chorechamp_data";

// === Core CRUD ===

export function loadData(): ChoreChampData {
  if (typeof window === "undefined") return getSeedData();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = getSeedData();
    saveData(seed);
    return seed;
  }
  try {
    return JSON.parse(raw) as ChoreChampData;
  } catch {
    return getSeedData();
  }
}

export function saveData(data: ChoreChampData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// === Settings ===

export function updateSettings(updates: Partial<FamilySettings>): ChoreChampData {
  const data = loadData();
  data.settings = { ...data.settings, ...updates };
  saveData(data);
  return data;
}

export function verifyPin(pin: string): boolean {
  const data = loadData();
  return data.settings.parentPin === pin;
}

// === Kids ===

export function addKid(kid: Omit<Kid, "id" | "createdAt">): ChoreChampData {
  const data = loadData();
  const newKid: Kid = {
    ...kid,
    id: `kid_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  data.settings.kids.push(newKid);
  saveData(data);
  return data;
}

export function updateKid(id: string, updates: Partial<Kid>): ChoreChampData {
  const data = loadData();
  const idx = data.settings.kids.findIndex((k) => k.id === id);
  if (idx >= 0) {
    data.settings.kids[idx] = { ...data.settings.kids[idx], ...updates };
  }
  saveData(data);
  return data;
}

export function deleteKid(id: string): ChoreChampData {
  const data = loadData();
  data.settings.kids = data.settings.kids.filter((k) => k.id !== id);
  data.chores.forEach((c) => {
    c.assignedKidIds = c.assignedKidIds.filter((kid) => kid !== id);
  });
  data.completions = data.completions.filter((c) => c.kidId !== id);
  data.screenTimeSessions = data.screenTimeSessions.filter((s) => s.kidId !== id);
  if (data.settings.activeKidId === id) data.settings.activeKidId = null;
  saveData(data);
  return data;
}

// === Chores ===

export function addChore(chore: Omit<Chore, "id" | "createdAt">): ChoreChampData {
  const data = loadData();
  const newChore: Chore = {
    ...chore,
    id: `chore_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  data.chores.push(newChore);
  saveData(data);
  return data;
}

export function updateChore(id: string, updates: Partial<Chore>): ChoreChampData {
  const data = loadData();
  const idx = data.chores.findIndex((c) => c.id === id);
  if (idx >= 0) {
    data.chores[idx] = { ...data.chores[idx], ...updates };
  }
  saveData(data);
  return data;
}

export function deleteChore(id: string): ChoreChampData {
  const data = loadData();
  data.chores = data.chores.filter((c) => c.id !== id);
  data.completions = data.completions.filter((c) => c.choreId !== id);
  saveData(data);
  return data;
}

export function getChoresForKid(kidId: string): Chore[] {
  const data = loadData();
  return data.chores.filter((c) => c.assignedKidIds.includes(kidId));
}

// === Completions ===

export function submitCompletion(
  choreId: string,
  kidId: string,
  photoDataUrl: string | null
): ChoreChampData {
  const data = loadData();
  const completion: ChoreCompletion = {
    id: `comp_${Date.now()}`,
    choreId,
    kidId,
    status: "pending",
    photoDataUrl,
    completedAt: new Date().toISOString(),
    reviewedAt: null,
  };
  data.completions.push(completion);
  saveData(data);
  return data;
}

export function approveCompletion(completionId: string): ChoreChampData {
  const data = loadData();
  const comp = data.completions.find((c) => c.id === completionId);
  if (comp) {
    comp.status = "approved";
    comp.reviewedAt = new Date().toISOString();
  }
  saveData(data);
  return data;
}

export function rejectCompletion(completionId: string): ChoreChampData {
  const data = loadData();
  const comp = data.completions.find((c) => c.id === completionId);
  if (comp) {
    comp.status = "rejected";
    comp.reviewedAt = new Date().toISOString();
  }
  saveData(data);
  return data;
}

// === Screen Time ===

export function startScreenTimeSession(kidId: string, minutes: number): ChoreChampData {
  const data = loadData();
  const session: ScreenTimeSession = {
    id: `st_${Date.now()}`,
    kidId,
    minutesUsed: minutes,
    startedAt: new Date().toISOString(),
  };
  data.screenTimeSessions.push(session);
  saveData(data);
  return data;
}

// === Stats ===

export function getKidStats(kidId: string): KidStats {
  const data = loadData();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStr = todayStart.toISOString();

  const kidCompletions = data.completions.filter((c) => c.kidId === kidId);
  const approved = kidCompletions.filter((c) => c.status === "approved");
  const pending = kidCompletions.filter((c) => c.status === "pending");
  const completedToday = kidCompletions.filter((c) => c.completedAt >= todayStr);

  let totalPoints = 0;
  let earnedMinutes = 0;
  for (const comp of approved) {
    const chore = data.chores.find((ch) => ch.id === comp.choreId);
    if (chore) {
      totalPoints += chore.points;
      earnedMinutes += chore.screenTimeMinutes;
    }
  }

  const usedMinutes = data.screenTimeSessions
    .filter((s) => s.kidId === kidId)
    .reduce((sum, s) => sum + s.minutesUsed, 0);

  return {
    totalPoints,
    earnedMinutes,
    usedMinutes,
    availableMinutes: Math.max(0, earnedMinutes - usedMinutes),
    currentStreak: calculateStreak(kidId, data),
    completedToday: completedToday.length,
    pendingApproval: pending.length,
  };
}

function calculateStreak(kidId: string, data: ChoreChampData): number {
  const kidCompletions = data.completions
    .filter((c) => c.kidId === kidId && c.status === "approved")
    .map((c) => new Date(c.completedAt).toDateString());

  const uniqueDays = Array.from(new Set(kidCompletions)).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < uniqueDays.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    if (uniqueDays[i] === expected.toDateString()) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
