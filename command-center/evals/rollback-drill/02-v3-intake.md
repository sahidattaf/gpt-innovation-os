```json
{
  "canonical_owner_command": {
    "command_id": "GIC-20261108-901",
    "version": "v3",
    "status": "READY",
    "objective": "Recommend whether the pilot weekly status summary should include a KPI section; also recommend a weekly cadence for the KPI section (how often it should be updated and reviewed).",
    "deliverable": "One-page internal recommendation",
    "in_scope": [
      "GPT Innovation Command Center"
    ],
    "out_of_scope": [
      "BOSSA",
      "Clients"
    ],
    "permitted_sources": [
      "GPT Innovation Command Center"
    ],
    "priority": "NORMAL",
    "revision_notes": "v3 revision appended cadence recommendation to the objective. Original inclusion/exclusion question preserved. No scope broadening applied.",
    "voice_note": false
  },
  "missing_fields": [],
  "ambiguities": [
    {
      "id": "AMB-01",
      "field": "OBJECTIVE / REVISION",
      "description": "'Weekly cadence' could mean the update frequency of the KPI data itself, the review frequency by stakeholders, or both. The revision request says 'how often it should be updated AND reviewed', which implies both are required — confirmed as dual-part. No guess made; both parts are carried forward as written.",
      "resolution_required": false,
      "owner_action": "None required unless the two cadences (update vs. review) should be treated as separate deliverable sections."
    },
    {
      "id": "AMB-02",
      "field": "DELIVERABLE",
      "description": "The original deliverable is 'one-page internal recommendation.' The v3 revision adds a second recommendation topic (cadence). Confirm that both recommendations fit within the one-page constraint or whether the page limit should be relaxed for v3.",
      "resolution_required": false,
      "owner_action": "Optional confirmation that one page still applies to the expanded scope of v3."
    }
  ],
  "normalizer_notes": [
    "Scope was NOT broadened. BOSSA and clients remain excluded.",
    "No deadline was present in the original command; none has been invented.",
    "No external or production action triggered.",
    "No secrets detected in this input.",
    "Revision request integrated into objective field verbatim in meaning; wording tightened for canonical clarity only."
  ]
}
```