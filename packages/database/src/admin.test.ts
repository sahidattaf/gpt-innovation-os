/**
 * A05 boundary verification — compile-time + runtime checks.
 *
 * These tests use synthetic placeholder values. They do NOT connect to
 * Supabase and do NOT require real secrets.
 *
 * Source-text checks read the original .ts files from packages/database/src/
 * (resolved relative to this file's location). Runtime checks use the
 * compiled output via require().
 *
 * Limitation: `server-only` throws unconditionally when required in a plain
 * Node test runner (no Next.js bundler context). The admin module therefore
 * cannot be require()'d directly in tests. Source-text checks and checks on
 * the shared requireEnv helper substitute for direct require of admin.ts.
 *
 * Run via: pnpm --filter @gpt-os/database test
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Source files live in src/ relative to this file's directory.
const SRC = resolve(__dirname, ".."); // packages/database/  when run from .test-dist
// __dirname will be .test-dist/ at runtime, so src/ is one level up then src/
const srcFile = (name: string) => resolve(__dirname, "..", "src", name);

// ── 1. Public entry does NOT reference adminDb or getAdminDb ─────────────────

test("index.ts does not export adminDb or getAdminDb", () => {
  const src = readFileSync(srcFile("index.ts"), "utf8");
  // Strip comments before checking for exports.
  const noComments = src.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(
    !noComments.includes("adminDb"),
    "index.ts code must not reference adminDb",
  );
  assert.ok(
    !noComments.includes("getAdminDb"),
    "index.ts code must not re-export getAdminDb (server-only boundary)",
  );
});

// ── 2. admin.ts is guarded by the server-only package ────────────────────────

test('admin.ts contains import "server-only"', () => {
  const src = readFileSync(srcFile("admin.ts"), "utf8");
  assert.ok(
    src.includes('import "server-only"'),
    'admin.ts must contain: import "server-only"',
  );
});

// ── 3. admin.ts uses lazy construction (no top-level createClient call) ──────

test("admin.ts does not call createClient at the module top level", () => {
  const src = readFileSync(srcFile("admin.ts"), "utf8");
  const lines = src.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    // A top-level createClient call would start with "createClient" or
    // "= createClient" at zero / minimal indentation.
    // Inside a function body it will be indented by at least 4 spaces.
    if (trimmed.startsWith("createClient") && !line.startsWith("  ")) {
      assert.fail(
        `createClient appears at module top level in admin.ts: "${line}"`,
      );
    }
  }
});

// ── 4. admin.ts exports getAdminDb as a function (not an eager constant) ─────

test("admin.ts exports getAdminDb as a function", () => {
  const src = readFileSync(srcFile("admin.ts"), "utf8");
  assert.ok(
    src.includes("export function getAdminDb"),
    "admin.ts must export getAdminDb as a function",
  );
  assert.ok(
    !src.includes("export const adminDb"),
    "admin.ts must not export adminDb as an eager constant",
  );
});

// ── 5. client.ts does NOT reference SUPABASE_SERVICE_ROLE_KEY ────────────────

test("client.ts does not reference SUPABASE_SERVICE_ROLE_KEY", () => {
  const src = readFileSync(srcFile("client.ts"), "utf8");
  assert.ok(
    !src.includes("SUPABASE_SERVICE_ROLE_KEY"),
    "client.ts must not reference SUPABASE_SERVICE_ROLE_KEY",
  );
});

// ── 6. requireEnv throws clearly naming the missing variable ─────────────────

test("requireEnv throws naming the missing variable", () => {
  const orig = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  delete process.env["SUPABASE_SERVICE_ROLE_KEY"];

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { requireEnv } = require("./client") as {
      requireEnv: (key: string) => string;
    };
    assert.throws(
      () => requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.ok(
          err.message.includes("SUPABASE_SERVICE_ROLE_KEY"),
          `Error must name the missing variable, got: "${err.message}"`,
        );
        return true;
      },
    );
  } finally {
    if (orig !== undefined) process.env["SUPABASE_SERVICE_ROLE_KEY"] = orig;
  }
});

// ── 7. requireEnv returns value when env var is present ──────────────────────

test("requireEnv returns the env var value when present", () => {
  const orig = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  process.env["NEXT_PUBLIC_SUPABASE_URL"] = "https://placeholder.supabase.co";

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { requireEnv } = require("./client") as {
      requireEnv: (key: string) => string;
    };
    assert.equal(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      "https://placeholder.supabase.co",
    );
  } finally {
    if (orig !== undefined) process.env["NEXT_PUBLIC_SUPABASE_URL"] = orig;
    else delete process.env["NEXT_PUBLIC_SUPABASE_URL"];
  }
});

// ── 8. getDb() throws clearly when public vars are absent ────────────────────

test("getDb() throws naming the missing variable when env absent", () => {
  const origUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const origAnon = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
  delete process.env["NEXT_PUBLIC_SUPABASE_URL"];
  delete process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getDb } = require("./client") as { getDb: () => unknown };
    assert.throws(
      () => getDb(),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.ok(
          err.message.includes("NEXT_PUBLIC_SUPABASE_URL"),
          `Error must name the missing variable, got: "${err.message}"`,
        );
        return true;
      },
    );
  } finally {
    if (origUrl !== undefined) process.env["NEXT_PUBLIC_SUPABASE_URL"] = origUrl;
    if (origAnon !== undefined) process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] = origAnon;
  }
});
