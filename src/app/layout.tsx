// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Header } from "@/components/Header";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: "Store - 현대적인 E-Commerce 플랫폼",
    template: "%s | Store"
  },
  description:
    "Next.js 15, React 19, TypeScript로 구현한 현대적인 E-Commerce 플랫폼. 장바구니, 검색, 필터링, 주문 시스템을 갖춘 프론트엔드 포트폴리오 프로젝트입니다.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "E-Commerce",
    "쇼핑몰",
    "포트폴리오",
    "Zustand",
    "Tailwind CSS"
  ],
  authors: [{ name: "Frontend Developer" }],
  creator: "Frontend Developer",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "Store - 현대적인 E-Commerce 플랫폼",
    description:
      "Next.js 15, React 19, TypeScript로 구현한 현대적인 E-Commerce 플랫폼",
    siteName: "Store"
  },
  twitter: {
    card: "summary_large_image",
    title: "Store - 현대적인 E-Commerce 플랫폼",
    description:
      "Next.js 15, React 19, TypeScript로 구현한 현대적인 E-Commerce 플랫폼"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" translate="no" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <Providers>
            <Header />
            <main role="main">{children}</main>
            <footer
              className="border-t mt-16 py-6 text-center text-sm text-gray-500"
              role="contentinfo"
            >
              © {new Date().getFullYear()} Storefront
            </footer>
            <ToastContainer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
