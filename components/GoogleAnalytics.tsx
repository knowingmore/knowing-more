"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = "G-S7D5BTQJNM";
const STORAGE_KEY = "km_cookie_choice";

/**
 * Loads Google Analytics 4 only after the user has accepted optional
 * cookies via the CookieBanner. Listens for live consent changes so the
 * script can be loaded without a page reload.
 */
export default function GoogleAnalytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      const choice = localStorage.getItem(STORAGE_KEY);
      setAccepted(choice === "accept");
    };

    check();

    // Listen to cookie consent changes dispatched by CookieBanner.
    const onConsent = () => check();
    window.addEventListener("km-cookie-consent-changed", onConsent);

    // Also re-check on storage events from other tabs.
    window.addEventListener("storage", onConsent);

    return () => {
      window.removeEventListener("km-cookie-consent-changed", onConsent);
      window.removeEventListener("storage", onConsent);
    };
  }, []);

  if (!accepted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
