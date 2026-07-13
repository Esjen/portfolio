import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";
import PageLoader from "@/components/PageLoader";
import MouseSpotlight from "@/components/MouseSpotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://portfolio-seven-red-60o1w6yc1i.vercel.app"
  ),

  title: {
    default: "John Esonu | AI Automation Engineer",
    template: "%s | John Esonu",
  },

  description:
    "AI Automation Engineer, Backend Developer, and Full-Stack Developer specializing in n8n, Node.js, FastAPI, React, Next.js, PostgreSQL, and intelligent workflow automation.",

  keywords: [
    "John Esonu",
    "AI Automation Engineer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer",
    "n8n",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Portfolio",
    "Nigeria",
  ],

  authors: [
    {
      name: "John Esonu",
    },
  ],

  creator: "John Esonu",

  publisher: "John Esonu",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "John Esonu | AI Automation Engineer",

    description:
      "Portfolio showcasing AI automation workflows, backend development, full-stack applications, and software engineering projects.",

    url: "https://portfolio-seven-red-60o1w6yc1i.vercel.app",

    siteName: "John Esonu Portfolio",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "John Esonu Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "John Esonu | AI Automation Engineer",

    description:
      "Backend Developer • AI Automation Engineer • Full-Stack Developer",

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ScrollProgress />

        <ThemeProvider>
          <PageLoader />

          <MouseSpotlight />

          <CommandPalette />

          {children}

          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}