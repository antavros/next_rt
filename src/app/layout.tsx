import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Footer } from "@/widgets/Footer";
import { FastNavigation } from "@/features/NavArrow";
import "./globals.css";

import "material-symbols";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Head from "next/head";
import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "RATETABLE",
  description:
    "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  icons: "/images/LOGO.svg",
  robots: "index, follow",
  creator: "antavros",
  keywords:
    "фильмы новинки кинофильмы кинотеатр 2020 2021 2022 просмотр видеоролики",
  openGraph: {
    title: "RATETABLE",
    siteName: "RATETABLE",
    locale: "ru_RU",
    type: "article",
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <Head>
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      </Head>

      <body id="body" className={inter.className}>
        <Header />
        <hr />
        <Sidebar />
        <main>{children}</main>
        <hr />
        <Footer />
        <FastNavigation />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
