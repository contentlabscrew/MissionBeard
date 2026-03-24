"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@/types";
import { BlockPreview } from "@/components/blocks/BlockPreview";
import { GripVertical } from "lucide-react";

function SortableBlock({
  block,
  isSelected,
  onSelect,
}: {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-pointer border-2 transition-colors ${
        isSelected ? "border-[#E98517]" : "border-transparent hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab z-10"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <BlockPreview block={block} />
    </div>
  );
}

interface BuilderCanvasProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
}

export function BuilderCanvas({ blocks, selectedBlockId, onSelectBlock }: BuilderCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto p-8">
      <div
        ref={setNodeRef}
        className={`max-w-[600px] mx-auto bg-white shadow-lg min-h-[400px] ${
          isOver ? "ring-2 ring-[#E98517] ring-dashed" : ""
        }`}
      >
        {blocks.length === 0 ? (
          <div className="flex items-center justify-center h-96 text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">Drag blocks here to build your email</p>
              <p className="text-sm">Or choose a starter template from the top bar</p>
            </div>
          </div>
        ) : (
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                isSelected={selectedBlockId === block.id}
                onSelect={() => onSelectBlock(block.id)}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
