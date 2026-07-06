import type { ScienceArticle } from "@/types/content";

export default function ScienceCard({
  article,
  index,
}: {
  article: ScienceArticle;
  index: number;
}) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex-shrink-0 rounded-full bg-sky-100 text-sky-700 text-xs font-bold w-6 h-6 flex items-center justify-center">
          {index}
        </span>
        <div>
          <h3 className="font-bold leading-snug">{article.titleKo}</h3>
          <p className="text-xs text-zinc-400 italic mt-0.5">
            {article.titleOriginal}
          </p>
        </div>
      </div>

      <p className="text-sm font-medium text-sky-800 bg-sky-50 rounded-md px-3 py-2">
        {article.oneLiner}
      </p>

      <div>
        <div className="text-xs font-semibold text-zinc-400 mb-1">
          왜 중요한가?
        </div>
        <p className="text-sm text-zinc-700">{article.whyItMatters}</p>
      </div>

      <p className="text-sm text-zinc-700 leading-relaxed">
        {article.summaryKo}
      </p>

      <div>
        <div className="text-xs font-semibold text-zinc-400 mb-1">
          핵심 포인트
        </div>
        <ul className="text-sm text-zinc-700 list-disc list-inside space-y-0.5">
          {article.keyPoints.map((kp, i) => (
            <li key={i}>{kp}</li>
          ))}
        </ul>
      </div>

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
        <span>원문 언어: {article.originalLanguage}</span>
      </div>
    </article>
  );
}
