import { notFound } from "next/navigation";
import { getAllDailyIssues, getDailyIssue } from "@/lib/content";
import ScienceCard from "@/components/ScienceCard";
import BizCard from "@/components/BizCard";

export async function generateStaticParams() {
  return getAllDailyIssues().map((issue) => ({ date: issue.date }));
}

export default async function DailyPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const issue = getDailyIssue(date);
  if (!issue) notFound();

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">
          {issue.rangeLabel}
        </h1>
        {issue.isCombined && (
          <p className="mt-1 text-sm text-amber-700">
            금~월 통합 발행 (커버 날짜: {issue.coveredDates.join(", ")})
          </p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-1">PART 1. 오늘의 과학 기사</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Nature · Science · MIT Technology Review · NASA 등 신뢰 가능한 출처
          기준
        </p>
        <div className="flex flex-col gap-4">
          {issue.science.map((a, i) => (
            <ScienceCard key={a.url} article={a} index={i + 1} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-1">
          PART 2. 한국 기업 관련 해외 기사
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          Bloomberg · Reuters · CNBC · Nikkei 등 주가에 영향을 줄 수 있는 뉴스
        </p>
        <div className="flex flex-col gap-4">
          {issue.business.map((a) => (
            <BizCard key={a.url} article={a} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-bold mb-3">📌 오늘의 한 줄 요약</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-sky-700 mb-2">
              과학 분야 TOP3
            </h3>
            <ol className="list-decimal list-inside text-sm text-zinc-700 space-y-1">
              {issue.summary.scienceTop3.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-700 mb-2">
              기업 분야 TOP5
            </h3>
            <ol className="list-decimal list-inside text-sm text-zinc-700 space-y-1">
              {issue.summary.bizTop5.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {issue.investorTake && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-bold mb-1">
            🎙️ 15년차 투자 전문가의 한마디
          </h2>
          <p className="text-sm font-semibold text-zinc-800 mb-3">
            {issue.investorTake.headline}
          </p>
          <div className="flex flex-col gap-3 mb-3">
            {issue.investorTake.picks.map((p, i) => (
              <div
                key={i}
                className="rounded-lg bg-white border border-amber-100 p-3"
              >
                <p className="text-sm font-semibold text-amber-800">
                  {p.company}
                </p>
                <p className="text-sm text-zinc-700 mt-1">{p.thesis}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-700 mb-3">
            {issue.investorTake.closingRemark}
          </p>
          <p className="text-xs text-zinc-500 border-t border-amber-200 pt-2">
            ⚠️ {issue.investorTake.disclaimer}
          </p>
        </section>
      )}
    </div>
  );
}
