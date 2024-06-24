import React, { ReactNode, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '@/components/shared/context/Theme';

import { Preloader } from '@/components/features/PreLoader';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <React.StrictMode>
      <SessionProvider>
        <ThemeProvider>
          <Suspense fallback={<Preloader />}>
            {children}
          </Suspense>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </SessionProvider>
    </React.StrictMode>
  );
};

export default Providers;
