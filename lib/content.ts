import fs from "fs";
import path from "path";
import type { DailyIssue, PeriodReport } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readJsonDir<T>(dirName: string): T[] {
  const dir = path.join(CONTENT_ROOT, dirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      return JSON.parse(raw) as T;
    });
}

export function getAllDailyIssues(): DailyIssue[] {
  return readJsonDir<DailyIssue>("daily").sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getDailyIssue(date: string): DailyIssue | null {
  const filePath = path.join(CONTENT_ROOT, "daily", `${date}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as DailyIssue;
}

export function getAllWeeklyReports(): PeriodReport[] {
  return readJsonDir<PeriodReport>("weekly").sort((a, b) =>
    b.id.localeCompare(a.id)
  );
}

export function getWeeklyReport(id: string): PeriodReport | null {
  const filePath = path.join(CONTENT_ROOT, "weekly", `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as PeriodReport;
}

export function getAllMonthlyReports(): PeriodReport[] {
  return readJsonDir<PeriodReport>("monthly").sort((a, b) =>
    b.id.localeCompare(a.id)
  );
}

export function getMonthlyReport(id: string): PeriodReport | null {
  const filePath = path.join(CONTENT_ROOT, "monthly", `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as PeriodReport;
}

export function groupDailyIssuesByMonth(
  issues: DailyIssue[]
): Record<string, DailyIssue[]> {
  const groups: Record<string, DailyIssue[]> = {};
  for (const issue of issues) {
    const monthKey = issue.date.slice(0, 7); // YYYY-MM
    if (!groups[monthKey]) groups[monthKey] = [];
    groups[monthKey].push(issue);
  }
  return groups;
}
