"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { blockDefinitions } from "@/lib/blocks";
import { BlockType } from "@/types";
import {
  LayoutTemplate,
  Image,
  Package,
  LayoutGrid,
  Type,
  MousePointerClick,
  Minus,
  ImageIcon,
  Percent,
  PanelBottom,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutTemplate,
  Image,
  Package,
  LayoutGrid,
  Type,
  MousePointerClick,
  Minus,
  ImageIcon,
  Percent,
  PanelBottom,
};

function DraggableBlock({ type, label, description, icon }: {
  type: BlockType;
  label: string;
  description: string;
  icon: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, source: "palette" },
  });

  const Icon = iconMap[icon] || Type;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing hover:border-[#E98517] hover:bg-orange-50 transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
    </div>
  );
}

export function BlockSidebar() {
  return (
    <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
          Blocks
        </h2>
        <div className="space-y-2">
          {blockDefinitions.map((def) => (
            <DraggableBlock
              key={def.type}
              type={def.type}
              label={def.label}
              description={def.description}
              icon={def.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
