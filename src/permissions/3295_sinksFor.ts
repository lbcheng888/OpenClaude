// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {_i as R7,rdn as SK6,hp as c3} from "../session/1460_promise.ts";
import {YM as xy,Dd as X3} from "../../vendor/m687.ts";
import {st as q_} from "../../vendor/m5.ts";
import {yH as SR,lt as w_} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {sn as A6} from "../config/0047_namespace.ts";
// Permissions subsystem — post-turn classifier "surfaces" and "sinks".
//
// This module decides, for the current runtime environment, which UI/transport
// "surfaces" are active (e.g. background daemon, watched session, remote/CCR,
// bridge, desktop, CLI) and which classifier "sinks" each surface feeds
// ("state" updates vs. human-readable "summary"). It also picks the classifier
// engine ("llm" vs "heuristic") and converts a classifier result into the
// post-turn summary payload that gets broadcast to the session/metadata layer.
//
// Behavior preserved verbatim from the obfuscated 2.1.177 build; only symbol
// names, TypeScript types, and comments were added.

// ── Cross-module helpers (defined elsewhere, bound via the lazy module init below) ──
// R7()       : is this a background ("bg") session?
// SK6()      : is this a "watched" session (recent heartbeat from another process)?
// xy(gate)   : feature-gate / capability check (e.g. "fanout")
// q_(value)  : parse an env-style value as truthy
// SR()       : is this running inside the bridge host?
// Y_(key, d) : read a config / Statsig flag with a default
// N(msg)     : diagnostic logger
// L(fn)      : lazy module-initializer (runs `fn` once on first access)
// j_(obj,..) : CommonJS export binder
declare function R7(): boolean;
declare function SK6(): boolean;
declare function xy(gate: string): boolean;
declare function q_(value: string | undefined): boolean;
declare function SR(): boolean;
declare function Y_<T>(key: string, defaultValue: T): T;
declare function N(message: string): void;
declare function L(init: () => void): unknown;
declare function j_(target: object, bindings: Record<string, () => unknown>): void;

// Imported initializers run by the lazy module init below.
declare function w_(): void;
declare function X3(): void;
declare function o6(): void;
declare function c3(): void;
declare function FH(): void;
declare function A6(): void;

/** A runtime UI/transport surface the post-turn classifier may emit to. */
type ClassifierSurface = "bg" | "watched" | "ccr" | "bridge" | "desktop" | "cli";

/** A classifier output channel: low-level state updates or a human-readable summary. */
type ClassifierSink = "state" | "summary";

/** Which classifier engine produces the summary. */
type ClassifierEngine = "llm" | "heuristic";

/** The post-turn summary payload broadcast to the session/metadata layer. */
interface PostTurnSummary {
  status_category: "blocked" | "review_ready";
  status_detail: string;
  needs_action: string;
}

/** A classifier result, as produced by the classifier engine. */
interface ClassifiedResult {
  state: string;
  detail: string;
  needs?: string;
}

/** Describes a pending permission/dialog request that blocked the turn. */
interface BlockedRequest {
  tool_name: string;
  action_description: string;
}

/** Receiver of session-metadata changes (e.g. session state). */
interface MetadataSink {
  notifyMetadataChanged(metadata: { post_turn_summary: PostTurnSummary }): void;
}

var ql8 = {};
j_(ql8, {
  sinksFor: () => sinksFor,
  runClassifierSummaryForBlocked: () => runClassifierSummaryForBlocked,
  isPostTurnSummaryVisibleInCli: () => isPostTurnSummaryVisibleInCli,
  engineFor: () => engineFor,
  detectSurfaces: () => detectSurfaces,
  classifiedToPostTurnSummary: () => classifiedToPostTurnSummary
});

/**
 * Detect the set of active classifier surfaces for the current process.
 *
 * A background session is exclusively "bg". Otherwise surfaces are accumulated
 * from session kind (watched), remote/BYOC/fanout environment (ccr), bridge,
 * the claude-desktop entrypoint, and CLI visibility.
 */
function detectSurfaces(): Set<ClassifierSurface> {
  if (R7()) return new Set<ClassifierSurface>(["bg"]);
  let surfaces = new Set<ClassifierSurface>();
  if (SK6()) surfaces.add("watched");
  if (xy("fanout")) surfaces.add("ccr");else if (process.env.CLAUDE_CODE_ENVIRONMENT_KIND === "byoc") surfaces.add("ccr");else if (q_(process.env.CLAUDE_CODE_REMOTE)) {
    if (remoteEntrypoints.has(process.env.CLAUDE_CODE_ENTRYPOINT ?? "") && !process.env.BUGHUNTER_FLEET_SIZE) surfaces.add("ccr");
  }
  if (process.env.CLAUDE_CODE_ENVIRONMENT_KIND === "bridge" || SR()) surfaces.add("bridge");
  if (process.env.CLAUDE_CODE_ENTRYPOINT === "claude-desktop") surfaces.add("desktop");
  if (isPostTurnSummaryVisibleInCli()) surfaces.add("cli");
  return surfaces;
}

/**
 * Map a set of active surfaces to the set of classifier sinks to emit to,
 * honoring the `tengu_classifier_disabled_surfaces` config and the
 * `tengu_classifier_summary_kill` switch. Background sessions never get a
 * "summary" sink.
 */
