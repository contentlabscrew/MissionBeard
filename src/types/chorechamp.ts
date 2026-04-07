// === Identity & Auth ===
export interface Kid {
  id: string;
  name: string;
  avatarEmoji: string;
  color: string;
  createdAt: string;
}

export interface FamilySettings {
  familyName: string;
  parentPin: string;
  kids: Kid[];
  activeKidId: string | null;
  mode: "parent" | "kid";
}

// === Chores ===
export type ChoreFrequency = "once" | "daily" | "weekly";
export type ChoreDifficulty = "easy" | "medium" | "hard";

export interface Chore {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  screenTimeMinutes: number;
  frequency: ChoreFrequency;
  difficulty: ChoreDifficulty;
  assignedKidIds: string[];
  createdAt: string;
}

// === Chore Completions ===
export type CompletionStatus = "pending" | "approved" | "rejected";

export interface ChoreCompletion {
  id: string;
  choreId: string;
  kidId: string;
  status: CompletionStatus;
  photoDataUrl: string | null;
  completedAt: string;
  reviewedAt: string | null;
}

// === Screen Time ===
export interface ScreenTimeSession {
  id: string;
  kidId: string;
  minutesUsed: number;
  startedAt: string;
}

// === Computed Stats ===
export interface KidStats {
  totalPoints: number;
  earnedMinutes: number;
  usedMinutes: number;
  availableMinutes: number;
  currentStreak: number;
  completedToday: number;
  pendingApproval: number;
}

// === Top-level persisted state ===
export interface ChoreChampData {
  settings: FamilySettings;
  chores: Chore[];
  completions: ChoreCompletion[];
  screenTimeSessions: ScreenTimeSession[];
}
