import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildDiscoveryMessage,
  buildDiscoveryWhatsAppUrl,
  INITIAL_DISCOVERY_FORM,
  sanitizeDiscoveryValue,
  validateDiscoveryForm,
} from "./discovery";
import type { DiscoveryFormData } from "./discovery";

const COMPLETE_FORM: DiscoveryFormData = {
  ...INITIAL_DISCOVERY_FORM,
  contactName: "Maria",
  businessName: "Island View Hotel",
  role: "Owner",
  businessType: "Hotel or resort",
  challenge: "Slow customer or guest responses",
  desiredResult: "Improve guest service",
  urgency: "Within 30 days",
  investmentReadiness: "Ready for a focused pilot",
  decisionStatus: "I make the final decision",
  privacyAccepted: true,
};

describe("sanitizeDiscoveryValue", () => {
  it("removes control characters, collapses whitespace, and limits length", () => {
    assert.equal(sanitizeDiscoveryValue("  Hello\u0000   team\n next  "), "Hello team next");
    assert.equal(sanitizeDiscoveryValue("x".repeat(300)).length, 240);
  });
});

describe("validateDiscoveryForm", () => {
  it("reports required fields and consent", () => {
    const errors = validateDiscoveryForm(INITIAL_DISCOVERY_FORM);
    assert.ok(errors.contactName);
    assert.ok(errors.privacyAccepted);
  });

  it("accepts a complete request", () => {
    assert.deepEqual(validateDiscoveryForm(COMPLETE_FORM), {});
  });
});

describe("WhatsApp discovery handoff", () => {
  it("includes only reviewed values and the non-contract statement", () => {
    const message = buildDiscoveryMessage(COMPLETE_FORM);
    assert.match(message, /AI Discovery Request — GPT Innovation by Attaf/);
    assert.match(message, /Business: Island View Hotel/);
    assert.match(message, /not a contract/);
    assert.doesNotMatch(message, /Current tools:/);
  });

  it("uses the approved WhatsApp number and an encoded draft", () => {
    const url = buildDiscoveryWhatsAppUrl(COMPLETE_FORM);
    assert.match(url, /^https:\/\/wa\.me\/59995230683\?text=/);
    const encodedMessage = url.split("?text=")[1];
    assert.ok(encodedMessage);
    assert.match(decodeURIComponent(encodedMessage ?? ""), /Name: Maria/);
  });
});
