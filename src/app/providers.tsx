'use client';

import React from "react";

import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export default function Providers({ children }: any) {

  return (
    <React.StrictMode>
      {children}
      <SpeedInsights />
      <Analytics />
    </React.StrictMode>
  );
}
