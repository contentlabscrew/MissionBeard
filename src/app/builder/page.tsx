"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { EmailBuilder } from "@/components/builder/EmailBuilder";

function BuilderContent() {
  const searchParams = useSearchParams();
  const draftId = searchParams.get("id") ?? undefined;
  return <EmailBuilder draftId={draftId} />;
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
