// @ts-nocheck
import {Sje,bje} from "../../vendor/m644.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
import {XU,rI} from "./0586_rI.ts";
import {fD,y8} from "../telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {getInitialSettings as Fr,br} from "./0745_updateSettingsForSource.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getIsInteractive as ck,lt} from "../session/0132_sent.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "./0137_namespace.ts";
// @ts-nocheck

/** Mutable per-process TUI/fullscreen decision state (cached gate results + one-shot log flags). */
interface TuiState {
  loggedTmuxCcDisable: boolean;
  loggedWinSshDisable: boolean;
  checkedTmuxMouseHint: boolean;
  checkedTmuxFocusHint: boolean;
  tmuxControlModeProbed: boolean | undefined;
  gbGateCached: boolean | undefined;
  downsellGateCached: boolean | undefined;
}

/** Build a fresh TUI state object with all caches/flags cleared. */
function createTuiState(): TuiState {
  return {
    loggedTmuxCcDisable: !1,
    loggedWinSshDisable: !1,
    checkedTmuxMouseHint: !1,
    checkedTmuxFocusHint: !1,
    tmuxControlModeProbed: void 0,
    gbGateCached: void 0,
    downsellGateCached: void 0
  };
}

/** Heuristic: inside tmux under iTerm.app with a non screen/tmux TERM → likely iTerm2 tmux -CC integration. */
function detectIterm2TmuxControlMode(): boolean {
  if (!process.env.TMUX) return !1;
  if (process.env.TERM_PROGRAM !== "iTerm.app") return !1;
  let termEnv = process.env.TERM ?? "";
  return !termEnv.startsWith("screen") && !termEnv.startsWith("tmux");
}

/** Probe whether tmux is in control mode (-CC), caching the result on the state. */
function probeTmuxControlMode(state: TuiState): void {
  if (state.tmuxControlModeProbed = detectIterm2TmuxControlMode(), state.tmuxControlModeProbed) return;
  if (!process.env.TMUX) return;
  if (process.env.TERM_PROGRAM) return;
  let tmuxPath = Sje("tmux");
  if (tmuxPath === null) return;
  let spawnResult;
  try {
    spawnResult = qAi.spawnSync(tmuxPath, ["display-message", "-p", "#{client_control_mode}"], {
      encoding: "utf8",
      timeout: 2000,
      cwd: void 0,
      env: process.env
    });
  } catch {
    return;
  }
  if (spawnResult.status !== 0) return;
  state.tmuxControlModeProbed = spawnResult.stdout.trim() === "1";
}

/** Return cached tmux control-mode flag, probing lazily on first access. */
function isTmuxControlMode(state: TuiState = mZ): boolean {
  if (state.tmuxControlModeProbed === void 0) probeTmuxControlMode(state);
  return state.tmuxControlModeProbed ?? !1;
}

/** True on Windows reached over SSH (ConPTY re-rendering breaks fullscreen). */
function isWindowsOverSsh(): boolean {
  if (Yt() !== "windows") return !1;
  return Boolean(process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY);
}

/** True when alternate-screen/fullscreen is disabled via env (NO_FLICKER=0 or DISABLE_ALTERNATE_SCREEN). */
function isAlternateScreenDisabledByEnv(): boolean {
  return Ne.CLAUDE_CODE_NO_FLICKER === !1 || nt(process.env.CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN);
}

/** Decide whether the fullscreen TUI should be enabled given env, settings, and feature gates. */
function isFullscreenEnabled(state: TuiState = mZ): boolean {
  if (XU() === "local-agent") return !1;
  if (process.env.CLAUDE_CODE_SESSION_KIND === "bg") return !0;
  if (fD()) return !1;
  if (isAlternateScreenDisabledByEnv()) return !1;
  if (Ne.CLAUDE_CODE_NO_FLICKER === !0) return !0;
  if (isTmuxControlMode(state)) {
    if (!state.loggedTmuxCcDisable) state.loggedTmuxCcDisable = !0, A("fullscreen disabled: tmux -CC (iTerm2 integration mode) detected \xB7 set CLAUDE_CODE_NO_FLICKER=1 to override");
    return !1;
  }
  if (isWindowsOverSsh()) {
    if (!state.loggedWinSshDisable) state.loggedWinSshDisable = !0, A("fullscreen disabled: Windows over SSH (ConPTY re-rendering) detected \xB7 set CLAUDE_CODE_NO_FLICKER=1 to override");
    return !1;
  }
  switch (Fr().tui) {
    case "fullscreen":
      return !0;
    case "default":
      return !1;
  }
  if (checkDownsellGate(state)) return !0;
  return state.gbGateCached ??= it("tengu_pewter_brook", !1), state.gbGateCached;
}

/** Cached feature-gate check for the downsell experiment. */
function checkDownsellGate(state: TuiState = mZ): boolean {
  return state.downsellGateCached ??= it("tengu_amber_creek", !1), state.downsellGateCached;
}

