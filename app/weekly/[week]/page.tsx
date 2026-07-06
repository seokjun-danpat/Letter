import { notFound } from "next/navigation";
import { getAllWeeklyReports, getWeeklyReport } from "@/lib/content";
import PeriodReportView from "@/components/PeriodReportView";

export async function generateStaticParams() {
  return getAllWeeklyReports().map((r) => ({ week: r.id }));
}

export default async function WeeklyDetailPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const report = getWeeklyReport(week);
  if (!report) notFound();
  return <PeriodReportView report={report} />;
}
