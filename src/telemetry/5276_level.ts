// @ts-nocheck
import {xz as Li,n$ as ug,slowOpTracer as HZ} from "./2606_skill_name.ts";
import {Ie as EH,vn as S6} from "../session/0621_length.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {Xe as aH,Zs as q7} from "../../vendor/m2216.ts";
import {fI as NG,k8 as Tg} from "../../vendor/m2238.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH,Ve as O_,Bo as A9} from "../../vendor/m5.ts";
import {nt as q_,Za as P4} from "../../vendor/m127.ts";
import {dA as xX,xpe as z3H} from "../../vendor/m436.ts";
import {HHe as VWH,wst as k__} from "../../vendor/m3149.ts";
import {zh as uY,c6 as HU} from "../../vendor/m4456.ts";
import {loadAllPlugins as jX,loadAllPluginsCacheOnly as oO,path as BA} from "../agent/4467_resolvePluginRoot.ts";
import {gxn as e26,Hst as V__,Aee as Ie,PNt as mk_,V4 as np} from "../../vendor/m3150.ts";
import {Sn as p6,lr as P8} from "../../vendor/m233.ts";
import {Mbl as H44,wht as X3_,DTe as iAH,xht as W3_,Nbl as _44,Dht as Z3_,Pht as G3_} from "../../vendor/m4707.ts";
import {NNi as lP7,FNi as nP7,Whe as ZzH} from "../../vendor/m2607.ts";
import {eP as kk,rH as JZ} from "../config/4461_operation.ts";
import {writeToStdout as C7,LP as tk} from "../../vendor/m232.ts";
import {bcl as srK,Qce as r4H} from "../config/4464_ref.ts";
import {ts as $9,oh as t$} from "../../vendor/m2600.ts";
import {He as vH,mn as M6} from "./0600_feature_name.ts";
import {gracefulShutdown as E7,isAmberSentinelEnabled as CT} from "../config/3348_flushAnalyticsSinks.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "../config/0137_namespace.ts";
/**
 * Shared plugin CLI install, uninstall, disable, update, and prune helpers.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Cross-module helper: print a plugin CLI failure and exit. */
