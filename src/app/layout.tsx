import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevPortfolioX — Full Stack Engineer",
    template: "%s | DevPortfolioX",
  },
  description:
    "Full Stack Engineer specializing in scalable Spring Boot systems and modern Angular interfaces. Secure APIs, type-safe frontends, and clean PostgreSQL database design.",
  keywords: [
    "Full Stack Engineer",
    "Angular",
    "TypeScript",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "REST API",
    "React",
    "Vue",
  ],
  authors: [{ name: "DevPortfolioX" }],
  openGraph: {
    title: "DevPortfolioX — Full Stack Engineer",
    description:
      "Scalable Spring Boot systems. Modern Angular interfaces. Secure, maintainable, production-grade engineering.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a13" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
