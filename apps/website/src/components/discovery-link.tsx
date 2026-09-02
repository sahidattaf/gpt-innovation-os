"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { sendLeadMeasurement } from "@/lib/lead-measurement";
import type { CtaLocation } from "@/lib/lead-measurement";

type DiscoveryLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  location: CtaLocation;
};

export function DiscoveryLink({
  location,
  onClick,
  ...props
}: DiscoveryLinkProps) {
  return (
    <Link
      {...props}
      href="/discovery"
      onClick={(event) => {
        sendLeadMeasurement({
          name: "discovery_cta_selected",
          properties: { cta_location: location },
        });
        onClick?.(event);
      }}
    />
  );
}
