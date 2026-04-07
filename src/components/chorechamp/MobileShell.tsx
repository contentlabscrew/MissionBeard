"use client";

import { cn } from "@/lib/utils";

export function MobileShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-md min-h-screen bg-gray-50 relative", className)}>
      {children}
    </div>
  );
}
