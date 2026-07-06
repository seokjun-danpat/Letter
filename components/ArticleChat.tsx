"use client";

import { useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ArticleChat({
  articleTitle,
  articleContext,
}: {
  articleTitle: string;
  articleContext: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleTitle, articleContext, messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "오류가 발생했습니다.");
      } else {
        setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="self-start text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-full px-3 py-1.5 transition-colors"
      >
        🤔 이 기사에 대해 물어보기
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500">
          이 기사에 대해 물어보기
        </span>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-zinc-400 hover:text-zinc-600"
        >
          접기
        </button>
      </div>

      {messages.length > 0 && (
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`text-sm rounded-md px-3 py-2 ${
                m.role === "user"
                  ? "bg-zinc-900 text-white self-end max-w-[85%]"
                  : "bg-white border border-zinc-200 text-zinc-800 self-start max-w-[85%]"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 그럼 타임머신도 가능한 거예요?"
          maxLength={500}
          className="flex-1 text-sm border border-zinc-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="text-sm font-medium bg-zinc-900 text-white rounded-md px-3 py-1.5 disabled:opacity-50"
        >
          {loading ? "..." : "전송"}
        </button>
      </form>
    </div>
  );
}
