import Link from "next/link";
import { getAllWeeklyReports } from "@/lib/content";

export default function WeeklyListPage() {
  const reports = getAllWeeklyReports();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">주간 AI 분석 리포트</h1>
        <p className="mt-1 text-sm text-zinc-500">
          그 주 발행된 한국 기업(주가 관련) 기사를 종목별로 종합 분석합니다.
        </p>
      </section>

      {reports.length === 0 ? (
        <p className="text-zinc-500">
          아직 생성된 주간 리포트가 없습니다. 매주 월요일 발행분과 함께
          만들어집니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {reports.map((r) => (
            <li key={r.id}>
              <Link
                href={`/weekly/${r.id}`}
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
