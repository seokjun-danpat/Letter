import Link from "next/link";
import {
  getAllDailyIssues,
  getAllWeeklyReports,
  getAllMonthlyReports,
  groupDailyIssuesByMonth,
} from "@/lib/content";

function formatMonthLabel(monthKey: string) {
  const [y, m] = monthKey.split("-");
  return `${y}년 ${parseInt(m, 10)}월`;
}

function CategoryBadge({ isCombined }: { isCombined: boolean }) {
  if (!isCombined) return null;
  return (
    <span className="ml-2 inline-block rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-0.5 align-middle">
      금~월 통합
    </span>
  );
}

export default function Home() {
  const issues = getAllDailyIssues();
  const weekly = getAllWeeklyReports();
  const monthly = getAllMonthlyReports();
  const grouped = groupDailyIssuesByMonth(issues);
  const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const latestWeekly = weekly[0];
  const latestMonthly = monthly[0];

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">
          글로벌 과학·산업 뉴스레터
        </h1>
        <p className="mt-1 text-zinc-500 text-sm">
          과학 기사 5개 + 한국 기업 관련 해외 기사 10개를 매일 오전 10시에
          큐레이션합니다.
        </p>
      </section>

      {(latestWeekly || latestMonthly) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {latestWeekly && (
            <Link
              href={`/weekly/${latestWeekly.id}`}
              className="rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-sm transition-shadow"
            >
              <div className="text-xs font-semibold text-indigo-600">
                최신 주간 리포트
              </div>
              <div className="mt-1 font-semibold">{latestWeekly.label}</div>
              <div className="mt-1 text-sm text-zinc-500">
                {latestWeekly.dateRange}
              </div>
            </Link>
          )}
          {latestMonthly && (
            <Link
              href={`/monthly/${latestMonthly.id}`}
              className="rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-sm transition-shadow"
            >
              <div className="text-xs font-semibold text-emerald-600">
                최신 월간 리포트
              </div>
              <div className="mt-1 font-semibold">{latestMonthly.label}</div>
              <div className="mt-1 text-sm text-zinc-500">
                {latestMonthly.dateRange}
              </div>
            </Link>
          )}
        </section>
      )}

      <section className="flex flex-col gap-8">
        {issues.length === 0 && (
          <p className="text-zinc-500">아직 발행된 뉴스레터가 없습니다.</p>
        )}
        {monthKeys.map((monthKey) => (
          <div key={monthKey}>
            <h2 className="text-sm font-semibold text-zinc-400 mb-3">
              {formatMonthLabel(monthKey)}
            </h2>
            <ul className="flex flex-col gap-2">
              {grouped[monthKey].map((issue) => (
                <li key={issue.date}>
                  <Link
                    href={`/daily/${issue.date}`}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 hover:shadow-sm transition-shadow"
                  >
                    <span className="font-medium">
                      {issue.rangeLabel}
                      <CategoryBadge isCombined={issue.isCombined} />
                    </span>
                    <span className="text-xs text-zinc-400">
                      과학 {issue.science.length} · 기업 {issue.business.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
