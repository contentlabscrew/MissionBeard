"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listDrafts, deleteDraft, createNewDraft, saveDraft } from "@/lib/storage";
import { EmailDraft } from "@/types";
import { Plus, Trash2, Edit, Mail, Settings } from "lucide-react";

export default function DashboardPage() {
  const [drafts, setDrafts] = useState<EmailDraft[]>([]);

  useEffect(() => {
    setDrafts(listDrafts());
  }, []);

  const handleCreateNew = () => {
    const draft = createNewDraft("Untitled Email");
    saveDraft(draft);
    window.location.href = `/builder?id=${draft.id}`;
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this draft?")) {
      deleteDraft(id);
      setDrafts(listDrafts());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#01070E] text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#E98517]" />
            <div>
              <h1 className="text-lg font-bold">Mission Beard</h1>
              <p className="text-xs text-gray-400">Email Builder</p>
            </div>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#01070E]">Email Drafts</h2>
            <p className="text-sm text-gray-500 mt-1">
              Build on-brand emails and push them to Klaviyo
            </p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-1" />
            New Email
          </Button>
        </div>

        {drafts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Mail className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No drafts yet</h3>
              <p className="text-sm text-gray-400 mb-4">
                Create your first email to get started
              </p>
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-1" />
                Create Email
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => (
              <Card key={draft.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{draft.name}</CardTitle>
                  <p className="text-xs text-gray-400">
                    Updated {new Date(draft.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500 flex-1">
                      {draft.blocks.length} block{draft.blocks.length !== 1 ? "s" : ""}
                    </p>
                    <Link href={`/builder?id=${draft.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(draft.id)}
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
