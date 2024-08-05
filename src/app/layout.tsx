import React, { ReactNode } from "react";

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
  metadataBase: new URL("https://ratetable.vercel.app"),
  description:
    "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  icons: "/images/LOGO.webp",
  robots: "index, follow",
  creator: "antavros",
  keywords:
    "antavros ratetable rate table аниме сериалы мультсериалы фильмы новинки кинофильмы кинотеатр 2020 2021 2022 2024 просмотр видеоролики",
  openGraph: {
    title: "RATETABLE",
    siteName: "RATETABLE",
    locale: "ru_RU",
    type: "article",
    description:
      "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  },
  twitter: {
    card: "summary_large_image",
    title: "RATETABLE",
    description:
      "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  },
};

import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

import Providers from "./providers";

import { Sidebar } from "@/components/widgets/Sidebar";
import { Footer } from "@/components/widgets/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body id="body" className={`not_initialized ${ubuntu.className}`}>
        <Providers>
          <Sidebar />
          <div className="content">
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
