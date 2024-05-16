import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

import { Header } from "../widgets/header/header";
import { Sidebar } from "../widgets/sidebar/sidebar";
import { Footer } from "../widgets/footer/footer";
import { FastNavigation } from "../features/fastNav/fastNav";
import "./globals.css";

import "material-symbols"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import type { Viewport } from 'next'
export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

import Head from 'next/head'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'RATETABLE',
  description: 'Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!',
  icons: '/images/LOGO.svg',
  robots: 'index, follow',
  creator: 'antavros',
  keywords: 'фильмы новинки кинофильмы кинотеатр 2020 2021 2022 просмотр видеоролики',
  openGraph: {
    title: 'RATETABLE',
    images: '/images/LOGO.png',
    description: 'Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!',
    siteName: 'RATETABLE',
    locale: 'ru_RU',
    type: 'article',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <Head>
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      </Head>

      <body className={inter.className}>
        <Header />
          <hr />
          <Sidebar />
          <main>
            {children}
          </main>
          <hr />
          <Footer />
        <FastNavigation />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
