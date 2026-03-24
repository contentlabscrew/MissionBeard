"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { starterTemplates } from "@/lib/templates";
import { Block } from "@/types";
import { Save, Download, Upload, ChevronDown, FileText } from "lucide-react";

interface TopBarProps {
  emailName: string;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onExportHtml: () => void;
  onPushToKlaviyo: () => void;
  onLoadTemplate: (blocks: Block[]) => void;
  isSaving: boolean;
  isPushing: boolean;
}

export function TopBar({
  emailName,
  onNameChange,
  onSave,
  onExportHtml,
  onPushToKlaviyo,
  onLoadTemplate,
  isSaving,
  isPushing,
}: TopBarProps) {
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <div className="h-14 border-b border-gray-200 bg-white px-4 flex items-center gap-3">
      <a href="/" className="text-sm font-bold text-[#01070E] mr-2">
        MB
      </a>
      <div className="w-px h-6 bg-gray-200" />
      <Input
        value={emailName}
        onChange={(e) => onNameChange(e.target.value)}
        className="max-w-xs h-8 text-sm"
        placeholder="Email name..."
      />

      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTemplates(!showTemplates)}
        >
          <FileText className="w-4 h-4 mr-1" />
          Templates
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
        {showTemplates && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {starterTemplates.map((template) => (
              <button
                key={template.id}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                onClick={() => {
                  onLoadTemplate(template.createBlocks());
                  setShowTemplates(false);
                }}
              >
                <p className="text-sm font-medium">{template.name}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1" />

      <Button variant="outline" size="sm" onClick={onSave} disabled={isSaving}>
        <Save className="w-4 h-4 mr-1" />
        {isSaving ? "Saving..." : "Save"}
      </Button>
      <Button variant="outline" size="sm" onClick={onExportHtml}>
        <Download className="w-4 h-4 mr-1" />
        Export HTML
      </Button>
      <Button size="sm" onClick={onPushToKlaviyo} disabled={isPushing}>
        <Upload className="w-4 h-4 mr-1" />
        {isPushing ? "Pushing..." : "Push to Klaviyo"}
      </Button>
    </div>
  );
}
