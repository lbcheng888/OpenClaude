// @ts-nocheck
import {X} from "../runtime.ts";
var Ycr=X((FSe)=>{Object.defineProperty(FSe,"__esModule",{value:!0});FSe.shouldUseRule=FSe.shouldUseGroup=FSe.schemaHasRulesForType=void 0;function vvc({schema:e,self:t},n){let r=t.RULES.types[n];return r&&r!==!0&&jjo(e,r)}FSe.schemaHasRulesForType=vvc;function jjo(e,t){return t.rules.some((n)=>Wjo(e,n))}FSe.shouldUseGroup=jjo;function Wjo(e,t){var n;return e[t.keyword]!==void 0||((n=t.definition.implements)===null||n===void 0?void 0:n.some((r)=>e[r]!==void 0))}FSe.shouldUseRule=Wjo});
export {Ycr};
