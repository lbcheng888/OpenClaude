// @ts-nocheck
import {sz as Li,D$ as ug,tx as HZ} from "./2595_skill_name.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {et as aH,Ai as q7} from "../../vendor/m2208.ts";
import {BH as NG,m5 as Tg} from "../../vendor/m2230.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH,st as q_,_l as P4,Qe as O_,fromEnumOpt as A9} from "../../vendor/m5.ts";
import {sv as xX,Epe as z3H} from "../../vendor/m434.ts";
import {$xe as VWH,Ert as k__} from "../../vendor/m3139.ts";
import {react as uY,W6 as HU} from "../../vendor/m4434.ts";
import {loadAllPlugins as jX,loadAllPluginsCacheOnly as oO,gg as BA} from "../agent/4445_resolvePluginRoot.ts";
import {Rkn as e26,vrt as V__,xee as Ie,sMt as mk_,Hq as np} from "../../vendor/m3140.ts";
import {Cn as p6,dr as P8} from "../../vendor/m231.ts";
import {Gml as H44,gmt as X3_,aye as iAH,Smt as W3_,Vml as _44,bmt as Z3_,Emt as G3_} from "../../vendor/m4679.ts";
import {sDi as lP7,iDi as nP7,HAe as ZzH} from "../../vendor/m2596.ts";
import {MP as kk,Mk as JZ} from "../config/4439_operation.ts";
import {writeToStdout as C7,fO as tk} from "../../vendor/m230.ts";
import {Lnl as srK,tue as r4H} from "../config/4442_ref.ts";
import {gs as $9,sh as t$} from "../../vendor/m2589.ts";
import {Ie as vH,ln as M6} from "./0594_feature_name.ts";
import {gracefulShutdown as E7,ym as CT} from "../config/3332_flushAnalyticsSinks.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "../config/0047_namespace.ts";
/**
 * Shared plugin CLI install, uninstall, disable, update, and prune helpers.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Cross-module helper: print a plugin CLI failure and exit. */
function fhH(H: any, _: any, q: any) : any {
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
function parsePluginConfigOverrides(H: any, _: any) : any {
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
async function applyPostInstallUserConfig(H: any, _: any) : any {
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
async function EV4(H: any, _: any = "user", q: any) : any {
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
async function scanPluginOrphans(H: any) : any {
  let _ = X3_(H),
    {
      enabled: q,
      disabled: K
    } = await oO();
  return lP7(kk().plugins, [...q, ...K], H, _);
}
/** Cross-module helper: uninstall a plugin from CLI. */
async function CV4(H: any, _: any = "user", q: any = !1, K: any = !1, O: any = !1) : any {
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
}: any = {}) : any {
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
async function renderPluginPruneResult(H: any, _: any, q: any) : any {
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
async function readYesFromStdin() : any {
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
async function xV4(H: any, _: any) : any {
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
async function uV4() : any {
  try {
    let H = await _44();
    if (!H.success) throw Error(H.message);
    return c("tengu_plugin_disabled_all_cli", {}), `${aH.tick} ${H.message}`;
  } catch (H) {
    fhH(H, "disable-all");
  }
}
/** Cross-module helper: update a plugin from CLI. */
async function mV4(H: any, _: any) : any {
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
export {fhH as LPe,parsePluginConfigOverrides as Ovm,applyPostInstallUserConfig as Lvm,EV4 as l$l,scanPluginOrphans as c$l,CV4 as u$l,bV4 as d$l,renderPluginPruneResult as p$l,readYesFromStdin as Mvm,xV4 as m$l,uV4 as f$l,mV4 as A$l,vV4 as a$l,wWq as yDo};
