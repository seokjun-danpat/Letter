export interface ScienceArticle {
  titleKo: string;
  titleOriginal: string;
  oneLiner: string;
  whyItMatters: string;
  summaryKo: string;
  keyPoints: string[];
  url: string;
  source: string;
  publishedDate: string;
  originalLanguage: string;
}

export type BizCategory = "호재" | "악재" | "중립" | "루머";

export interface BizArticle {
  company: string;
  titleKo: string;
  titleOriginal: string;
  impactStars: number; // 1-5
  category: BizCategory;
  isRumor: boolean;
  whyItMoves: string;
  summaryKo: string;
  keyPoints: string[];
  quotes: string[];
  url: string;
  source: string;
  publishedDate: string;
}

export interface DailyIssue {
  date: string; // primary date key, e.g. "2026-07-06"
  rangeLabel: string; // e.g. "2026년 7월 6일 (월)" or "2026년 7월 3일~6일 (금~월 통합)"
  isCombined: boolean;
  coveredDates: string[]; // calendar dates this issue covers
  science: ScienceArticle[];
  business: BizArticle[];
  summary: {
    scienceTop3: string[];
    bizTop5: string[];
  };
}

export interface CompanyTrend {
  company: string;
  goodCount: number;
  badCount: number;
  neutralCount: number;
  rumorCount: number;
  trendSummary: string;
}

export interface PeriodReport {
  id: string; // e.g. "2026-W27" or "2026-07"
  label: string; // display label
  dateRange: string;
  sourceDates: string[]; // daily issue dates included
  byCompany: CompanyTrend[];
  overallTrend: string;
  topMovers: string[];
}
