export { db } from "./client";
// adminDb is intentionally NOT re-exported here. Import it server-side only via "@gpt-os/database/admin".
export type { Database, Tables } from "./types";
