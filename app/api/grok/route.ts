import { NextResponse } from "next/server";

type GrokResponse = {
  visual: string;
  summary: string;
};

export async function POST(request: Request) {
  const { phase } = (await request.json()) as { phase?: string };
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      visual: ":: lunar glyph mesh // fallback mode ::",
      summary: `moon is ${phase ?? "unknown"}. vibe says: keep it fluid, keep it coded.`,
    } satisfies GrokResponse);
  }

  try {
    const prompt = `create a tiny surreal moon visual phrase and one sentence vibe summary for phase: ${phase}. output json: {"visual":"...","summary":"..."}`;

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content:
              "you craft concise, transcendent, lowercase outputs for futuristic artist websites. return strict json only.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("grok request failed");
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("missing content");
    }

    const parsed = JSON.parse(content) as GrokResponse;
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({
      visual: "<> moon packet shimmer <>",
      summary: `phase ${phase ?? "unknown"}: beyond norms, build soft + strange with intention.`,
    } satisfies GrokResponse);
  }
}
