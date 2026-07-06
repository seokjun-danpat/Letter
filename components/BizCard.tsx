import type { BizArticle } from "@/types/content";

const CATEGORY_STYLE: Record<string, string> = {
  호재: "bg-red-100 text-red-700",
  악재: "bg-blue-100 text-blue-700",
  중립: "bg-zinc-200 text-zinc-700",
  루머: "bg-purple-100 text-purple-700",
};

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-500 tracking-tight" aria-label={`영향도 ${n}점`}>
      {"★".repeat(n)}
      <span className="text-zinc-300">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function BizCard({ article }: { article: BizArticle }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-zinc-500">
          {article.company}
        </span>
        <div className="flex items-center gap-2">
          <Stars n={article.impactStars} />
          <span
            className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
              CATEGORY_STYLE[article.category] ?? "bg-zinc-200 text-zinc-700"
            }`}
          >
            {article.isRumor ? "루머" : article.category}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-bold leading-snug">
          {article.isRumor && !article.titleKo.startsWith("[루머]")
            ? `[루머] ${article.titleKo}`
            : article.titleKo}
        </h3>
        <p className="text-xs text-zinc-400 italic mt-0.5">
          {article.titleOriginal}
        </p>
      </div>

      <div>
        <div className="text-xs font-semibold text-zinc-400 mb-1">
          왜 주가에 영향을 줄 수 있는가?
        </div>
        <p className="text-sm text-zinc-700">{article.whyItMoves}</p>
      </div>

      <p className="text-sm text-zinc-700 leading-relaxed">
        {article.summaryKo}
      </p>

      <div>
        <div className="text-xs font-semibold text-zinc-400 mb-1">
          핵심 내용
        </div>
        <ul className="text-sm text-zinc-700 list-disc list-inside space-y-0.5">
          {article.keyPoints.map((kp, i) => (
            <li key={i}>{kp}</li>
          ))}
        </ul>
      </div>

      {article.quotes.length > 0 && (
        <div className="border-l-2 border-zinc-200 pl-3 flex flex-col gap-1">
          {article.quotes.map((q, i) => (
            <p key={i} className="text-xs text-zinc-500 italic">
              &ldquo;{q}&rdquo;
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 pt-2 border-t border-zinc-100">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline font-medium"
        >
          원문 링크 ↗
        </a>
        <span>출처: {article.source}</span>
        <span>작성일: {article.publishedDate}</span>
      </div>
    </article>
  );
}
