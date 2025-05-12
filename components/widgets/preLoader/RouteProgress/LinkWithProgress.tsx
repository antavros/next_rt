"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

interface LinkWithProgressProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LinkWithProgress({
  href,
  children,
  className,
}: LinkWithProgressProps) {
  const router = useRouter();

  const handleClick = () => {
    NProgress.start();
    router.push(href);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
