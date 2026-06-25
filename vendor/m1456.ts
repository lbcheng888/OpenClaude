// @ts-nocheck
import {getCanonicalName,parseUserSpecifiedModel,resolveModelAliasEnvFree,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {nl,iD,JNe,T2} from "./m1455.ts";
import {getAPIProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {getModelAccessCache,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {getFatalAdminPolicyLoadErrors,hasSurvivingAdminPolicySource,getSettings_DEPRECATED,getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {GJe,gQ} from "./m1287.ts";
import {b} from "../runtime.ts";
function h9u(e){return getCanonicalName(nl(e.trim().toLowerCase()))}
function g9u(e){let t=new Set;for(let n of e??[])if(!n.entitled)t.add(h9u(n.apiName));return t}
function XNe(e,t){if(t.size===0)return!1;let n=nl(e.trim().toLowerCase()),r=iD(n)?parseUserSpecifiedModel(n):n;return t.has(getCanonicalName(r))}
function Hme(){let e=getAPIProvider();if(e!=="firstParty"&&e!=="gateway")return new Set;return g9u(getModelAccessCache())}
function k5s(e,t){for(let n=e.indexOf(t);n!==-1;n=e.indexOf(t,n+1)){let r=n===0||!/[a-z0-9]/i.test(e[n-1]),o=n+t.length,s=o===e.length||!/[a-z0-9]/i.test(e[o]);if(r&&s)return!0}return!1}
function _9u(e,t,n){if(iD(e)){let r=n?resolveModelAliasEnvFree(e):parseUserSpecifiedModel(e).toLowerCase();return r!==null&&k5s(r,t)}return k5s(e,t)}
function H5s(e,t){if(!e.startsWith(t))return!1;return e.length===t.length||e[t.length]==="-"}
function y9u(e,t){let n=iD(e)?parseUserSpecifiedModel(e).toLowerCase():e;if(H5s(n,t))return!0;if(!t.startsWith("claude-")&&H5s(n,`claude-${t}`))return!0;return!1}
function I5s(e,t){for(let n of t){if(JNe(n))continue;let r=n.indexOf(e);if(r===-1)continue;let o=r+e.length;if(o===n.length||n[o]==="-")return!0}return!1}
function x5s(e,t){let n=nl(e).toLowerCase();for(let[r,o]of Object.entries(t))if(nl(o).toLowerCase()===n)return r;return e}
function _mn(e,t){let n=nl(parseUserSpecifiedModel(e).trim().toLowerCase()),r=resolveModelAliasEnvFree(e);if(r!==null&&nl(r)===n)return!0;if(iD(n))return!1;return Oa(n,{...t,envFreeAliasResolution:!0})}
function Oa(e,t){if(t?.allowlist===void 0){try{if(getFatalAdminPolicyLoadErrors().length>0&&!hasSurvivingAdminPolicySource())return!1}catch{return!1}if(XNe(e,Hme()))return!1}let n=getSettings_DEPRECATED()||{},r=t?.allowlist??n.availableModels;if(!r)return!0;if(r.length===0)return!1;let o=r.map((l)=>nl(l.trim().toLowerCase())),s=nl(e.trim().toLowerCase());if(o.includes(s)&&!JNe(s)){if(t?.envFreeAliasResolution||!iD(s)||_mn(s,t))return!0}let i;if(t?.overridesMap!==void 0)i=x5s(e,t.overridesMap);else if(t?.ignoreModelOverrides)i=e;else{let l;try{l=getSettingsForSource("policySettings")}catch{return!1}i=l?.availableModels!==void 0?x5s(e,l.modelOverrides??{}):GJe(e)}let a=nl(i.trim().toLowerCase());if(o.includes(a)){if(!JNe(a)||!I5s(a,o)){if(t?.envFreeAliasResolution||a!==s||!iD(a)||_mn(a,t))return!0}}for(let l of o)if(JNe(l)&&!I5s(l,o)&&_9u(a,l,t?.envFreeAliasResolution))return!0;if(iD(a)){let l=parseUserSpecifiedModel(a).toLowerCase();if(o.includes(l))return!0}for(let l of o)if(!JNe(l)&&iD(l)){let c=t?.envFreeAliasResolution?resolveModelAliasEnvFree(l):parseUserSpecifiedModel(l).toLowerCase();if(c!==null&&nl(c)===a)return!0}for(let l of o)if(!JNe(l)&&!iD(l)){if(y9u(a,l))return!0}return!1}
var eO=b(()=>{lo();br();T2();Ro();gQ();Ps()});
export {h9u,g9u,XNe,Hme,k5s,_9u,H5s,y9u,I5s,x5s,_mn,Oa,eO};
