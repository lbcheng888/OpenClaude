// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * Anthropic-hosted MCP server blocklist for local OAuth.
 *
 * Exposes helpers to detect whether a given MCP server URL/name resolves to an
 * Anthropic-hosted endpoint that must be connected through claude.ai instead of
 * local OAuth, and to build the human-readable error message for that case.
 */

// ---------------------------------------------------------------------------
// Cross-module imports (keep minified names to preserve linkage)
// ---------------------------------------------------------------------------

// Y_  – getFeatureValue (feature-flag lookup, e.g. getFeatureValue_CACHED_MAY_BE_STALE)
// L   – lazy module initializer factory
// o6  – lazy init thunk for the GrowthBook / feature-flags subsystem

declare function Y_<T>(key: string, defaultValue: T): T;
declare function L(init: () => void): () => void;
declare function o6(): void;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Normalise a hostname: lowercase and strip any trailing dot.
 */
function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/\.$/, "");
}

/**
 * Build the set of hostnames that do not support local OAuth.
 *
 * The list is seeded from `DEFAULT_BLOCKED_HOSTS` and can be overridden at
 * runtime via the `tengu_mcp_local_oauth_blocked_hosts` feature flag (object
 * with a `hosts` string-array property).
 */
function dW3(): Set<string> {
  let featureValue = Y_("tengu_mcp_local_oauth_blocked_hosts", {
    hosts: DEFAULT_BLOCKED_HOSTS,
  });
  let activeHosts: string[] = DEFAULT_BLOCKED_HOSTS;

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

  return new Set(activeHosts.map(normalizeHostname));
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
function N7H(url: string | null | undefined): boolean {
  if (!url) return !1;
  try {
    let hostname = normalizeHostname(new URL(url).hostname);
    return dW3().has(hostname);
  } catch {
    return !1;
  }
}

/** Options for {@link V7H}. */
interface LocalOAuthUnsupportedOptions {
  /** The settings scope from which the stale entry was loaded. */
  scope?: "local" | "project" | "user" | string;
}

/**
 * Returns a human-readable error message explaining that `serverName` is an
 * Anthropic-hosted MCP server that must be connected via claude.ai.
 *
 * When `options.scope` is a known settings scope AND `serverName` looks like a
 * valid MCP server identifier, a removal command is appended to the message.
 *
 * @param serverName - The MCP server name or identifier.
 * @param options    - Optional context (e.g. the config scope).
 */
function V7H(serverName: string, options: LocalOAuthUnsupportedOptions = {}): string {
  let baseMessage =
    `"${serverName}" is Anthropic-hosted and doesn't support local OAuth. ` +
    "Connect it via Settings → Connectors on claude.ai (requires " +
    "`claude login`), then it'll be available here automatically.";

  if (
    (options.scope === "local" ||
      options.scope === "project" ||
      options.scope === "user") &&
    /^[\w.-]+$/.test(serverName)
  ) {
    return `${baseMessage} Remove the stale entry with: \`claude mcp remove "${serverName}"\``;
  }

  return baseMessage;
}

// ---------------------------------------------------------------------------
// Module-level state (lazy-initialized via UH_)
// ---------------------------------------------------------------------------

/** Default list of Anthropic-hosted MCP server hostnames. */
var DEFAULT_BLOCKED_HOSTS: string[];

/** Lazy initializer for this module's constants. */
var UH_ = L(() => {
  o6();
  DEFAULT_BLOCKED_HOSTS = [
    "microsoft365.mcp.claude.com",
    "gmail.mcp.claude.com",
    "gcal.mcp.claude.com",
  ];
});

export {normalizeHostname as ZGi,dW3 as $Md,N7H as Rae,V7H as xae,DEFAULT_BLOCKED_HOSTS as QGi,UH_ as Gnt};
