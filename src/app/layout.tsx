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
  metadataBase: new URL('https://ratetable.vercel.app'),
  description: "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  icons: "/images/LOGO.svg",
  publisher: "index, follow",
  creator: "antavros",
  keywords: "фильмы новинки кинофильмы кинотеатр 2020 2021 2022 просмотр видеоролики",
  openGraph: {
    title: "RATETABLE",
    siteName: "RATETABLE",
    locale: "ru_RU",
    images: "/images/LOGO.png",
    type: "article",
    description: "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  },
  twitter: {
    card: "summary_large_image",
    title: "RATETABLE",
    images: "/images/LOGO.png",
    description: "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  },
};

import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

import Providers from './providers'

import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Footer } from "@/widgets/Footer";
import "./globals.css";

export default function RootLayout({ children, }: { readonly children: ReactNode; }) {

  return (
    <html lang="ru">
      <body id="body" className={ubuntu.className}>
        <Providers>
          <Header />
          <Sidebar />
          <main>
            <hr />
            {children}
            <hr />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
