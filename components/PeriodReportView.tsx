import type { PeriodReport } from "@/types/content";

export default function PeriodReportView({ report }: { report: PeriodReport }) {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">{report.label}</h1>
        <p className="mt-1 text-sm text-zinc-500">{report.dateRange}</p>
        <p className="mt-1 text-xs text-zinc-400">
          분석 대상 발행일: {report.sourceDates.join(", ")}
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-500 mb-2">
          전체 트렌드
        </h2>
        <p className="text-sm text-zinc-800 leading-relaxed">
          {report.overallTrend}
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-500 mb-3">
          이 기간 가장 영향력 컸던 이슈
        </h2>
        <ol className="list-decimal list-inside text-sm text-zinc-800 space-y-1">
          {report.topMovers.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-500 mb-3">
          종목별 호재/악재 누적
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {report.byCompany.map((c) => (
            <div
              key={c.company}
              className="rounded-xl border border-zinc-200 bg-white p-4"
            >
              <div className="font-bold text-sm mb-2">{c.company}</div>
              <div className="flex gap-3 text-xs mb-2">
                <span className="text-red-700 bg-red-100 rounded-full px-2 py-0.5">
                  호재 {c.goodCount}
                </span>
                <span className="text-blue-700 bg-blue-100 rounded-full px-2 py-0.5">
                  악재 {c.badCount}
                </span>
                <span className="text-zinc-700 bg-zinc-200 rounded-full px-2 py-0.5">
                  중립 {c.neutralCount}
                </span>
                <span className="text-purple-700 bg-purple-100 rounded-full px-2 py-0.5">
                  루머 {c.rumorCount}
                </span>
              </div>
              <p className="text-sm text-zinc-700">{c.trendSummary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
