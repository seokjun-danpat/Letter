import { notFound } from "next/navigation";
import { getAllMonthlyReports, getMonthlyReport } from "@/lib/content";
import PeriodReportView from "@/components/PeriodReportView";

export async function generateStaticParams() {
  return getAllMonthlyReports().map((r) => ({ month: r.id }));
}

export default async function MonthlyDetailPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const report = getMonthlyReport(month);
  if (!report) notFound();
  return <PeriodReportView report={report} />;
}
