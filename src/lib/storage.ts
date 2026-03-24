"use client";

import { EmailDraft } from "@/types";

const DRAFTS_KEY = "missionbeard_email_drafts";

export function listDrafts(): EmailDraft[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(DRAFTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as EmailDraft[];
  } catch {
    return [];
  }
}

export function loadDraft(id: string): EmailDraft | null {
  const drafts = listDrafts();
  return drafts.find((d) => d.id === id) ?? null;
}

export function saveDraft(draft: EmailDraft): void {
  const drafts = listDrafts();
  const index = drafts.findIndex((d) => d.id === draft.id);
  draft.updatedAt = new Date().toISOString();
  if (index >= 0) {
    drafts[index] = draft;
  } else {
    drafts.unshift(draft);
  }
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function deleteDraft(id: string): void {
  const drafts = listDrafts().filter((d) => d.id !== id);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function createNewDraft(name: string): EmailDraft {
  const now = new Date().toISOString();
  return {
    id: `draft_${Date.now()}`,
    name,
    blocks: [],
    createdAt: now,
    updatedAt: now,
  };
}
