"use client";

import React, { Suspense, StrictMode } from "react";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/shared/context/theme";
// import { PreLoader } from "@/components/widgets/preLoader";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StrictMode>
      <SessionProvider>
        <ThemeProvider>
          {/* Для отображения загрузки во время ленивой загрузки */}
          {/* <Suspense fallback={<PreLoader />}> */}
          {children}
          {/* </Suspense> */}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </SessionProvider>
    </StrictMode>
  );
};

export default Providers;
