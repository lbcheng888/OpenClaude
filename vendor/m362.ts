// @ts-nocheck
import {Q} from "../runtime.ts";
var Efr=Q((SEe)=>{Object.defineProperty(SEe,"__esModule",{value:!0});SEe.shouldUseRule=SEe.shouldUseGroup=SEe.schemaHasRulesForType=void 0;function HOc({schema:e,self:t},n){let r=t.RULES.types[n];return r&&r!==!0&&F7o(e,r)}SEe.schemaHasRulesForType=HOc;function F7o(e,t){return t.rules.some((n)=>B7o(e,n))}SEe.shouldUseGroup=F7o;function B7o(e,t){var n;return e[t.keyword]!==void 0||((n=t.definition.implements)===null||n===void 0?void 0:n.some((r)=>e[r]!==void 0))}SEe.shouldUseRule=B7o});
export {Efr};
