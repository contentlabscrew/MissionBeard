import { NextRequest, NextResponse } from "next/server";
import { renderBlocksToHtml } from "@/email-templates/render-html";
import { Block } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const blocks: Block[] = body.blocks;

    if (!blocks || !Array.isArray(blocks)) {
      return NextResponse.json({ error: "blocks array is required" }, { status: 400 });
    }

    const { html, text } = renderBlocksToHtml(blocks);
    return NextResponse.json({ html, text });
  } catch (error: unknown) {
    console.error("Render error:", error);
    const message = error instanceof Error ? error.message : "Render failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
