import { track } from "@vercel/analytics";

export const CTA_LOCATIONS = ["header", "home", "contact", "footer"] as const;

export type CtaLocation = (typeof CTA_LOCATIONS)[number];

export type LeadMeasurementEvent =
  | {
      name: "discovery_cta_selected";
      properties: { cta_location: CtaLocation };
    }
  | { name: "intake_started"; properties?: undefined }
  | {
      name: "validation_completed";
      properties: { result: "valid" };
    }
  | {
      name: "whatsapp_continuation_selected";
      properties: { source: "discovery_review" };
    };

export type LeadMeasurementTransport = (
  name: LeadMeasurementEvent["name"],
  properties?: Record<string, string>,
) => void;

export function shouldSendLeadMeasurement(
  environment = process.env.NEXT_PUBLIC_VERCEL_ENV,
): boolean {
  return environment === "production";
}

export function sendLeadMeasurement(
  event: LeadMeasurementEvent,
  transport: LeadMeasurementTransport = track,
  environment = process.env.NEXT_PUBLIC_VERCEL_ENV,
): boolean {
  if (!shouldSendLeadMeasurement(environment)) {
    return false;
  }

  transport(event.name, event.properties);
  return true;
}
