"use client";

import { Analytics } from "@vercel/analytics/next";
import type { BeforeSendEvent } from "@vercel/analytics/next";

function removeQueryAndHash(event: BeforeSendEvent): BeforeSendEvent {
  const url = new URL(event.url, window.location.origin);

  return {
    ...event,
    url: `${url.origin}${url.pathname}`,
  };
}

export function PrivacySafeAnalytics() {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  return (
    <Analytics
      mode={isProduction ? "production" : "development"}
      debug={false}
      beforeSend={removeQueryAndHash}
    />
  );
}
