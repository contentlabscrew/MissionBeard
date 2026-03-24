"use client";

import React, { useEffect, useRef, useState } from "react";
import { Block } from "@/types";

interface LivePreviewProps {
  blocks: Block[];
  visible: boolean;
}

export function LivePreview({ blocks, visible }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || blocks.length === 0) {
      setHtml("");
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/render", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blocks }),
        });
        if (res.ok) {
          const data = await res.json();
          setHtml(data.html);
        }
      } catch {
        // Silently fail preview
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [blocks, visible]);

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

  if (!visible) return null;

  return (
    <div className="w-[350px] border-l border-gray-200 bg-gray-50 flex flex-col">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-900">Preview</h2>
        {loading && <p className="text-xs text-gray-400 mt-1">Rendering...</p>}
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="bg-white shadow rounded overflow-hidden">
          <iframe
            ref={iframeRef}
            title="Email Preview"
            className="w-full border-0"
            style={{ height: "800px", transform: "scale(0.52)", transformOrigin: "top left", width: "192%" }}
          />
        </div>
      </div>
    </div>
  );
}
