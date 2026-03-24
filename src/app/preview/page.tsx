"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loadDraft } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function PreviewContent() {
  const searchParams = useSearchParams();
  const draftId = searchParams.get("id");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!draftId) return;
    const draft = loadDraft(draftId);
    if (!draft || draft.blocks.length === 0) {
      setLoading(false);
      return;
    }

    fetch("/api/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks: draft.blocks }),
    })
      .then((res) => res.json())
      .then((data) => setHtml(data.html))
      .finally(() => setLoading(false));
  }, [draftId]);

  useEffect(() => {
    if (iframeRef.current && html) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Link href={draftId ? `/builder?id=${draftId}` : "/"}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className="text-sm font-semibold">Full Preview</h1>
      </div>
      <div className="flex justify-center py-8">
        {loading ? (
          <p className="text-gray-400">Loading preview...</p>
        ) : html ? (
          <iframe
            ref={iframeRef}
            title="Email Preview"
            className="bg-white shadow-lg border-0"
            style={{ width: "600px", height: "900px" }}
          />
        ) : (
          <p className="text-gray-400">No content to preview</p>
        )}
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
