// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
/**
 * Channel permission response-callback registry and related utilities.
 *
 * Provides:
 *  - `isHarborPermissionsEnabled`  — feature-flag read for "tengu_harbor_permissions"
 *  - `hashWordSafe`                — FNV-1a 32-bit hash → 5-char alphanumeric word (profanity-filtered)
 *  - `hashWord`                    — wrapper that retries with salt until the output is clean
 *  - `serializeShort`              — JSON-stringify with 200-char truncation guard
 *  - `filterConnectedWithChannel`  — filter MCP client list to those with claude/channel capabilities
 *  - `createChannelPermissionCallbacks` — per-request response-callback store (onResponse / resolve)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of a single MCP client entry as seen in the filter predicate. */
interface McpClientEntry {
  type: string;
  name: string;
  capabilities?: {
    experimental?: {
      "claude/channel"?: unknown;
      "claude/channel/permission"?: unknown;
    };
  };
}

/** Resolved permission behavior value passed back from the server. */
type ChannelPermissionBehavior = string; // FIXME: unverified — exact string union not yet recovered

/** Payload delivered to a registered `onResponse` handler. */
interface ChannelPermissionResolution {
  behavior: ChannelPermissionBehavior;
  fromServer: string;
}

/** Callback signature registered via `createChannelPermissionCallbacks().onResponse`. */
type ChannelPermissionCallback = (resolution: ChannelPermissionResolution) => void;

/** Object returned by `createChannelPermissionCallbacks`. */
interface ChannelPermissionCallbacks {
  /**
   * Register a callback for `requestId`. Returns a cleanup function that
   * unregisters the callback.
   */
  onResponse(requestId: string, callback: ChannelPermissionCallback): () => void;

  /**
   * Deliver a resolution for `requestId`. Returns `true` if a pending
   * registration was found and invoked, `false` otherwise.
   */
  resolve(requestId: string, behavior: ChannelPermissionBehavior, fromServer: string): boolean;
}

// ---------------------------------------------------------------------------
// Feature flag
// ---------------------------------------------------------------------------

/** Returns whether the `tengu_harbor_permissions` feature flag is enabled. */
function isHarborPermissionsEnabled(): boolean {
  return Y_("tengu_harbor_permissions", !1);
}

// ---------------------------------------------------------------------------
// Hash / word utilities
// ---------------------------------------------------------------------------

/**
 * FNV-1a 32-bit hash of `input`, encoded as a 5-character lowercase word
 * drawn from the `SAFE_ALPHABET` (25 chars, no 'l' to avoid confusion).
 */
function hashWordRaw(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) hash ^= input.charCodeAt(i), hash = Math.imul(hash, 16777619);
  hash = hash >>> 0;
  let word = "";
  for (let i = 0; i < 5; i++) word += SAFE_ALPHABET[hash % 25], hash = Math.floor(hash / 25);
  return word;
}

/**
 * Produces a 5-char word via `hashWordRaw`, retrying up to 10 times with a
 * `:N` salt suffix until the result contains no `BLOCKED_WORDS` substrings.
 */
function hashWord(input: string): string {
  let word = hashWordRaw(input);
  for (let attempt = 0; attempt < 10; attempt++) {
    if (!BLOCKED_WORDS.some((blocked: string) => word.includes(blocked))) return word;
    word = hashWordRaw(`${input}:${attempt}`);
  }
  return word;
}

// ---------------------------------------------------------------------------
// Serialization helper
// ---------------------------------------------------------------------------

/**
 * JSON-serialize `value` and truncate the result to 200 characters (appending
 * the ellipsis `…`). Returns `"(unserializable)"` if `JSON.stringify` throws.
 */
function serializeShort(value: unknown): string {
  try {
    let serialized = bH(value);
    return serialized.length > 200 ? serialized.slice(0, 200) + "…" : serialized;
  } catch {
    return "(unserializable)";
  }
}

// ---------------------------------------------------------------------------
// MCP client filter
// ---------------------------------------------------------------------------

/**
 * From `clients`, return only those entries that are `"connected"`, pass
 * the `nameFilter` predicate, and advertise both
 * `claude/channel` and `claude/channel/permission` experimental capabilities.
 */
function filterConnectedWithChannel(clients: McpClientEntry[], nameFilter: (name: string) => boolean): McpClientEntry[] {
  return clients.filter((client: McpClientEntry) => client.type === "connected" && nameFilter(client.name) && client.capabilities?.experimental?.["claude/channel"] !== void 0 && client.capabilities?.experimental?.["claude/channel/permission"] !== void 0);
}

// ---------------------------------------------------------------------------
// Response-callback registry
// ---------------------------------------------------------------------------

/**
 * Creates an in-memory registry that maps lowercase request IDs to pending
 * permission-response callbacks.
 *
 * - `onResponse(id, cb)` — register `cb` for `id`; returns an unregister fn.
 * - `resolve(id, behavior, fromServer)` — deliver resolution; returns `true`
 *   if a pending entry was found and consumed.
 */
function createChannelPermissionCallbacks(): ChannelPermissionCallbacks {
  let pendingCallbacks = new Map<string, ChannelPermissionCallback>();
  return {
    onResponse(requestId: string, callback: ChannelPermissionCallback): () => void {
      let key = requestId.toLowerCase();
      return pendingCallbacks.set(key, callback), () => {
        pendingCallbacks.delete(key);
      };
    },
    resolve(requestId: string, behavior: ChannelPermissionBehavior, fromServer: string): boolean {
      let key = requestId.toLowerCase(),
        callback = pendingCallbacks.get(key);
      if (!callback) return !1;
      return pendingCallbacks.delete(key), callback({
        behavior: behavior,
        fromServer: fromServer
      }), !0;
    }
  };
}

// ---------------------------------------------------------------------------
// Module-level constants (populated by lazy init)
// ---------------------------------------------------------------------------

/** 25-char alphabet used for word hashing (no 'l'). */
var SAFE_ALPHABET = "abcdefghijkmnopqrstuvwxyz",
  BLOCKED_WORDS: string[];

/** Lazy initializer — populates `BLOCKED_WORDS` and registers dependencies. */
var x8q = L(() => {
  H6();
  o6();
  BLOCKED_WORDS = ["fuck", "shit", "cunt", "cock", "dick", "twat", "piss", "crap", "bitch", "whore", "ass", "tit", "cum", "fag", "dyke", "nig", "kike", "rape", "nazi", "damn", "poo", "pee", "wank", "anus"];
});
export {isHarborPermissionsEnabled as nKa,hashWordRaw as tKa,hashWord as rKa,serializeShort as oKa,filterConnectedWithChannel as sKa,createChannelPermissionCallbacks as iKa,SAFE_ALPHABET as iFp,BLOCKED_WORDS as aFp,x8q as qho};
