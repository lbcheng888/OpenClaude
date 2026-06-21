// @ts-nocheck
import {LO,nNe,$l,X2} from "./m1450.ts";
import {resolveModelAliasEnvFree,parseUserSpecifiedModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {getFatalAdminPolicyLoadErrors,hasSurvivingAdminPolicySource,getSettings_DEPRECATED,getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Kze,yQ} from "./m1282.ts";
import {b} from "../runtime.ts";
function D$s(e,t){for(let n=e.indexOf(t);n!==-1;n=e.indexOf(t,n+1)){let r=n===0||!/[a-z0-9]/i.test(e[n-1]),o=n+t.length,s=o===e.length||!/[a-z0-9]/i.test(e[o]);if(r&&s)return!0}return!1}
function QPu(e,t,n){if(LO(e)){let r=n?resolveModelAliasEnvFree(e):parseUserSpecifiedModel(e).toLowerCase();return r!==null&&D$s(r,t)}return D$s(e,t)}
function P$s(e,t){if(!e.startsWith(t))return!1;return e.length===t.length||e[t.length]==="-"}
function ZPu(e,t){let n=LO(e)?parseUserSpecifiedModel(e).toLowerCase():e;if(P$s(n,t))return!0;if(!t.startsWith("claude-")&&P$s(n,`claude-${t}`))return!0;return!1}
function O$s(e,t){for(let n of t){if(nNe(n))continue;let r=n.indexOf(e);if(r===-1)continue;let o=r+e.length;if(o===n.length||n[o]==="-")return!0}return!1}
function L$s(e,t){let n=$l(e).toLowerCase();for(let[r,o]of Object.entries(t))if($l(o).toLowerCase()===n)return r;return e}
function Oun(e,t){let n=$l(parseUserSpecifiedModel(e).trim().toLowerCase()),r=resolveModelAliasEnvFree(e);if(r!==null&&$l(r)===n)return!0;if(LO(n))return!1;return isModelAllowed(n,{...t,envFreeAliasResolution:!0})}
function isModelAllowed(e,t){if(t?.allowlist===void 0)try{if(getFatalAdminPolicyLoadErrors().length>0&&!hasSurvivingAdminPolicySource())return!1}catch{return!1}let n=getSettings_DEPRECATED()||{},r=t?.allowlist??n.availableModels;if(!r)return!0;if(r.length===0)return!1;let o=r.map((l)=>$l(l.trim().toLowerCase())),s=$l(e.trim().toLowerCase());if(o.includes(s)&&!nNe(s)){if(t?.envFreeAliasResolution||!LO(s)||Oun(s,t))return!0}let i;if(t?.overridesMap!==void 0)i=L$s(e,t.overridesMap);else if(t?.ignoreModelOverrides)i=e;else{let l;try{l=getSettingsForSource("policySettings")}catch{return!1}i=l?.availableModels!==void 0?L$s(e,l.modelOverrides??{}):Kze(e)}let a=$l(i.trim().toLowerCase());if(o.includes(a)){if(!nNe(a)||!O$s(a,o)){if(t?.envFreeAliasResolution||a!==s||!LO(a)||Oun(a,t))return!0}}for(let l of o)if(nNe(l)&&!O$s(l,o)&&QPu(a,l,t?.envFreeAliasResolution))return!0;if(LO(a)){let l=parseUserSpecifiedModel(a).toLowerCase();if(o.includes(l))return!0}for(let l of o)if(!nNe(l)&&LO(l)){let c=t?.envFreeAliasResolution?resolveModelAliasEnvFree(l):parseUserSpecifiedModel(l).toLowerCase();if(c!==null&&$l(c)===a)return!0}for(let l of o)if(!nNe(l)&&!LO(l)){if(ZPu(a,l))return!0}return!1}
var MO=b(()=>{yr();X2();Mo();yQ()});
export {D$s,QPu,P$s,ZPu,O$s,L$s,Oun,isModelAllowed,MO};
