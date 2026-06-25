// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {t_} from "../../vendor/m2594.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Anthropic-hosted MCP server blocklist for local OAuth.
 *
 * Exposes helpers to detect whether a given MCP server URL/name resolves to an
 * Anthropic-hosted endpoint that must be connected through claude.ai instead of
 * local OAuth, and to build the human-readable error message for that case.
 */

// ---------------------------------------------------------------------------
// Cross-module symbols (keep minified names to preserve linkage)
// ---------------------------------------------------------------------------

// it   – getFeatureValue (feature-flag lookup, may be cached/stale)
// jn   – lazy init thunk for the GrowthBook / feature-flags subsystem
// t_   – builds a `claude <subcommand> "<arg>"` CLI command string
// b    – lazy module initializer factory

declare function it<T>(key: string, defaultValue: T): T;
declare function jn(): void;
declare function t_(subcommand: string, arg: string): string | null;
declare function b(init: () => void): () => void;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Normalise a hostname: lowercase and strip any trailing dot.
 */
function Lsa(hostname: string): string {
  return hostname.toLowerCase().replace(/\.$/, "");
}

/**
 * Build the set of hostnames that do not support local OAuth.
 *
 * The list is seeded from `Osa` (the default blocked hosts) and can be
 * overridden at runtime via the `tengu_mcp_local_oauth_blocked_hosts` feature
 * flag (object with a `hosts` string-array property).
 */
function eKd(): Set<string> {
  let featureValue = it("tengu_mcp_local_oauth_blocked_hosts", {
      hosts: Osa,
    }),
    activeHosts: string[] = Osa;
  if (
    featureValue !== null &&
    typeof featureValue === "object" &&
    "hosts" in featureValue &&
    Array.isArray((featureValue as { hosts: unknown }).hosts)
  ) {
    let validHosts = (featureValue as { hosts: unknown[] }).hosts.filter(
      (entry): entry is string => typeof entry === "string"
    );
    if (validHosts.length > 0) activeHosts = validHosts;
  }
  return new Set(activeHosts.map(Lsa));
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Returns `true` when the supplied URL belongs to an Anthropic-hosted MCP
 * server that does not support local OAuth.
 *
 * @param url - Absolute URL string of the MCP server (e.g. `https://…`).
 */
function Msa(url: string | null | undefined): boolean {
  if (!url) return !1;
  try {
    let hostname = Lsa(new URL(url).hostname);
    return eKd().has(hostname);
  } catch {
    return !1;
  }
}

/**
 * Returns a human-readable error message explaining that `serverName` is an
 * Anthropic-hosted MCP server that must be connected via claude.ai.
 *
 * When `options.scope` is a known settings scope, a removal command is appended
 * to the message.
 *
 * @param serverName - The MCP server name or identifier.
 * @param options    - Optional context (e.g. the config scope).
 */
function Nsa(
  serverName: string,
  options: { scope?: "local" | "project" | "user" | string } = {}
): string {
  let baseMessage =
      `"${serverName}" is Anthropic-hosted and doesn't support local OAuth. ` +
      "Connect it via Settings → Connectors on claude.ai (requires " +
      "`claude login`), then it'll be available here automatically.",
    removeCommand =
      options.scope === "local" ||
      options.scope === "project" ||
      options.scope === "user"
        ? t_("mcp remove", serverName)
        : null;
  return removeCommand
    ? `${baseMessage} Remove the stale entry with: \`${removeCommand}\``
    : baseMessage;
}

// ---------------------------------------------------------------------------
// Module-level state (lazy-initialized via Fsa)
// ---------------------------------------------------------------------------

/** Default list of Anthropic-hosted MCP server hostnames. */
var Osa: string[];

/** Lazy initializer for this module's constants. */
var Fsa = b(() => {
  jn();
  Osa = [
    "microsoft365.mcp.claude.com",
    "gmail.mcp.claude.com",
    "gcal.mcp.claude.com",
  ];
});

export {Lsa,eKd,Msa,Nsa,Osa,Fsa};
