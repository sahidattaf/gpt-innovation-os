# GPTI Video-First Website — Local QA Report

**Gate:** GPTI-VIDEO-WEBSITE-2A

**Branch:** `feat/video-first-website`

**Date:** 2026-09-04

## Visual and journey checks

| Surface                   | Result | Evidence checked                                                                                |
| ------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| Homepage                  | Pass   | Hero hierarchy, Episode 1 presentation, CTAs, three featured cards, industry grid and footer    |
| Video Hub                 | Pass   | Eight unique cards, production statuses, episode links, YouTube CTA and Discovery CTA           |
| Episode 1 guide           | Pass   | Title, hook, status boundary, future-player placeholder and navigation                          |
| Discovery                 | Pass   | Form presentation, 14 controls, required-field validation and no automatic submission           |
| Desktop overflow          | Pass   | Document width remained within the rendered viewport on all checked routes                      |
| Responsive implementation | Pass   | Breakpoints stack hero, cards, CTA groups and footer; mobile navigation is available below `md` |
| Application console       | Pass   | No application-origin errors during the checked journeys                                        |

The available controlled browser rendered a desktop viewport. Mobile behavior was verified through the responsive implementation, navigation states, breakpoint classes, production build and absence of fixed-width content; no separate device-emulation screenshot was produced.

## Automated checks

- Prettier: passed
- Preview adapter syntax: passed
- TypeScript: passed
- ESLint: passed with no warnings or errors
- Automated tests: 11 passed, 0 failed
- Next.js production build: passed
- Static pages generated: 23, including the Video Hub and eight episode guides

## Boundaries verified

- No unpublished YouTube video ID is exposed.
- No private Notion URL is committed in public website source.
- No production data, credentials or customer information was used.
- No WhatsApp message was sent during form validation.
- No deployment, merge or production configuration change occurred.
