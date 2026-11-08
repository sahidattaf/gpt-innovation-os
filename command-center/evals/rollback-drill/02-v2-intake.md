```json
{
  "canonical_owner_command": {
    "command_id": "GIC-20261108-901",
    "version": "v2",
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
    "revision_notes": "v2 adds cadence recommendation as a second objective alongside the inclusion recommendation. Both objectives are addressed within the same one-page deliverable.",
    "missing_fields": [],
    "ambiguities": [
      {
        "id": "AMB-01",
        "field": "deliverable / scope",
        "description": "The original deliverable is 'one-page internal recommendation.' Adding a cadence recommendation (v2) expands the content. Confirm that both the inclusion recommendation and the cadence recommendation can be addressed within the one-page constraint, or whether the page limit should be adjusted.",
        "blocking": false
      },
      {
        "id": "AMB-02",
        "field": "objective — cadence definition",
        "description": "'Weekly cadence' is used in the revision request, but the pilot summary is itself weekly. Clarify whether 'how often it should be updated and reviewed' means within each week (e.g., mid-week update + end-of-week review), or refers to a different rhythm (e.g., bi-weekly review of the KPI section itself).",
        "blocking": false
      }
    ]
  },
  "normalizer_notes": {
    "scope_change": "None. The v2 revision adds a second sub-objective (cadence) but does not expand the organizational scope beyond GPT Innovation Command Center.",
    "source_permissions": "No new sources inferred or granted. Permitted sources remain as declared by owner.",
    "no_secrets_detected": true,
    "approval_status": "Not approved — normalization only. No external or production action triggered."
  }
}
```