function fhH(H: any, _: any, q: any): any {
  let K = Li(H);
  if (K === "unknown") EH(H);else N(`Plugin command "${_}" failed: ${GH(H)}`, {
    level: "error"
  });
  let O = q ? `${_} plugin "${q}"` : _ === "disable-all" ? "disable all plugins" : `${_} plugins`;
  console.error(`${aH.cross} Failed to ${O}: ${GH(H)}`);
  let T = q ? ug(q, NG()) : {};
  c("tengu_plugin_command_failed", {
    command: tH(_),
    error_category: tH(K),
    ...T
  }), process.exit(1);
}
/** Parse repeated --config KEY=VALUE overrides against userConfig schema. */
function parsePluginConfigOverrides(H: any, _: any): any {
  let q = {};
  for (let T of H) {
    let z = T.indexOf("=");
    if (z <= 0) throw Error(`--config expects KEY=VALUE, got "${T}". Use --config key=value (repeatable).`);
    let $ = T.slice(0, z),
      A = (T.slice(z + 1).split(/\r\n|\r|\n/, 1)[0] ?? "").trim(),
      w = Object.hasOwn(_, $) ? _[$] : void 0;
    if (!w) {
      let f = Object.keys(_);
      throw Error(`--config key "${$}" isn't declared in this plugin's userConfig.` + (f.length > 0 ? ` Known keys: ${f.join(", ")}.` : ""));
    }
    if (A === "") throw Error(`--config ${$}: value is empty. Omit the flag to leave "${$}" unset.`);
    if (w.type === "number") {
      let f = Number(A);
      if (Number.isNaN(f)) throw Error(`--config ${$}: "${A}" is not a number`);
      q[$] = f;
    } else if (w.type === "boolean") {
      if (!q_(A) && !P4(A)) throw Error(`--config ${$}: "${A}" is not a boolean (use true/false, 1/0, yes/no, on/off)`);
      q[$] = q_(A);
    } else q[$] = A;
  }
  let K = xX(_, (T, z) => Object.hasOwn(q, z)),
    O = VWH(q, K);
  if (!O.valid) throw Error(`--config validation failed: ${O.errors.join("; ")}`);
  return q;
}
/** Apply userConfig after install and return any remaining setup message. */
async function applyPostInstallUserConfig(H: any, _: any): any {
  uY();
  let {
      enabled: q,
      disabled: K
    } = await jX(),
    O = e26([...q, ...K], H);
  if (!O) {
    if (_ && _.length > 0) throw Error(`--config was given but plugin "${H}" failed to load after install \u2014 run \`claude plugin list\` to see why.`);
    return "";
  }
  let T = O.manifest.userConfig;
  if (!T || Object.keys(T).length === 0) {
    if (_ && _.length > 0) throw Error(`--config was given but plugin "${H}" declares no userConfig options.`);
    return "";
  }
  if (_ && _.length > 0) {
    let Y = parsePluginConfigOverrides(_, T);
    await V__(Ie(O), Y, T);
  }
  let z = Object.keys(mk_(O));
  if (z.length === 0) return "";
  let $ = z.filter(Y => T[Y]?.required === !0);
  return `${z.length} userConfig ${p6(z.length, "option")} not yet set` + ($.length > 0 ? ` (${$.length} required)` : "") + ` \u2014 run /plugin configure ${H} in Claude Code, or pass --config KEY=VALUE.`;
}
/** Cross-module helper: install a plugin from CLI. */
async function EV4(H: any, _: any = "user", q: any): any {
  try {
    let K = await H44(H, _);
    if (!K.success) throw Error(K.message);
    c("tengu_plugin_installed_cli", {
      ...ug(K.pluginId || H, NG()),
      scope: tH(K.scope || _),
      install_source: O_("cli-explicit")
    });
    let O = "";
    try {
      O = await applyPostInstallUserConfig(K.pluginId || H, q);
    } catch (T) {
      let z = GH(T);
      if (N(`post-install userConfig step failed: ${z}`, {
        level: "warn"
      }), q && q.length > 0) O = `${aH.warning} Installed, but --config not applied: ${z}`;
    }
    return O ? `${K.message}
${O}` : K.message;
  } catch (K) {
    fhH(K, "install", H);
  }
}
/** Scan auto-installed plugin dependencies for orphans. */
async function scanPluginOrphans(H: any): any {
  let _ = X3_(H),
    {
      enabled: q,
      disabled: K
    } = await oO();
  return lP7(kk().plugins, [...q, ...K], H, _);
}
/** Cross-module helper: uninstall a plugin from CLI. */
async function CV4(H: any, _: any = "user", q: any = !1, K: any = !1, O: any = !1): any {
  try {
    let T = await iAH(H, _, !q);
    if (!T.success) throw Error(T.message);
    c("tengu_plugin_uninstalled_cli", {
      ...ug(T.pluginId || H, NG()),
      scope: tH(T.scope || _)
    });
    let z = !1;
    try {
      let $ = await scanPluginOrphans(_);
      if (K) return C7(`${aH.tick} ${T.message}
`), z = !0, await renderPluginPruneResult($, _, {
        dryRun: !1,
        yes: O,
        deleteDataDir: !q
      });
      return T.message + nP7($.orphans, _);
    } catch ($) {
      EH($);
      let A = `(${K ? "prune" : "orphan scan"} failed: ${GH($)})`;
      if (z) return A;
      return `${K ? `${aH.tick} ${T.message}` : T.message}
${A}`;
    }
  } catch (T) {
    fhH(T, "uninstall", H);
  }
}
/** Cross-module helper: prune plugins from CLI. */
async function bV4(H: any = "user", {
  dryRun: _ = !1,
  yes: q = !1
}: any = {}): any {
  try {
    let K = await scanPluginOrphans(H);
    return await renderPluginPruneResult(K, H, {
      dryRun: _,
      yes: q,
      deleteDataDir: !0
    });
  } catch (K) {
    fhH(K, "prune");
  }
}
/** Render and optionally execute the plugin-prune plan. */
async function renderPluginPruneResult(H: any, _: any, q: any): any {
  if (H.unloadable.length > 0) return `Skipped \u2014 cannot determine orphans: ${H.unloadable.join(", ")} failed to load. Fix or uninstall, then retry.`;
  if (H.orphans.size === 0) return H.autoCount === 0 ? `Nothing to prune (no auto-installed plugins at ${_} scope).` : `Nothing to prune (${H.autoCount} auto-installed ${p6(H.autoCount, "plugin", "plugins")} at ${_} scope, all still needed).`;
  let K = kk().plugins,
    O = X3_(_),
    T = [...H.orphans].map(Y => {
      let A = K[Y]?.find(w => w.scope === _ && w.projectPath === O);
      return `  ${Y}${A?.version ? ` (${A.version})` : ""}`;
    }),
    z = `${H.orphans.size} auto-installed ${p6(H.orphans.size, "plugin", "plugins")} no longer needed at ${_} scope:
${T.join(`
`)}`;
  if (q.dryRun) return `${z}
(dry run \u2014 nothing removed)`;
  if (!q.yes) {
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      let A = _ === "user" ? "" : ` --scope ${_}`;
      return `${z}
Not a TTY \u2014 run \`claude plugin prune${A} -y\` to remove.`;
    }
    if (C7(`${z}
Remove? [y/N] `), !(await readYesFromStdin())) return "Aborted.";
  }
  let $ = await srK(H.orphans, _, O, {
    deleteDataDir: q.deleteDataDir
  });
  return c("tengu_plugin_prune_cli", {
    scope: tH(_),
    removed_count: $.length
  }), `Removed ${$.length} auto-installed ${p6($.length, "plugin", "plugins")}: ${$.map(Y => $9(Y).name).join(", ")}`;
}
/** Read a yes/no answer from stdin. */
async function readYesFromStdin(): any {
  let H = vV4.createInterface({
    input: process.stdin
  });
  try {
    for await (let _ of H) return /^y(es)?$/i.test(_.trim());
    return !1;
  } finally {
    H.close();
  }
}
/** Cross-module helper: disable a plugin from CLI. */
async function xV4(H: any, _: any): any {
  try {
    let q = await W3_(H, _);
    if (!q.success) throw Error(q.message);
    return c("tengu_plugin_disabled_cli", {
      ...ug(q.pluginId || H, NG()),
      scope: A9(q.scope)
    }), `${aH.tick} ${q.message}`;
  } catch (q) {
    fhH(q, "disable", H);
  }
}
/** Cross-module helper: disable all plugins from CLI. */
async function uV4(): any {
  try {
    let H = await _44();
    if (!H.success) throw Error(H.message);
    return c("tengu_plugin_disabled_all_cli", {}), `${aH.tick} ${H.message}`;
  } catch (H) {
    fhH(H, "disable-all");
  }
}
/** Cross-module helper: update a plugin from CLI. */
async function mV4(H: any, _: any): any {
  try {
    C7(`Checking for updates for plugin "${H}" at ${_} scope\u2026
`);
    let q = await Z3_(H, _);
    if (!q.success) throw Error(q.message);
    if (C7(`${aH.tick} ${q.message}
`), !q.alreadyUpToDate && !q.skipped) c("tengu_plugin_updated_cli", {
      ...ug(q.pluginId || H, NG()),
      old_version: q.oldVersion || "unknown",
      new_version: q.newVersion || "unknown"
    });
    vH("cli_plugin_update"), await E7(0);
  } catch (q) {
    fhH(q, "update", H);
  }
}
var vV4;
var wWq = L(() => {
  q7();
  z3H();
  FH();
  A6();
  L_();
  CT();
  S6();
  HU();
  ZzH();
  JZ();
  Tg();
  k__();
  t$();
  r4H();
  BA();
  np();
  tk();
  P8();
  HZ();
  M6();
  y_();
  G3_();
  vV4 = require("readline");
});
export {fhH as DOe,parsePluginConfigOverrides as JPm,applyPostInstallUserConfig as XPm,EV4 as nGl,scanPluginOrphans as rGl,CV4 as oGl,bV4 as sGl,renderPluginPruneResult as iGl,readYesFromStdin as QPm,xV4 as aGl,uV4 as lGl,mV4 as cGl,vV4 as tGl,wWq as $1o};
