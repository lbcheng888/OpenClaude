// @ts-nocheck
import {isSdkDialogHostActive,getSdkSupportedDialogKinds,getMainLoopModelOverride,lt} from "../src/session/0131_sent.ts";
import {mv,parseUserSpecifiedModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {Hwn,kwn,YRe,R8r,eW} from "../src/telemetry/2730_raw.ts";
import {je} from "./m577.ts";
import {getEffectiveSettingSource,getSettingsForSource,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {bae,dnt} from "./m2751.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {sRn,unt} from "./m2750.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {Lr} from "./m578.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function zg(e){return e}
function m2i(e){return async function(n,r,o){if(cxd(r))return dxd(e,n,r,o);return uxd(e,n,r,o)}}
function cxd(e){return typeof e==="object"&&e!==null&&Symbol.asyncIterator in e}
async function uxd(e,t,n,r){let o=t.payload().safeParse(n);if(!o.success)return t.default;let s;try{let{replied:a}=e.request({kind:t.kind,payload:o.data},r);s=await a}catch{return t.default}if("cancelled"in s)return t.default;let i=t.result().safeParse(s.result);return i.success?i.data:t.default}
async function dxd(e,t,n,r){let o=n[Symbol.asyncIterator](),s=await o.next();if(s.done)return t.default;let i=t.payload().safeParse(s.value);if(!i.success)return o.return?.(void 0),t.default;let a=new AbortController,l=()=>a.abort();if(r?.signal)if(r.signal.aborted)a.abort();else r.signal.addEventListener("abort",l,{once:!0});let{replied:c,update:u}=e.request({kind:t.kind,payload:i.data},{signal:a.signal}),d;(async()=>{try{while(!a.signal.aborted){let A=await o.next();if(A.done)return;if(a.signal.aborted)return;let h=t.payload().safeParse(A.value);if(!h.success)continue;u(h.data)}}catch(A){d=A,a.abort()}})().catch(()=>{});let m;try{m=await c}finally{r?.signal?.removeEventListener("abort",l),o.return?.(void 0)}if(d!==void 0)throw d;if("cancelled"in m)return t.default;let f=t.result().safeParse(m.result);return f.success?f.data:t.default}
function f2i(e){if(e===void 0)return!1;if(isSdkDialogHostActive()&&!(getSdkSupportedDialogKinds()??[]).includes(ihe.kind))return!1;return!0}
function pnt(e,t){return mv(e)&&Hwn()&&f2i(t)}
function A2i(e){return e.isMainThread&&f2i(e.requestDialog)}
function h2i(e){if(getMainLoopModelOverride()!==void 0)return!1;if(je.ANTHROPIC_MODEL)return!1;if(getEffectiveSettingSource("model")!=="userSettings")return!1;let t=getSettingsForSource("userSettings")?.model;if(t===void 0||!mv(parseUserSpecifiedModel(t)))return!1;return updateSettingsForSource("userSettings",{model:e}),!0}
async function lRn(){let e=!1;try{e=(await bae())?.extra_usage?.is_enabled===!0}catch{}if(e&&getGlobalConfig().cachedExtraUsageDisabledReason!==null)saveGlobalConfig((t)=>({...t,cachedExtraUsageDisabledReason:null}));return e}
async function g2i({skipLiveCheck:e=!1}={}){if(!e&&await lRn())return!0;let t=await sRn();if(t&&getGlobalConfig().cachedExtraUsageDisabledReason!==null)saveGlobalConfig((n)=>({...n,cachedExtraUsageDisabledReason:null}));return t}
async function _2i(){if(kwn(),!YRe())await lRn();return R8r()}
var ihe;
var mnt=b(()=>{Xr();lt();unt();dnt();Qn();Lr();eW();Mo();yr();ihe=zg({kind:"fable_overage_consent_prompt",payload:we(()=>E.object({overagesEnabled:E.boolean()})),result:we(()=>E.enum(["consent","switch_default","cancelled"])),default:"cancelled"})});
export {zg,m2i,cxd,uxd,dxd,f2i,pnt,A2i,h2i,lRn,g2i,_2i,ihe,mnt};
