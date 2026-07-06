import Link from "next/link";
import { getAllMonthlyReports } from "@/lib/content";

export default function MonthlyListPage() {
  const reports = getAllMonthlyReports();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">월간 AI 분석 리포트</h1>
        <p className="mt-1 text-sm text-zinc-500">
          그 달 발행된 한국 기업(주가 관련) 기사를 종목별로 종합 분석합니다.
        </p>
      </section>

      {reports.length === 0 ? (
        <p className="text-zinc-500">
          아직 생성된 월간 리포트가 없습니다. 매월 첫 발행일에 지난달 리포트가
          만들어집니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {reports.map((r) => (
            <li key={r.id}>
              <Link
                href={`/monthly/${r.id}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 hover:shadow-sm transition-shadow"
              >
                <span className="font-medium">{r.label}</span>
                <span className="text-xs text-zinc-400">{r.dateRange}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
