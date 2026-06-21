// @ts-nocheck
import {getMemoryToggledOff as rb,getMainLoopModelOverride as kj,getInitialMainLoopModel as lU,getIsNonInteractiveSession as u8,getProjectRoot as I1,lt as w_} from "../session/0131_sent.ts";
import {Bl as C4,tr as Y8,sn as A6} from "./0047_namespace.ts";
import {st as q_,_l as P4} from "../../vendor/m5.ts";
import {je as oH} from "../../vendor/m577.ts";
import {getInitialSettings as n8,getSettingsForSource as C6,yr as N8} from "./0740_updateSettingsForSource.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {B_n as Q47,mve as TXH,F_n as q$6} from "../../vendor/m2198.ts";
import {isProjectScopeTrustAccepted as zXH,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {findCanonicalGitRoot as h$,Ba as gK} from "../../vendor/m693.ts";
import {b as L} from "../../runtime.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
import {Lr as _q} from "../../vendor/m578.ts";
import {Iu as W5} from "../../vendor/m643.ts";
import {cQe as PaH} from "../../vendor/m2199.ts";
import {BS as gf} from "../../vendor/m642.ts";
/** Memory directory helpers — auto-memory enabled check, path resolution, and subdir layout. */

/**
 * Returns true if the auto-memory feature is enabled for the current session.
 * Checks safe-mode, feature gates, env vars, and the user's settings in order.
 */
function R5(): boolean {
  if (rb()) return !1;
  if (C4()) return !1;
  let envDisable: string | undefined = process.env.CLAUDE_CODE_DISABLE_AUTO_MEMORY;
  if (q_(envDisable)) return !1;
  if (P4(envDisable)) return !0;
  if (oH.CLAUDE_CODE_SIMPLE) return !1;
  if (q_(process.env.CLAUDE_CODE_REMOTE) && !process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR && !oH.CLAUDE_COWORK_MEMORY_PATH_OVERRIDE) return !1;
  if (isAutoMemoryDisabledByGate()) return !1;
  let settings = n8();
  if (settings.autoMemoryEnabled !== void 0) return settings.autoMemoryEnabled;
  return !0;
}

/** Checks whether the auto-memory feature is disabled by a feature-gate + model allowlist. */
function isAutoMemoryDisabledByGate(): boolean {
  let allowlist: string[] | null = Y_("tengu_sepia_cormorant", null);
  if (!Array.isArray(allowlist) || allowlist.length === 0) return !1;
  let modelOverride: string | undefined = kj(),
    currentModel: string | undefined = modelOverride !== void 0 ? modelOverride : lU();
  if (typeof currentModel !== "string" || !Q47(currentModel, allowlist)) return !1;
  return Y_("tengu_umber_petrel", !1);
}

/** Returns true if remote-team memory is enabled (passport_quail gate + optional slate_thimble override). */
function T$6(): boolean { // FIXME: unverified name — likely isRemoteTeamMemoryEnabled
  if (!Y_("tengu_passport_quail", !1)) return !1;
  return !u8() || Y_("tengu_slate_thimble", !1);
}

/** Returns the base directory for memory storage: CLAUDE_CODE_REMOTE_MEMORY_DIR or the config home dir. */
function mn(): string {
  if (process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR) return process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR;
  return Y8();
}

/** Returns the memory subdirectory name: "tiny_memory" in tiny-memory mode, otherwise "memory". */
function getMemorySubdirName(): string {
  return cD() ? Cg5 : Sg5;
}

/** Returns true if the billiard_aviary gate enables tiny-memory mode. */
function cD(): boolean {
  return Y_("tengu_billiard_aviary", !1);
}

/**
 * Validates and normalises a raw path string to a canonical absolute directory path
 * (trailing separator, NFC-normalised). Returns undefined if the path is unsafe or invalid.
 * @param rawPath - Raw path string (may start with "~/").
 * @param expandHomeTilde - When true, expand a leading "~/" using os.homedir().
 */
function r47(rawPath: string | undefined, expandTilde: boolean): string | undefined {
  if (!rawPath) return;
  let resolved: string = rawPath;
  if (expandTilde && (resolved.startsWith("~/") || resolved.startsWith("~\\"))) {
    let relative: string = resolved.slice(2),
      normalized: string = oS.normalize(relative || ".");
    if (normalized === "." || normalized === ".." || normalized.startsWith(`..${oS.sep}`) || normalized.startsWith("../") || normalized.startsWith("..\\")) return;
    resolved = oS.join(i47.homedir(), relative);
  }
  let canonical: string = oS.normalize(resolved).replace(/[/\\]+$/, "");
  if (!oS.isAbsolute(canonical) || canonical.length < 3 || /^[A-Za-z]:$/.test(canonical) || canonical.startsWith("\\\\") || canonical.startsWith("//") || canonical.includes("\x00")) return;
  return (canonical + oS.sep).normalize("NFC");
}

/** Returns the resolved CLAUDE_COWORK_MEMORY_PATH_OVERRIDE env var, or undefined if absent/invalid. */
function getCoworkMemoryPathOverride(): string | undefined {
  return r47(process.env.CLAUDE_COWORK_MEMORY_PATH_OVERRIDE, !1);
}

/**
 * Reads the auto-memory directory from the settings hierarchy (policy → flag → local/project → user).
 * Returns the resolved path, or undefined if not configured.
 */
function getConfiguredAutoMemoryDirectory(): string | undefined {
  let localSettingsEnabled: boolean = zXH(),
    rawDir: string | undefined =
      C6("policySettings")?.autoMemoryDirectory ??
      C6("flagSettings")?.autoMemoryDirectory ??
      (localSettingsEnabled ? C6("localSettings")?.autoMemoryDirectory ?? C6("projectSettings")?.autoMemoryDirectory : void 0) ??
      C6("userSettings")?.autoMemoryDirectory;
  return r47(rawDir, !0);
}

/** Returns true if CLAUDE_COWORK_MEMORY_PATH_OVERRIDE is set and valid. */
function hasCoworkMemoryPathOverride(): boolean {
  return getCoworkMemoryPathOverride() !== void 0;
}

/**
 * Returns the effective cwd for memory path computation:
 * the git main-worktree root when available, otherwise the raw cwd.
 */
function getEffectiveCwd(): string {
  return h$(I1()) ?? I1();
}

/** Returns the full path to the MEMORY.md index file inside the auto-memory directory. */
function EEH(): string {
  return oS.join(jz(), Ig5);
}

/** Returns true if `filePath` falls anywhere inside the auto-memory directory tree. */
function pn(filePath: string): boolean {
  return oS.normalize(filePath).startsWith(jz());
}

/**
 * Returns true if `filePath` is inside the auto-memory directory and not escaping
 * via a symlink (per TXH check).
 */
function R0_(filePath: string): boolean {
  let normalizedPath: string = oS.normalize(filePath),
    memDir: string = jz();
  if (!normalizedPath.startsWith(memDir)) return !1;
  return !TXH(normalizedPath, memDir);
}

// ─── Module-level vars ────────────────────────────────────────────────────────

var i47: typeof import("os"),
  oS: typeof import("path"),
  /** "memory" — default memory subdirectory name. */
  Sg5 = "memory",
  /** "tiny_memory" — subdirectory name when tiny-memory mode is active. */
  Cg5 = "tiny_memory",
  /** "MEMORY.md" — filename of the memory index file. */
  Ig5 = "MEMORY.md",
  /** Memoised getter: resolves the auto-memory working directory for the current session. */
  jz: () => string;

var Bz = L(() => {
  c7();
  w_();
  o6();
  T8();
  _q();
  A6();
  gK();
  W5();
  q$6();
  N8();
  PaH();
  i47 = require("os"), oS = require("path");
  jz = V6(() => {
    let overridePath: string | undefined = getCoworkMemoryPathOverride() ?? getConfiguredAutoMemoryDirectory();
    if (overridePath) return overridePath;
    let projectsBase: string = oS.join(mn(), "projects");
    return (oS.join(projectsBase, gf(getEffectiveCwd()), getMemorySubdirName()) + oS.sep).normalize("NFC");
  }, () => `${I1()}|${cD()}|${zXH()}`);
});

export {R5 as xu,isAutoMemoryDisabledByGate as $_n,T$6 as q_n,mn as Kse,getMemorySubdirName as cXu,cD as lE,r47 as Wfi,getCoworkMemoryPathOverride as Gfi,getConfiguredAutoMemoryDirectory as dXu,hasCoworkMemoryPathOverride as j_n,getEffectiveCwd as pXu,EEH as TFe,pn as vK,R0_ as IHt,i47 as jfi,oS as sF,Sg5 as aXu,Cg5 as lXu,Ig5 as uXu,jz as gf,Bz as tA};
