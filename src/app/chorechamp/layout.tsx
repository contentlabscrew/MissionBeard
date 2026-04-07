"use client";

import { ChoreChampProvider } from "@/lib/chorechamp-context";
import { MobileShell } from "@/components/chorechamp/MobileShell";
import { BottomNav } from "@/components/chorechamp/BottomNav";

export default function ChoreChampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChoreChampProvider>
      <MobileShell>
        <div className="pb-20">{children}</div>
        <BottomNav />
      </MobileShell>
    </ChoreChampProvider>
  );
}