function sinksFor(surfaces: Set<ClassifierSurface>): Set<ClassifierSink> {
  let sinks = new Set<ClassifierSink>(),
    disabledSurfaces = parseDisabledSurfaces(Y_("tengu_classifier_disabled_surfaces", ""));
  for (let surface of surfaces) {
    if (disabledSurfaces.has(surface)) continue;
    for (let sink of surfaceSinks[surface]) sinks.add(sink);
  }
  if (surfaces.has("bg")) sinks.delete("summary");
  if (Y_("tengu_classifier_summary_kill", !1)) sinks.delete("summary");
  return sinks;
}

/**
 * Parse the comma-separated `tengu_classifier_disabled_surfaces` config value
 * into a set of known surfaces. Unknown surface names are ignored (warned once).
 */
function parseDisabledSurfaces(raw: string): Set<ClassifierSurface> {
  let result = new Set<ClassifierSurface>();
  for (let entry of raw.split(",")) {
    let surface = entry.trim();
    if (!surface) continue;
    if (surface in surfaceSinks) result.add(surface as ClassifierSurface);else if (!unknownSurfaceWarned) unknownSurfaceWarned = !0, N(`[classifier] tengu_classifier_disabled_surfaces: unknown surface '${surface}' ignored`);
  }
  return result;
}

/**
 * Choose the classifier engine for the given sinks, or `null` if no engine
 * should run. The "state" sink forces "llm"; otherwise the
 * `CLAUDE_CODE_CLASSIFIER_SUMMARY` env override or config flags decide.
 * The `tengu_cobalt_wren` flag downgrades "llm" to "heuristic".
 */
function engineFor(sinks: Set<ClassifierSink>): ClassifierEngine | null {
  if (sinks.size === 0) return null;
  let engine: ClassifierEngine | null = sinks.has("state") ? "llm" : process.env.CLAUDE_CODE_CLASSIFIER_SUMMARY !== void 0 ? q_(process.env.CLAUDE_CODE_CLASSIFIER_SUMMARY) ? "llm" : "heuristic" : engineFromConfig();
  return engine === "llm" && Y_("tengu_cobalt_wren", !1) ? "heuristic" : engine;
}

/**
 * Resolve the default classifier engine from config flags
 * (`tengu_classifier_summary_llm_emit` / `tengu_classifier_summary_heuristic_emit`),
 * or `null` if neither is enabled.
 */
function engineFromConfig(): ClassifierEngine | null {
  if (Y_("tengu_classifier_summary_llm_emit", !1)) return "llm";
  if (Y_("tengu_classifier_summary_heuristic_emit", !1)) return "heuristic";
  return null;
}

/** Whether the post-turn summary is shown in the CLI surface. Always false. */
function isPostTurnSummaryVisibleInCli(): boolean {
  return !1;
}

/** Convert a classifier result into a post-turn summary payload. */
function classifiedToPostTurnSummary(classified: ClassifiedResult): PostTurnSummary {
  return {
    status_category: classified.state === "blocked" ? "blocked" : "review_ready",
    status_detail: classified.detail,
    needs_action: classified.state === "blocked" ? classified.needs ?? "" : ""
  };
}

/**
 * When a turn is blocked on a permission/dialog request, synthesize and emit a
 * "blocked" post-turn summary to the metadata sink — but only if the current
 * surfaces feed a "summary" sink with an active engine.
 */
function runClassifierSummaryForBlocked(request: BlockedRequest, metadataSink: MetadataSink | null | undefined): void {
  let sinks = sinksFor(detectSurfaces());
  if (!sinks.has("summary") || engineFor(sinks) === null) return;
  let summary: PostTurnSummary = request.tool_name.startsWith("dialog:") ? {
    status_category: "blocked",
    status_detail: "Waiting on a user dialog",
    needs_action: request.action_description
  } : {
    status_category: "blocked",
    status_detail: `Waiting on permission: ${request.tool_name}`,
    needs_action: `Approve or deny ${request.tool_name}`
  };
  metadataSink?.notifyMetadataChanged({
    post_turn_summary: summary
  });
}

/** Entrypoints that count as remote/CCR when CLAUDE_CODE_REMOTE is set. */
var remoteEntrypoints: Set<string>,
  /** Per-surface mapping of which classifier sinks each surface feeds. */
  surfaceSinks: Record<ClassifierSurface, ClassifierSink[]>,
  /** Guards the one-time unknown-surface warning in parseDisabledSurfaces. */
  unknownSurfaceWarned = !1;
var C06 = L(() => {
  w_();
  X3();
  o6();
  c3();
  FH();
  A6();
  remoteEntrypoints = new Set(["remote", "remote_cowork", "remote_desktop", "remote_mobile"]);
  surfaceSinks = {
    bg: ["state"],
    watched: ["state"],
    ccr: ["summary"],
    bridge: ["summary"],
    desktop: ["summary"],
    cli: ["summary"]
  };
});

export {ql8 as QYr,detectSurfaces,sinksFor,parseDisabledSurfaces as b8d,engineFor,engineFromConfig as E8d,isPostTurnSummaryVisibleInCli,classifiedToPostTurnSummary,runClassifierSummaryForBlocked,remoteEntrypoints as S8d,surfaceSinks as daa,unknownSurfaceWarned as uaa,C06 as _0n};
