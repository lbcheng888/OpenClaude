// @ts-nocheck
import {rfl as j44,Cmt as R3_,ofl as J44,mWn as bU6} from "../../vendor/m4683.ts";
import {vx as O0,Mk as JZ} from "../config/4439_operation.ts";
import {NP as Nk,tM as cV,hS as tj} from "../config/4438_source.ts";
import {aye as iAH,Emt as G3_} from "../../vendor/m4679.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_,fromEnum as tH} from "../../vendor/m5.ts";
import {sz as Li,D$ as ug,tx as HZ} from "./2595_skill_name.ts";
import {BH as NG,m5 as Tg} from "../../vendor/m2230.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {lP as dN,sh as t$} from "../../vendor/m2589.ts";
import {b as L} from "../../runtime.ts";
/**
 * Telemetry-backed enforcement for delisted marketplace plugins.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Find installed plugin IDs that no longer exist in a marketplace manifest. */
function findDelistedPluginIds(H: any, _: any, q: any) : any {
  let K = new Set(_.plugins.map(z => z.name)),
    O = `@${q}`,
    T = [];
  for (let z of Object.keys(H.plugins)) {
    if (!z.endsWith(O)) continue;
    let $ = z.slice(0, -O.length);
    if (!K.has($)) T.push(z);
  }
  return T;
}
/** Cross-module task: uninstall delisted marketplace plugins where policy requires it. */
async function ql6() : any {
  await j44();
  let H = O0(),
    _ = R3_(),
    q = await Nk(),
    K = [];
  for (let O of Object.keys(q)) try {
    let T = await cV(O);
    if (!T.forceRemoveDeletedPlugins) continue;
    let z = findDelistedPluginIds(H, T, O);
    for (let $ of z) {
      if ($ in _) continue;
      let Y = H.plugins[$] ?? [];
      if (!Y.some(w => w.scope === "user" || w.scope === "project" || w.scope === "local")) continue;
      for (let w of Y) {
        let {
          scope: f
        } = w;
        if (f !== "user" && f !== "project" && f !== "local") continue;
        try {
          let j = await iAH($, f);
          c("tengu_plugin_delisted_enforcement", {
            outcome: j.success ? O_("uninstalled") : O_("uninstall-failed"),
            scope: tH(f),
            ...(!j.success && {
              error_kind: tH(Li(j.message))
            }),
            ...ug($, NG())
          });
        } catch (j) {
          N(`Failed to auto-uninstall delisted plugin ${$} from ${f}: ${GH(j)}`, {
            level: "error"
          }), c("tengu_plugin_delisted_enforcement", {
            outcome: O_("uninstall-failed"),
            scope: tH(f),
            error_kind: tH(Li(j)),
            ...ug($, NG())
          });
        }
      }
      await J44($), K.push($);
    }
  } catch (T) {
    N(`Failed to check for delisted plugins in "${O}": ${GH(T)}`, {
      level: "warn"
    }), c("tengu_plugin_delisted_enforcement", {
      outcome: O_("scan-failed"),
      error_kind: tH(Li(T)),
      _PROTO_marketplace_name: O,
      is_official_marketplace: dN(O)
    });
  }
  return K;
}
var YWq = L(() => {
  y_();
  G3_();
  FH();
  L_();
  HZ();
  JZ();
  Tg();
  tj();
  bU6();
  t$();
});
export {findDelistedPluginIds as Evm,ql6 as fYn,YWq as gDo};
