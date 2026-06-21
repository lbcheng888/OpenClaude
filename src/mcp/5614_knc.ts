// @ts-nocheck
import {eN as mv,oA as O$} from "../config/2697_oA.ts";
import {qL as LV,lo as zq} from "../tools/5190_userPromptCount.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/** Restored Claude Code 2.1.177 module. Parses and normalizes MCP schema references. */
function parseSchemaReference(H: any): any {
  for (let _ of H) {
    if (_.type !== "assistant") continue;
    let q = _.message.content;
    if (!Array.isArray(q)) continue;
    for (let K of q) {
      if (K.type !== "tool_use" || !("name" in K)) continue;
      let O = K.name;
      if (O.startsWith("mcp__")) return !1;
      if (mv.includes(O)) {
        let z = K.input?.command || "";
        if (schemaReferenceCache.some(($: any): any => $.test(z))) return !1;
      }
    }
  }
  return !0;
}
function normalizeSchemaReference(H: any): any {
  for (let _ = H.length - 1; _ >= 0; _--) {
    let q = H[_];
    if (q.type !== "user") continue;
    let K = LV(q);
    if (!K) continue;
    return schemaReferencePrefix.some((O: any): any => O.test(K));
  }
  return !1;
}
function resolveSchemaReference(H: any, _: any): any {
  return !1;
}
function formatSchemaReference(H: any, _: any, q: any): any {
  let K = resolveSchemaReference(H, _);
  schemaReferenceRegex.useEffect((): any => {}, [K, q]);
}
var schemaReferenceRegex,
  schemaReferenceCache,
  schemaReferencePrefix,
  schemaReferenceSuffix = 3,
  schemaReferenceDefaults = 1800000;
var pi4 = L((): any => {
  zq();
  O$();
  schemaReferenceRegex = u(WH(), 1), schemaReferenceCache = [/\bcurl\b/, /\bwget\b/, /\bssh\b/, /\bkubectl\b/, /\bsrun\b/, /\bdocker\b/, /\bbq\b/, /\bgsutil\b/, /\bgcloud\b/, /\baws\b/, /\bgit\s+push\b/, /\bgit\s+pull\b/, /\bgit\s+fetch\b/, /\bgh\s+(pr|issue)\b/, /\bnc\b/, /\bncat\b/, /\btelnet\b/, /\bftp\b/], schemaReferencePrefix = [/^no[,!]\s/i, /\bthat'?s (wrong|incorrect|not (what|right|correct))\b/i, /\bnot what I (asked|wanted|meant|said)\b/i, /\bI (said|asked|wanted|told you|already said)\b/i, /\bwhy did you\b/i, /\byou should(n'?t| not)? have\b/i, /\byou were supposed to\b/i, /\btry again\b/i, /\b(undo|revert) (that|this|it|what you)\b/i];
});

export {parseSchemaReference as W$m,normalizeSchemaReference as G$m,resolveSchemaReference as z$m,formatSchemaReference as xnc,schemaReferenceRegex as w5e,schemaReferenceCache as q$m,schemaReferencePrefix as j$m,schemaReferenceSuffix as V$m,schemaReferenceDefaults as K$m,pi4 as knc};
