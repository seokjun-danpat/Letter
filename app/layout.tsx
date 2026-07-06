import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "글로벌 과학·산업 뉴스레터",
  description: "매일 오전 10시, 과학과 한국 기업 관련 해외 기사를 큐레이션합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <header className="border-b border-zinc-200 bg-white sticky top-0 z-10">
          <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">
              📰 과학·산업 뉴스레터
            </Link>
            <div className="flex gap-4 text-sm font-medium text-zinc-600">
              <Link href="/" className="hover:text-zinc-950">
                일간
              </Link>
              <Link href="/weekly" className="hover:text-zinc-950">
                주간 리포트
              </Link>
              <Link href="/monthly" className="hover:text-zinc-950">
                월간 리포트
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-400">
          매일 오전 10시 발행 · 화~금 일간, 금~월 통합 (월요일 발행)
        </footer>
      </body>
    </html>
  );
}
