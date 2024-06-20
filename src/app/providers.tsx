'use client';

import React from 'react';
import ThemeProvider from '@/shared/context/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      <SpeedInsights />
      <Analytics />
    </React.StrictMode>
  );
};

export default Providers;
