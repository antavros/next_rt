"use client";

import React, { Suspense, StrictMode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import ThemeProvider from "@/components/shared/context/theme";
import { SessionProvider } from "next-auth/react";
import { PreLoader } from "@/components/widgets/preLoader";
          // <Suspense fallback={<PreLoader />}>{children}</Suspense>

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StrictMode>
      <SessionProvider>
        <ThemeProvider>
          {/* Обернули в Suspense с ленивым компонентом PreLoader */}
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </SessionProvider>
    </StrictMode>
  );
};

export default Providers;
