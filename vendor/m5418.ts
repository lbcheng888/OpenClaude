// @ts-nocheck
import {normalizeModelStringForAPI,getCanonicalName,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {EWl,f5e} from "../src/permissions/5418_fileHistory.ts";
import {b} from "../runtime.ts";
function qPm(e){return e.type==="system"&&e.subtype==="model_refusal_fallback"}
function jPm(e,t){if(e==null)return!1;let n=normalizeModelStringForAPI(e),r=normalizeModelStringForAPI(t);return n===r||getCanonicalName(n)===getCanonicalName(r)}
function wWl(e){let t=e.slicedMessages.filter(qPm),n=t.at(-1);if(!n)return;let r=n.fallbackModel,o=(()=>{if(!e.firstParty)return{action:"keep",reason:"not_first_party"};if(!jPm(e.currentOverride,r))return{action:"keep",reason:"writer_mismatch"};let s=EWl(e.keptMessages,e.initialModel);if(s!=null)return{action:"restore",value:s,restoredFrom:"transcript"};if(e.initialModel!=null)return{action:"restore",value:e.initialModel,restoredFrom:"initial_model"};return{action:"restore",value:null,restoredFrom:"settings_fallthrough"}})();return{bannersSliced:t.length,model:o,lastSlicedFallbackModel:r}}
var RWl=b(()=>{Mo();f5e()});
export {qPm,jPm,wWl,RWl};
