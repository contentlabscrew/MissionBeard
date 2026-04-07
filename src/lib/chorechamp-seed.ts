import { ChoreChampData } from "@/types/chorechamp";

export function getSeedData(): ChoreChampData {
  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();

  return {
    settings: {
      familyName: "The Johnsons",
      parentPin: "1234",
      kids: [
        { id: "kid_1", name: "Alex", avatarEmoji: "\u{1F981}", color: "#7C3AED", createdAt: now },
        { id: "kid_2", name: "Sam", avatarEmoji: "\u{1F438}", color: "#3B82F6", createdAt: now },
      ],
      activeKidId: null,
      mode: "kid",
    },
    chores: [
      { id: "chore_1", title: "Make Your Bed", description: "Straighten sheets and fluff pillows", icon: "\u{1F6CF}\uFE0F", points: 5, screenTimeMinutes: 10, frequency: "daily", difficulty: "easy", assignedKidIds: ["kid_1", "kid_2"], createdAt: now },
      { id: "chore_2", title: "Wash the Dishes", description: "Load or unload the dishwasher", icon: "\u{1FAE7}", points: 10, screenTimeMinutes: 15, frequency: "daily", difficulty: "medium", assignedKidIds: ["kid_1", "kid_2"], createdAt: now },
      { id: "chore_3", title: "Walk the Dog", description: "Take Buddy for a 15-minute walk", icon: "\u{1F415}", points: 15, screenTimeMinutes: 20, frequency: "daily", difficulty: "medium", assignedKidIds: ["kid_1"], createdAt: now },
      { id: "chore_4", title: "Do Homework", description: "Complete all assigned homework", icon: "\u{1F4DA}", points: 20, screenTimeMinutes: 30, frequency: "daily", difficulty: "hard", assignedKidIds: ["kid_1", "kid_2"], createdAt: now },
      { id: "chore_5", title: "Clean Your Room", description: "Pick up toys, vacuum, and organize", icon: "\u{1F9F9}", points: 15, screenTimeMinutes: 20, frequency: "weekly", difficulty: "medium", assignedKidIds: ["kid_1", "kid_2"], createdAt: now },
      { id: "chore_6", title: "Take Out Trash", description: "Empty all trash cans and replace bags", icon: "\u{1F5D1}\uFE0F", points: 5, screenTimeMinutes: 10, frequency: "daily", difficulty: "easy", assignedKidIds: ["kid_2"], createdAt: now },
      { id: "chore_7", title: "Feed the Pet", description: "Fresh food and water for Buddy", icon: "\u{1F963}", points: 5, screenTimeMinutes: 10, frequency: "daily", difficulty: "easy", assignedKidIds: ["kid_1", "kid_2"], createdAt: now },
      { id: "chore_8", title: "Read for 30 Min", description: "Read a book or educational material", icon: "\u{1F4D6}", points: 10, screenTimeMinutes: 15, frequency: "daily", difficulty: "easy", assignedKidIds: ["kid_1", "kid_2"], createdAt: now },
    ],
    completions: [
      { id: "comp_1", choreId: "chore_1", kidId: "kid_1", status: "approved", photoDataUrl: null, completedAt: yesterday, reviewedAt: yesterday },
      { id: "comp_2", choreId: "chore_7", kidId: "kid_1", status: "approved", photoDataUrl: null, completedAt: yesterday, reviewedAt: yesterday },
      { id: "comp_3", choreId: "chore_2", kidId: "kid_2", status: "approved", photoDataUrl: null, completedAt: yesterday, reviewedAt: yesterday },
      { id: "comp_4", choreId: "chore_1", kidId: "kid_1", status: "pending", photoDataUrl: null, completedAt: now, reviewedAt: null },
      { id: "comp_5", choreId: "chore_8", kidId: "kid_2", status: "pending", photoDataUrl: null, completedAt: now, reviewedAt: null },
    ],
    screenTimeSessions: [
      { id: "st_1", kidId: "kid_1", minutesUsed: 15, startedAt: yesterday },
    ],
  };
}
