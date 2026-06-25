// @ts-nocheck
import {normalizeModelStringForAPI,getCanonicalName,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {iQl,oVe} from "../src/permissions/5451_fileHistory.ts";
import {b} from "../runtime.ts";
function X2m(e){return e.type==="system"&&e.subtype==="model_refusal_fallback"}
function Q2m(e,t){if(e==null)return!1;let n=normalizeModelStringForAPI(e),r=normalizeModelStringForAPI(t);return n===r||getCanonicalName(n)===getCanonicalName(r)}
function cQl(e){let t=e.slicedMessages.filter(X2m),n=t.at(-1);if(!n)return;let r=n.fallbackModel,o=(()=>{if(!e.firstParty)return{action:"keep",reason:"not_first_party"};if(!Q2m(e.currentOverride,r))return{action:"keep",reason:"writer_mismatch"};let s=iQl(e.keptMessages,e.initialModel);if(s!=null)return{action:"restore",value:s,restoredFrom:"transcript"};if(e.initialModel!=null)return{action:"restore",value:e.initialModel,restoredFrom:"initial_model"};return{action:"restore",value:null,restoredFrom:"settings_fallthrough"}})();return{bannersSliced:t.length,model:o,lastSlicedFallbackModel:r}}
var uQl=b(()=>{Ro();oVe()});
export {X2m,Q2m,cQl,uQl};
