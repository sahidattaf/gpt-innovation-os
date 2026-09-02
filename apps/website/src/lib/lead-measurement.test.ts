import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  sendLeadMeasurement,
  shouldSendLeadMeasurement,
} from "./lead-measurement";
import type { LeadMeasurementTransport } from "./lead-measurement";

describe("lead measurement environment boundary", () => {
  it("sends only in the production environment", () => {
    assert.equal(shouldSendLeadMeasurement("production"), true);
    assert.equal(shouldSendLeadMeasurement("preview"), false);
    assert.equal(shouldSendLeadMeasurement("development"), false);
    assert.equal(shouldSendLeadMeasurement(undefined), false);
  });

  it("keeps preview traffic out of the analytics transport", () => {
    const calls: unknown[] = [];
    const transport: LeadMeasurementTransport = (...args) => calls.push(args);

    assert.equal(
      sendLeadMeasurement({ name: "intake_started" }, transport, "preview"),
      false,
    );
    assert.deepEqual(calls, []);
  });
});

describe("lead measurement allowlist", () => {
  it("sends only the approved event name and property", () => {
    const calls: unknown[] = [];
    const transport: LeadMeasurementTransport = (...args) => calls.push(args);

    assert.equal(
      sendLeadMeasurement(
        {
          name: "discovery_cta_selected",
          properties: { cta_location: "home" },
        },
        transport,
        "production",
      ),
      true,
    );
    assert.deepEqual(calls, [
      ["discovery_cta_selected", { cta_location: "home" }],
    ]);
  });

  it("supports the approved form milestones without form values", () => {
    const calls: unknown[] = [];
    const transport: LeadMeasurementTransport = (...args) => calls.push(args);

    sendLeadMeasurement({ name: "intake_started" }, transport, "production");
    sendLeadMeasurement(
      { name: "validation_completed", properties: { result: "valid" } },
      transport,
      "production",
    );
    sendLeadMeasurement(
      {
        name: "whatsapp_continuation_selected",
        properties: { source: "discovery_review" },
      },
      transport,
      "production",
    );

    assert.deepEqual(calls, [
      ["intake_started", undefined],
      ["validation_completed", { result: "valid" }],
      ["whatsapp_continuation_selected", { source: "discovery_review" }],
    ]);
  });
});
