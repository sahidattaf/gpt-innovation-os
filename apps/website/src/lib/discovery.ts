const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EXCESS_WHITESPACE = /[ \t]+/g;
const MAX_FIELD_LENGTH = 240;
const MAX_MESSAGE_LENGTH = 1800;

export const DISCOVERY_OPTIONS = {
  roles: ["Owner", "Manager", "Operator", "Team member", "Other"],
  businessTypes: [
    "Restaurant",
    "Hotel or resort",
    "Apartments or vacation rental",
    "Tour operator",
    "Hospitality service business",
    "Other",
  ],
  challenges: [
    "Repetitive administration",
    "Slow customer or guest responses",
    "Weak lead follow-up",
    "Disorganized SOPs or operations",
    "Content and marketing workload",
    "Reporting and decision visibility",
    "Staff training or knowledge access",
    "Other",
  ],
  desiredResults: [
    "Save time",
    "Improve organization",
    "Improve follow-up",
    "Improve guest service",
    "Improve decision-making",
    "Other",
  ],
  urgencies: ["Exploring", "Within 30 days", "Within 60–90 days", "Urgent"],
  investmentReadiness: [
    "I need guidance",
    "Ready for a focused pilot",
    "Ready to discuss a larger implementation",
  ],
  supportPreferences: ["One-time setup", "Ongoing support", "Unsure"],
  decisionStatuses: [
    "I make the final decision",
    "The decision is shared",
    "I am researching for someone else",
  ],
} as const;

export type DiscoveryFormData = {
  contactName: string;
  businessName: string;
  role: string;
  businessType: string;
  location: string;
  challenge: string;
  challengeDetail: string;
  desiredResult: string;
  currentTools: string;
  urgency: string;
  investmentReadiness: string;
  supportPreference: string;
  decisionStatus: string;
  privacyAccepted: boolean;
};

export type DiscoveryFieldErrors = Partial<Record<keyof DiscoveryFormData, string>>;

export const INITIAL_DISCOVERY_FORM: DiscoveryFormData = {
  contactName: "",
  businessName: "",
  role: "",
  businessType: "",
  location: "Curaçao",
  challenge: "",
  challengeDetail: "",
  desiredResult: "",
  currentTools: "",
  urgency: "",
  investmentReadiness: "",
  supportPreference: "",
  decisionStatus: "",
  privacyAccepted: false,
};

export function sanitizeDiscoveryValue(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARACTERS, "")
    .split("\n")
    .map((line) => line.replace(EXCESS_WHITESPACE, " ").trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, MAX_FIELD_LENGTH);
}

export function validateDiscoveryForm(data: DiscoveryFormData): DiscoveryFieldErrors {
  const errors: DiscoveryFieldErrors = {};
  const requiredTextFields: Array<keyof DiscoveryFormData> = [
    "contactName",
    "businessName",
    "role",
    "businessType",
    "location",
    "challenge",
    "desiredResult",
    "urgency",
    "investmentReadiness",
    "decisionStatus",
  ];

  for (const field of requiredTextFields) {
    const value = data[field];
    if (typeof value === "string" && !sanitizeDiscoveryValue(value)) {
      errors[field] = "This field is required.";
    }
  }

  if (!data.privacyAccepted) {
    errors.privacyAccepted = "Please confirm before continuing.";
  }

  return errors;
}

export function buildDiscoveryMessage(data: DiscoveryFormData): string {
  const rows = [
    ["Name", data.contactName],
    ["Business", data.businessName],
    ["Role", data.role],
    ["Business type", data.businessType],
    ["Location", data.location],
    ["Main challenge", data.challenge],
    ["Challenge detail", data.challengeDetail],
    ["Desired result", data.desiredResult],
    ["Current tools", data.currentTools],
    ["Urgency", data.urgency],
    ["Investment readiness", data.investmentReadiness],
    ["Support preference", data.supportPreference],
    ["Decision status", data.decisionStatus],
  ] as const;

  const summary = rows
    .map(([label, value]) => [label, sanitizeDiscoveryValue(value)] as const)
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    "Hello Coach Sahid,",
    "",
    "AI Discovery Request — GPT Innovation by Attaf",
    "",
    summary,
    "",
    "I understand this request is not a contract, confirmed booking, price quote, or delivery promise.",
  ]
    .join("\n")
    .slice(0, MAX_MESSAGE_LENGTH);
}

export function buildDiscoveryWhatsAppUrl(
  data: DiscoveryFormData,
  whatsappNumber = "59995230683",
): string {
  const digitsOnly = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(buildDiscoveryMessage(data))}`;
}
