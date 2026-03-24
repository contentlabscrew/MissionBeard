import { NextRequest, NextResponse } from "next/server";
import { pushTemplate } from "@/lib/klaviyo";
import { renderBlocksToHtml } from "@/email-templates/render-html";
import { Block } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.KLAVIYO_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "KLAVIYO_API_KEY not configured. Add it to your .env.local file." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, blocks }: { name: string; blocks: Block[] } = body;

    if (!name || !blocks || !Array.isArray(blocks)) {
      return NextResponse.json({ error: "name and blocks are required" }, { status: 400 });
    }

    const { html, text } = renderBlocksToHtml(blocks);
    const result = await pushTemplate(apiKey, name, html, text);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Klaviyo push error:", error);
    const message = error instanceof Error ? error.message : "Failed to push template";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
