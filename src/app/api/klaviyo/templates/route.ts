import { NextResponse } from "next/server";
import { listTemplates } from "@/lib/klaviyo";

export async function GET() {
  try {
    const apiKey = process.env.KLAVIYO_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "KLAVIYO_API_KEY not configured" },
        { status: 500 }
      );
    }

    const templates = await listTemplates(apiKey);
    return NextResponse.json({ templates });
  } catch (error: unknown) {
    console.error("Klaviyo list error:", error);
    const message = error instanceof Error ? error.message : "Failed to list templates";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
