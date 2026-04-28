"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CLARITY_ID = "witwjzk3uj";
const STORAGE_KEY = "km_cookie_choice";

/**
 * Loads Microsoft Clarity (session recordings + heatmaps) only after the
 * user has accepted optional cookies via the CookieBanner.
 */
export default function MicrosoftClarity() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      const choice = localStorage.getItem(STORAGE_KEY);
      setAccepted(choice === "accept");
    };

    check();

    const onConsent = () => check();
    window.addEventListener("km-cookie-consent-changed", onConsent);
    window.addEventListener("storage", onConsent);

    return () => {
      window.removeEventListener("km-cookie-consent-changed", onConsent);
      window.removeEventListener("storage", onConsent);
    };
  }, []);

  if (!accepted) return null;

  return (
    <Script id="ms-clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
