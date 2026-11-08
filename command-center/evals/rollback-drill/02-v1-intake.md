```json
{
  "canonical_owner_command": {
    "command_id": "GIC-20261108-901",
    "status": "READY",
    "objective": "Recommend whether the pilot weekly status summary should include a KPI section",
    "deliverable": "One-page internal recommendation",
    "scope": {
      "in_scope": ["GPT Innovation Command Center"],
      "out_of_scope": ["BOSSA", "clients"]
    },
    "permitted_sources": ["GPT Innovation Command Center"],
    "priority": "NORMAL",
    "deadline": null,
    "voice_note": false,
    "owner_verification_required": false
  },
  "missing_fields": [
    {
      "field": "deadline",
      "severity": "LOW",
      "note": "No deadline specified. Command can proceed at NORMAL priority without one, but owner may wish to add a target delivery date."
    }
  ],
  "ambiguities": [
    {
      "id": "AMB-01",
      "field": "objective",
      "description": "'Pilot weekly status summary' is referenced without identifying which pilot or which iteration of the summary is in scope. If multiple pilots are active within the GPT Innovation Command Center, the target pilot should be confirmed.",
      "severity": "LOW",
      "blocking": false
    },
    {
      "id": "AMB-02",
      "field": "permitted_sources",
      "description": "Permitted sources are limited to 'GPT Innovation Command Center.' It is unclear whether this refers to internal documentation, team input, existing KPI frameworks, or all of the above within that boundary. Clarification would improve sourcing precision.",
      "severity": "LOW",
      "blocking": false
    }
  ],
  "normalizer_notes": {
    "scope_changes": "None. Scope preserved exactly as submitted.",
    "secrets_detected": false,
    "approval_granted": false,
    "external_actions_triggered": false,
    "normalizer_version": "v1.1",
    "guard_model_input_passed": true
  }
}
```