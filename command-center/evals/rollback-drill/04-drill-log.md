# R-04 drill log (SIMULATED FAILURE)

Time: 2026-11-08T10:22:59.130717+00:00

After v2 was generated and validated clean (sha256 0d05a555ab7ead0cb365f327adae809d7f748df55754473e4805154f04860738), the operator inserted ONE unsupported claim into the packet's Evidence Summary table (line 33):

`| E-4 | Weekly KPI sections reduced owner review time by 40%. | VERIFIED_SOURCE | — | — |`

It is labelled VERIFIED_SOURCE and has no source reference. This is a SIMULATED material hallucination (SOP trigger 'material hallucination', scenario A). It is not a model output. The owner is briefed on the drill but is not told where the defect is.

Packet sha256 after injection: 749a5321f46da04a9a720ed213dff772523020e110a46d3b232d44eab1b9d25e
