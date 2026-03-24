"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [templates, setTemplates] = useState<{ id: string; name: string; createdAt: string }[]>([]);

  const handleTestConnection = async () => {
    setStatus("testing");
    try {
      const res = await fetch("/api/klaviyo/templates");
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.templates || []);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#01070E] text-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">Settings</h1>
            <p className="text-xs text-gray-400">Klaviyo API Configuration</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Klaviyo API Key</CardTitle>
            <CardDescription>
              Your Klaviyo private API key is stored securely in your server&apos;s <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">.env.local</code> file.
              Add it as: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">KLAVIYO_API_KEY=pk_your_key_here</code>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleTestConnection} disabled={status === "testing"}>
                {status === "testing" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test Connection"
                )}
              </Button>
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Connected to Klaviyo successfully!</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Connection failed. Check your API key in .env.local
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {templates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Klaviyo Templates</CardTitle>
              <CardDescription>
                {templates.length} template{templates.length !== 1 ? "s" : ""} found in your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.slice(0, 10).map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <span className="text-sm font-medium">{t.name}</span>
                    <span className="text-xs text-gray-400">{t.id}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Required API Scopes</CardTitle>
            <CardDescription>
              Make sure your Klaviyo API key has these scopes enabled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E98517]" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">templates:read</code>
                <span className="text-gray-500">— List existing templates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E98517]" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">templates:write</code>
                <span className="text-gray-500">— Create new templates</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
