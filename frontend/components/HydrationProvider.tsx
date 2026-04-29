"use client";

import { useEffect, useState } from "react";

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // During SSR and initial hydration, suppress warnings
    return <>{children}</>;
  }

  return <>{children}</>;
}