/** Whether the alternate screen buffer should be used (lighter check than full fullscreen gate). */
function isAlternateScreenEnabled(state: TuiState = mZ): boolean {
  if (fD()) return !1;
  if (isAlternateScreenDisabledByEnv()) return !1;
  if (Ne.CLAUDE_CODE_NO_FLICKER === !0) return !0;
  if (isWindowsOverSsh()) return !1;
  if (isTmuxControlMode(state)) return !1;
  switch (Fr().tui) {
    case "fullscreen":
      return !0;
    case "default":
      return !1;
  }
  return !0;
}

/** Resolve the categorical reason explaining the current fullscreen decision (for telemetry). */
function getFullscreenDecisionReason(state: TuiState = mZ): string {
  if (process.env.CLAUDE_CODE_SESSION_KIND === "bg") return "bg_forced_on";
  if (fD()) return "sr_auto_off";
  if (isAlternateScreenDisabledByEnv()) return "env_off";
  if (Ne.CLAUDE_CODE_NO_FLICKER === !0) return "env_on";
  if (isTmuxControlMode(state)) return "tmux_cc_auto_off";
  if (isWindowsOverSsh()) return "win_ssh_auto_off";
  switch (Fr().tui) {
    case "fullscreen":
      return "settings_on";
    case "default":
      return "settings_off";
  }
  if (state.downsellGateCached ?? it("tengu_amber_creek", !1)) return "downsell_on";
  return state.gbGateCached ?? it("tengu_pewter_brook", !1) ? "gb_on" : "gb_off";
}

/** Map a decision reason to the resulting TUI mode ("fullscreen" | "default"). */
function decisionReasonToTuiMode(reason: string): string {
  switch (reason) {
    case "env_on":
    case "bg_forced_on":
    case "settings_on":
    case "ant_default":
    case "downsell_on":
    case "gb_on":
      return "fullscreen";
    case "env_off":
    case "sr_auto_off":
    case "tmux_cc_auto_off":
    case "win_ssh_auto_off":
    case "settings_off":
    case "gb_off":
      return "default";
  }
}

/** Report the explicit NO_FLICKER env override as "on"/"off", or undefined if unset. */
function getNoFlickerEnvState(): string | undefined {
  if (Ne.CLAUDE_CODE_NO_FLICKER === !0) return "on";
  if (Ne.CLAUDE_CODE_NO_FLICKER === !1) return "off";
  return;
}

/** Whether mouse handling should be enabled (default on unless explicitly disabled). */
function isMouseEnabled(): boolean {
  if (Ne.CLAUDE_CODE_SESSION_KIND === "bg") return !0;
  if (Ne.CLAUDE_CODE_DISABLE_MOUSE !== void 0) return !Ne.CLAUDE_CODE_DISABLE_MOUSE;
  return !0;
}

/** Fullscreen enabled AND attached to an interactive TTY. */
function isFullscreenWithTTY(state: TuiState = mZ): boolean {
  return ck() && isFullscreenEnabled(state);
}

/** Build a one-time hint to enable tmux mouse wheel scroll, or null if not applicable. */
async function getTmuxMouseHint(state: TuiState = mZ): Promise<string | null> {
  if (!process.env.TMUX) return null;
  if (!isFullscreenWithTTY(state) || isTmuxControlMode(state)) return null;
  if (state.checkedTmuxMouseHint) return null;
  state.checkedTmuxMouseHint = !0;
  let {
    stdout: cmdStdout,
    code: exitCode
  } = await Fn("tmux", ["show", "-Av", "mouse"], {
    useCwd: !1,
    timeout: 2000
  });
  if (exitCode !== 0 || cmdStdout.trim() === "on") return null;
  return "tmux detected \xB7 scroll with PgUp/PgDn \xB7 or add 'set -g mouse on' to ~/.tmux.conf for wheel scroll";
}

/** Build a one-time hint to enable tmux focus-events, or null if not applicable. */
async function getTmuxFocusHint(state: TuiState = mZ): Promise<string | null> {
  if (!process.env.TMUX) return null;
  if (isTmuxControlMode(state)) return null;
  if (state.checkedTmuxFocusHint) return null;
  state.checkedTmuxFocusHint = !0;
  let {
    stdout: cmdStdout,
    code: exitCode
  } = await Fn("tmux", ["show", "-gv", "focus-events"], {
    useCwd: !1,
    timeout: 2000
  });
  if (exitCode !== 0 || cmdStdout.trim() === "on") return null;
  return "tmux focus-events off \xB7 add 'set -g focus-events on' to ~/.tmux.conf and reattach for focus tracking";
}
var qAi, mZ;
var tp = b(() => {
  lt();
  jn();
  qe();
  rI();
  Ir();
  dn();
  Ii();
  Es();
  bje();
  y8();
  br();
  qAi = require("child_process");
  mZ = createTuiState();
});

export {createTuiState as Jud,detectIterm2TmuxControlMode as Xud,probeTmuxControlMode as Qud,isTmuxControlMode as fZ,isWindowsOverSsh as c3r,isAlternateScreenDisabledByEnv as u3r,isFullscreenEnabled as Cs,checkDownsellGate as Zud,isAlternateScreenEnabled as $Dt,getFullscreenDecisionReason as Sve,decisionReasonToTuiMode as WAi,getNoFlickerEnvState as GAi,isMouseEnabled as zet,isFullscreenWithTTY as hZ,getTmuxMouseHint as VAi,getTmuxFocusHint as KAi,qAi,mZ,tp};
