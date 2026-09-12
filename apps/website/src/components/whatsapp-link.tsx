"use client";

import type { ComponentProps } from "react";
import { sendLeadMeasurement } from "@/lib/lead-measurement";
import type { CtaLocation } from "@/lib/lead-measurement";

type WhatsAppLinkProps = ComponentProps<"a"> & {
  location: CtaLocation;
};

export function WhatsAppLink({ location, onClick, ...props }: WhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        sendLeadMeasurement({
          name: "whatsapp_cta_selected",
          properties: { cta_location: location },
        });
        onClick?.(event);
      }}
    />
  );
}
