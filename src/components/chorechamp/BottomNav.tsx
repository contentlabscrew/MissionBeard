"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, Users, CheckCircle, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChoreChamp } from "@/lib/chorechamp-context";

const parentTabs = [
  { href: "/chorechamp/parent", icon: Home, label: "Home" },
  { href: "/chorechamp/parent/chores", icon: ListChecks, label: "Chores" },
  { href: "/chorechamp/parent/kids", icon: Users, label: "Kids" },
  { href: "/chorechamp/parent/approvals", icon: CheckCircle, label: "Approve" },
];

const kidTabs = [
  { href: "/chorechamp/kid", icon: Home, label: "Home" },
  { href: "/chorechamp/kid/chores", icon: Star, label: "Chores" },
  { href: "/chorechamp/kid/screentime", icon: Clock, label: "Screen Time" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data } = useChoreChamp();
  const tabs = data.settings.mode === "parent" ? parentTabs : kidTabs;
  const pendingCount = data.completions.filter((c) => c.status === "pending").length;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          const showBadge = tab.label === "Approve" && pendingCount > 0;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative transition-colors",
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {showBadge && (
                  <span className="absolute -top-1 -right-2 bg-cc-red text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                    {pendingCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
