# GPTI Video-First Website Specification

**Gate:** GPTI-VIDEO-WEBSITE-1

**Owner:** Sahid Attaf

**Owning application:** `apps/website`

**Status:** Local prototype only

## Business outcome

Turn the GPT Innovation by Attaf public website into the owned destination for its YouTube content. Short-form videos create awareness, episode pages explain practical business value, and the existing privacy-aware Discovery flow prepares a visitor-controlled WhatsApp conversation.

## Audience

Curaçao and Caribbean restaurant, hotel, real-estate and service-business operators who want practical AI guidance without exaggerated autonomy or performance claims.

## Primary journey

1. Visitor discovers a Short or full YouTube episode.
2. Visitor opens the website Video Hub or matching episode guide.
3. Visitor understands the relevant workflow, limits and human-review boundary.
4. Visitor starts AI Discovery.
5. The existing form prepares a message locally; the visitor decides whether to send it through WhatsApp.

## Information architecture

- `/` — video-led brand entry point
- `/videos` — eight-episode season hub
- `/videos/[slug]` — indexable episode guide and future YouTube embed location
- `/discovery` — existing controlled conversion workflow
- Existing product, industry, about and contact routes remain available

## Content controls

- Add a public YouTube video ID only after owner approval and publication.
- Planned episodes show `Coming soon`; Episode 1 shows `In production`.
- Do not imply prototypes are paid client deployments.
- Do not invent results, integrations, certifications or testimonials.
- Legal, financial, safety and high-impact outputs require human review.

## Multilingual roadmap

The content model is ready for reviewed titles, summaries and captions in English, Papiamentu, Dutch and Spanish. This gate does not add a translation CMS or publish unreviewed translations.

## Acceptance criteria

- Eight unique episodes match the approved Notion production pack.
- No unpublished YouTube video ID is exposed.
- Episode pages resolve through static parameters.
- YouTube links open the verified `@InnovationByAttaf` channel.
- Discovery links reuse the existing measurement and privacy controls.
- Lint, typecheck, automated tests and production build complete successfully.
- No deployment, external message, Notion modification or production mutation occurs.

## Rollback

Revert files introduced or changed on `feat/video-first-website`. No migration, environment-variable or production rollback is required.

## Local preview compatibility

The root development command preserves the normal Turborepo workflow. When the controlled preview runner supplies host and port arguments, the adapter starts only `apps/website` and translates the host flag for Next.js. `terminal.local` is allowed only as a development origin; production behavior is unchanged.
