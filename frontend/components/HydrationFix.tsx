"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    // Remove any browser extension attributes that might cause hydration mismatches
    const body = document.body;
    const attributesToRemove = ['wotdisconnected'];

    attributesToRemove.forEach(attr => {
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });

    // Also clean up any extension-added elements or attributes on html element
    const html = document.documentElement;
    attributesToRemove.forEach(attr => {
      if (html.hasAttribute(attr)) {
        html.removeAttribute(attr);
      }
    });
  }, []);

  return null;
}
