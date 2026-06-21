// @ts-nocheck
import {nBr as Kb8,UHt as iG_} from "../permissions/2210_surface.ts";
import {getCommands as zM,isSkillToolCommand as sLH,Sf as nT} from "../tools/5142_toSlashCommands.ts";
import {SYa as pgK,x6 as lQ} from "../tools/4332_displayName.ts";
import {EPt as fL_,CPt as jL_} from "../../vendor/m2678.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {xAe as PzH,kAe as WzH,tx as HZ} from "./2595_skill_name.ts";
import {b as L} from "../../runtime.ts";
/**
 * Loaded-skill telemetry emission and declared-field flags.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Return normalized field names declared by the skill schema. */
function getSkillDeclaredFieldNames() : any {
  return kNT ??= Object.keys(Kb8().shape);
}
/** Build telemetry booleans for skill declared fields. */
function buildDeclaredFieldFlags(H: any) : any {
  let _ = H && new Set(H.map(normalizeSkillDeclaredFieldName));
  return Object.fromEntries(getSkillDeclaredFieldNames().map(q => {
    let K = normalizeSkillDeclaredFieldName(q);
    return [`has_${K}`, _?.has(K) ?? !1];
  }));
}
/** Cross-module emitter: record loaded non-builtin prompt skills. */
async function Ba4(H: any, _: any, q: any) : any {
  let K = await zM(H),
    O = pgK(),
    T = new Set(O),
    z = [...K, ...O],
    $ = fL_(_, q);
  for (let Y of z) {
    if (Y.type !== "prompt") continue;
    if (Y.source === "builtin") continue;
    c("tengu_skill_loaded", {
      _PROTO_skill_name: Y.name,
      ...!1,
      ...PzH(Y.source, Y.loadedFrom, Y.kind, Y.createdBy),
      skill_budget: $,
      skill_content_chars: Y.contentLength,
      model_invocable: sLH(Y),
      is_conditional: T.has(Y),
      ...buildDeclaredFieldFlags(Y.declaredFields),
      ...(Y.pluginInfo && WzH(Y.pluginInfo))
    });
  }
}
var kNT,
  normalizeSkillDeclaredFieldName = H => H.replaceAll("-", "_").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
var Ua4 = L(() => {
  nT();
  iG_();
  y_();
  lQ();
  jL_();
  HZ();
});
export {getSkillDeclaredFieldNames as D3m,buildDeclaredFieldFlags as P3m,Ba4 as Nsc,kNT as I3m,normalizeSkillDeclaredFieldName as Msc,Ua4 as Bsc};
