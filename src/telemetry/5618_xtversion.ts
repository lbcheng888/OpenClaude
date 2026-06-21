// @ts-nocheck
import {yZ as Lt,Ove as VXH,L_i as MO7,Pp as nO} from "../config/2273_loggedTmuxCcDisable.ts";
import {setRendererModeForAnalytics as Kt6,lt as w_} from "../session/0131_sent.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {IIt as LZ_,pF as HC,XS as pJ} from "../config/2341_XS.ts";
import {je as oH} from "../../vendor/m577.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Terminal probe telemetry — fires the `tengu_terminal_probe` event once per
 * process to record the detected terminal environment (xtversion, multiplexer,
 * SSH status, dimensions, DEC 2026 sync-output support, and renderer path).
 */

/** Detects the active terminal multiplexer from environment variables. */
function detectMultiplexer(): "tmux_cc" | "tmux" | "zellij" | "screen" | "none" {
  if (process.env.TMUX) return Lt() ? "tmux_cc" : "tmux";
  if (process.env.ZELLIJ != null) return "zellij";
  if (process.env.STY) return "screen";
  return "none";
}

/**
 * Fires the `tengu_terminal_probe` analytics event exactly once.
 * Subsequent calls are no-ops (guarded by `hasProbed`).
 */
function probeTerminalAndEmitEvent(): void {
  if (hasProbed) return;
  hasProbed = !0;
  let rendererEntryPath = VXH();
  Kt6(MO7(rendererEntryPath)), c("tengu_terminal_probe", {
    xtversion: LZ_() ?? "no_reply",
    term_program_version: process.env.TERM_PROGRAM_VERSION ?? "unset",
    is_ssh: oH.isSSH(),
    multiplexer: tH(detectMultiplexer()),
    term_rows: process.stdout.rows ?? 0,
    term_cols: process.stdout.columns ?? 0,
    dec2026_allowlist: HC(),
    renderer_entry_path: tH(rendererEntryPath)
  });
}

/** Guards against firing `tengu_terminal_probe` more than once. */
var hasProbed = !1;

/** Lazy module initializer — ensures all dependencies are loaded before use. */
var ri4 = L(() => {
  w_();
  pJ();
  y_();
  _q();
  nO();
});

export {detectMultiplexer as Z$m,probeTerminalAndEmitEvent as Fnc,hasProbed as Bnc,ri4 as Unc};
