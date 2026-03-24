"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Block } from "@/types";
import { createBlock } from "@/lib/blocks";
import { saveDraft, loadDraft, createNewDraft } from "@/lib/storage";
import { EmailDraft } from "@/types";
import { BlockSidebar } from "./BlockSidebar";
import { BuilderCanvas } from "./BuilderCanvas";
import { BlockEditor } from "./BlockEditor";
import { TopBar } from "./TopBar";
import { LivePreview } from "./LivePreview";

interface EmailBuilderProps {
  draftId?: string;
}

export function EmailBuilder({ draftId }: EmailBuilderProps) {
  const [draft, setDraft] = useState<EmailDraft>(() => {
    if (draftId) {
      const loaded = loadDraft(draftId);
      if (loaded) return loaded;
    }
    return createNewDraft("Untitled Email");
  });
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [showPreview] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>();

  const blocks = draft.blocks;

  const showNotification = useCallback((type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const updateBlocks = useCallback(
    (newBlocks: Block[]) => {
      setDraft((prev) => ({ ...prev, blocks: newBlocks, updatedAt: new Date().toISOString() }));
    },
    []
  );

  // Auto-save
  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveDraft(draft);
    }, 5000);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [draft]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeData = active.data.current;

      // New block from palette
      if (activeData?.source === "palette") {
        const newBlock = createBlock(activeData.type);
        const overIndex = blocks.findIndex((b) => b.id === over.id);
        const newBlocks = [...blocks];
        if (overIndex >= 0) {
          newBlocks.splice(overIndex, 0, newBlock);
        } else {
          newBlocks.push(newBlock);
        }
        updateBlocks(newBlocks);
        setSelectedBlockId(newBlock.id);
        return;
      }

      // Reorder existing blocks
      if (active.id !== over.id) {
        const oldIndex = blocks.findIndex((b) => b.id === active.id);
        const newIndex = blocks.findIndex((b) => b.id === over.id);
        if (oldIndex >= 0 && newIndex >= 0) {
          updateBlocks(arrayMove(blocks, oldIndex, newIndex));
        }
      }
    },
    [blocks, updateBlocks]
  );

  const handleUpdateBlock = useCallback(
    (updatedBlock: Block) => {
      updateBlocks(blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b)));
    },
    [blocks, updateBlocks]
  );

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      updateBlocks(blocks.filter((b) => b.id !== blockId));
      if (selectedBlockId === blockId) setSelectedBlockId(null);
    },
    [blocks, selectedBlockId, updateBlocks]
  );

  const handleSave = useCallback(() => {
    setIsSaving(true);
    saveDraft(draft);
    setTimeout(() => {
      setIsSaving(false);
      showNotification("success", "Draft saved!");
    }, 300);
  }, [draft, showNotification]);

  const handleExportHtml = useCallback(async () => {
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks }),
      });
      if (!res.ok) throw new Error("Render failed");
      const data = await res.json();

      const blob = new Blob([data.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${draft.name.replace(/\s+/g, "-").toLowerCase()}.html`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification("success", "HTML exported!");
    } catch {
      showNotification("error", "Failed to export HTML");
    }
  }, [blocks, draft.name, showNotification]);

  const handlePushToKlaviyo = useCallback(async () => {
    setIsPushing(true);
    try {
      const res = await fetch("/api/klaviyo/push-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: draft.name, blocks }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Push failed");
      }
      const data = await res.json();
      showNotification("success", `Pushed to Klaviyo! Template ID: ${data.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to push to Klaviyo";
      showNotification("error", message);
    } finally {
      setIsPushing(false);
    }
  }, [blocks, draft.name, showNotification]);

  const handleLoadTemplate = useCallback(
    (templateBlocks: Block[]) => {
      updateBlocks(templateBlocks);
      setSelectedBlockId(null);
    },
    [updateBlocks]
  );

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null;

  return (
    <div className="h-screen flex flex-col">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}
      <TopBar
        emailName={draft.name}
        onNameChange={(name) => setDraft((prev) => ({ ...prev, name }))}
        onSave={handleSave}
        onExportHtml={handleExportHtml}
        onPushToKlaviyo={handlePushToKlaviyo}
        onLoadTemplate={handleLoadTemplate}
        isSaving={isSaving}
        isPushing={isPushing}
      />
      <div className="flex-1 flex overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <BlockSidebar />
          <BuilderCanvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </DndContext>
        <LivePreview blocks={blocks} visible={showPreview} />
        <BlockEditor
          block={selectedBlock}
          onUpdate={handleUpdateBlock}
          onDelete={handleDeleteBlock}
        />
      </div>
    </div>
  );
}
