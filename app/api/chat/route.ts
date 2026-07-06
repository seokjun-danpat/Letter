import { NextResponse } from "next/server";

const MAX_QUESTION_LENGTH = 500;
const MAX_MESSAGES = 12;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const articleTitle: string = body.articleTitle ?? "";
  const articleContext: string = body.articleContext ?? "";
  const messages: ChatMessage[] = Array.isArray(body.messages)
    ? body.messages
    : [];

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user" || !lastMessage.content) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (lastMessage.content.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `질문은 ${MAX_QUESTION_LENGTH}자 이내로 입력해주세요.` },
      { status: 400 }
    );
  }
  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: "대화가 너무 길어졌어요. 새로고침 후 다시 시작해주세요." },
      { status: 400 }
    );
  }

  const systemPrompt = `당신은 뉴스레터의 기사 "${articleTitle}"에 대해서만 이야기하는 친절한 설명가입니다.
아래 기사 내용을 바탕으로 사용자의 질문에 쉽고 정확하게 답하세요. 확실하지 않은 추측은 추측이라고 밝히세요.
기사와 무관한 질문이 오면 정중히 화제를 기사로 돌리세요. 답변은 한국어로, 3~6문장 정도로 간결하게 하세요.

--- 기사 내용 ---
${articleContext}`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 400,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  if (!openaiRes.ok) {
    return NextResponse.json(
      { error: "답변을 가져오지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content ?? "답변을 생성하지 못했습니다.";

  return NextResponse.json({ reply });
}
