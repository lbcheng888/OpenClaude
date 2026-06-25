// @ts-nocheck
import {getIsNonInteractiveSession as kr,lt} from "./0132_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
/**
 * Auto-compaction feature gating and reactive-compact summary-kind helpers.
 *
 * This module exposes small predicate helpers that decide whether various
 * auto-compaction / reactive-compaction behaviors are enabled, plus a guard
 * over the set of known reactive-compaction summary kinds.
 */

/**
 * Whether the "amber redwood" reactive-compaction experiment is active.
 *
 * Disabled outright when running in restricted mode (`kr()`); otherwise gated
 * on the `tengu_amber_redwood3` feature flag being non-empty.
 */
function D4(): boolean {
  if (kr()) return !1;
  return !!it("tengu_amber_redwood3", "");
}

/**
 * Whether automatic conversation compaction is enabled.
 *
 * Honors the global `DISABLE_COMPACT` config and the `DISABLE_AUTO_COMPACT`
 * environment override before falling back to the persisted
 * `autoCompactEnabled` setting (defaulting to on).
 */
function ev(): boolean {
  if (Ne.DISABLE_COMPACT) return !1;
  if (nt(process.env.DISABLE_AUTO_COMPACT)) return !1;
  return lc("autoCompactEnabled", !0).value;
}

/**
 * Whether reactive compaction is permitted in the current environment.
 *
 * In remote (`CLAUDE_CODE_REMOTE`) sessions it is additionally gated on the
 * `tengu_reactive_compact_remote` flag, whose value is cached in `G4i`.
 */
function Qz(): boolean {
  if (nt(process.env.CLAUDE_CODE_REMOTE)) {
    if (G4i ??= it("tengu_reactive_compact_remote", !1), !G4i) return !1;
  }
  return !0;
}

/**
 * Type guard: whether `summaryKind` is a recognized reactive-compaction
 * summary kind. Returns false for `undefined`.
 */
function Hke(summaryKind: string | undefined): boolean {
  return summaryKind !== void 0 && iMd.has(summaryKind);
}

/** Cached value of the `tengu_reactive_compact_remote` flag (lazy-initialized). */
var G4i: boolean | undefined;
/** Set of known reactive-compaction summary kinds. */
var iMd: Set<string>;

var V4i = b(() => {
  lt();
  Ir();
  dn();
  mg();
  jn();
  iMd = new Set(["prompt_suggestion", "away_summary", "agent_summary", "memdir_aki_extract"]);
});

export {D4,ev,Qz,Hke,G4i,iMd,V4i};
