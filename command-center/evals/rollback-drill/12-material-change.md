# R-12 Material-change assessment (SOP 4.6)

Time: 2026-11-08T10:34:00.439836+00:00

**Question:** did the restored version's meaning or recommendation change materially?

**Finding:** v1 is byte-identical to the packet the owner approved in A1 (sha256 matches: True). Its approval record is intact and valid. The restored version has not changed, so **no material change**: the v1 approval is retained and the status is `APPROVED`.

**Consequence:** the owner's requested change (the weekly-cadence recommendation) exists only in v2, which is INVALID, so it is not part of the restored v1. A corrected packet (v3, not v2: superseded numbers are not reused) is required, and it needs fresh owner approval.
