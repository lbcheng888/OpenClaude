// @ts-nocheck
import {getMemoryToggledOff as Kx,getMainLoopModelOverride as by,getInitialMainLoopModel as l5,getIsNonInteractiveSession as kr,getProjectRoot as ic,lt} from "../session/0132_sent.ts";
import {dl,or,dn} from "./0137_namespace.ts";
import {nt,Za} from "../../vendor/m127.ts";
import {Ne} from "../../vendor/m583.ts";
import {getInitialSettings as Fr,getSettingsForSource as An,br} from "./0745_updateSettingsForSource.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Tbn,_Ue,Sbn} from "../../vendor/m2204.ts";
import {isProjectScopeTrustAccepted as XRe,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {findCanonicalGitRoot as zm,ia} from "../../vendor/m698.ts";
import {b} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Wu} from "../../vendor/m438.ts";
import {Ir} from "../../vendor/m584.ts";
import {Tu} from "../../vendor/m649.ts";
import {cet} from "../../vendor/m2205.ts";
import {NS} from "../../vendor/m648.ts";
/**
 * Auto-memory configuration module.
 *
 * Decides whether Claude Code's automatic memory feature is enabled, and resolves
 * the on-disk directory where memory files (MEMORY.md) are stored. Resolution honors
 * a layered precedence of env-vars, policy/flag/local/project/user settings, and an
 * experiment-flag-controlled override, then memoizes the final path.
 */

/** Whether the auto-memory feature should be active for the current session. */
function Kc(): boolean {
  if (Kx()) return !1;
  if (dl()) return !1;
  let e: string | undefined = process.env.CLAUDE_CODE_DISABLE_AUTO_MEMORY;
  if (nt(e)) return !1;
  if (Za(e)) return !0;
  if (Ne.CLAUDE_CODE_SIMPLE) return !1;
  if (nt(process.env.CLAUDE_CODE_REMOTE) && !process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR && !Ne.CLAUDE_COWORK_MEMORY_PATH_OVERRIDE) return !1;
  if (Ebn()) return !1;
  let e2 = Fr();
  if (e2.autoMemoryEnabled !== void 0) return e2.autoMemoryEnabled;
  return !0;
}

/**
 * Experiment-gated disable: returns true when the current model/identity is in the
 * `tengu_sepia_cormorant` allowlist AND the `tengu_umber_petrel` flag is set.
 */
function Ebn(): boolean {
  let allowlist = it("tengu_sepia_cormorant", null);
  if (!Array.isArray(allowlist) || allowlist.length === 0) return !1;
  let modelOverride = by(),
    model = modelOverride !== void 0 ? modelOverride : l5();
  if (typeof model !== "string" || !Tbn(model, allowlist)) return !1;
  return it("tengu_umber_petrel", !1);
}

function Cbn(): boolean {
  if (!it("tengu_passport_quail", !1)) return !1;
  return !kr() || it("tengu_slate_thimble", !1);
}

/** Base directory for remote/projects memory storage. */
function zse(): string {
  if (process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR) return process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR;
  return or();
}

/** Leaf directory name for memory: tiny variant when the experiment flag is on. */
function xad(): string {
  return mE() ? Iad : Had;
}

/** Whether the tiny-memory experiment flag is enabled. */
function mE(): boolean {
  return it("tengu_billiard_aviary", !1);
}

/**
 * Validates and normalizes a candidate memory directory path.
 *
 * @param rawPath candidate path (may be undefined)
 * @param expandTilde when true, expand a leading `~/` or `~\` to the home directory
 * @returns the normalized absolute directory (with trailing separator, NFC) or undefined if invalid
 */
function BSi(rawPath: string | undefined, expandTilde: boolean): string | undefined {
  if (!rawPath) return;
  let path = rawPath;
  if (expandTilde && (path.startsWith("~/") || path.startsWith("~\\"))) {
    let relative = path.slice(2),
      normalizedRelative = kF.normalize(relative || ".");
    if (normalizedRelative === "." || normalizedRelative === ".." || normalizedRelative.startsWith(`..${kF.sep}`) || normalizedRelative.startsWith("../") || normalizedRelative.startsWith("..\\")) return;
    path = kF.join(FSi.homedir(), relative);
  }
  let resolved = kF.normalize(path).replace(/[/\\]+$/, "");
  if (!kF.isAbsolute(resolved) || resolved.length < 3 || /^[A-Za-z]:$/.test(resolved) || resolved.startsWith("\\\\") || resolved.startsWith("//") || resolved.includes("\x00")) return;
  return (resolved + kF.sep).normalize("NFC");
}

/** Memory directory from the CLAUDE_COWORK_MEMORY_PATH_OVERRIDE env-var, if valid. */
function USi(): string | undefined {
  return BSi(process.env.CLAUDE_COWORK_MEMORY_PATH_OVERRIDE, !1);
}

/** Memory directory from the layered settings (policy > flag > local/project > user). */
function Pad(): string | undefined {
  let useLocal = XRe(),
    autoMemoryDirectory = An("policySettings")?.autoMemoryDirectory ?? An("flagSettings")?.autoMemoryDirectory ?? (useLocal ? An("localSettings")?.autoMemoryDirectory ?? An("projectSettings")?.autoMemoryDirectory : void 0) ?? An("userSettings")?.autoMemoryDirectory;
  return BSi(autoMemoryDirectory, !0);
}

/** Whether a cowork memory path override env-var is set and valid. */
function Abn(): boolean {
  return USi() !== void 0;
}

function Oad(): string {
  return zm(ic()) ?? ic();
}

/** Absolute path to the project's MEMORY.md file. */
function Ufe(): string {
  return kF.join(xm(), Dad);
}

/** Whether the given path lives under the resolved memory directory. */
function Y7(e: string): boolean {
  return kF.normalize(e).startsWith(xm());
}

/** Whether the given path is strictly inside (a sub-path of) the memory directory. */
function oDt(e: string): boolean {
  let normalized = kF.normalize(e),
    memoryDir = xm();
  if (!normalized.startsWith(memoryDir)) return !1;
  return !_Ue(normalized, memoryDir);
}

var FSi: typeof import("os"),
  kF: typeof import("path"),
  Had = "memory",
  Iad = "tiny_memory",
  Dad = "MEMORY.md",
  xm: () => string;

var Jm = b(() => {
  Wi();
  lt();
  Wu();
  jn();
  tr();
  Ir();
  dn();
  ia();
  Tu();
  Sbn();
  br();
  cet();
  FSi = require("os"), kF = require("path");
  xm = Hn(() => {
    let dir = USi() ?? Pad();
    if (dir) return dir;
    let projectsRoot = kF.join(zse(), "projects");
    return (kF.join(projectsRoot, NS(Oad()), xad()) + kF.sep).normalize("NFC");
  }, () => `${ic()}|${mE()}|${XRe()}`);
});

export {Kc,Ebn,Cbn,zse,xad,mE,BSi,USi,Pad,Abn,Oad,Ufe,Y7,oDt,FSi,kF,Had,Iad,Dad,xm,Jm};
