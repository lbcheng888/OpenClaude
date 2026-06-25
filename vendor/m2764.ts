// @ts-nocheck
import {isSdkDialogHostActive,getSdkSupportedDialogKinds,getMainLoopModelOverride,lt} from "../src/session/0132_sent.ts";
import {isFableFamilyOrPinnedModel,getCanonicalName,parseUserSpecifiedModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {yqi,zMt,Pke,Oke,r7r,ej} from "../src/telemetry/2743_raw.ts";
import {Ne} from "./m583.ts";
import {getEffectiveSettingSource,getSettingsForSource,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {iI,qoe} from "./m1290.ts";
import {uot,nB} from "../src/api/2752_status.ts";
import {bae,wHn,_ge} from "../src/telemetry/2750_title.ts";
import {VHn,got} from "./m2763.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {Ir} from "./m584.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function s_(e){return e}
function s5i(e){return async function(n,r,o){if(Y1d(r))return X1d(e,n,r,o);return J1d(e,n,r,o)}}
function Y1d(e){return typeof e==="object"&&e!==null&&Symbol.asyncIterator in e}
async function J1d(e,t,n,r){let o=t.payload().safeParse(n);if(!o.success)return t.default;let s;try{let{replied:a}=e.request({kind:t.kind,payload:o.data},r);s=await a}catch{return t.default}if("cancelled"in s)return t.default;let i=t.result().safeParse(s.result);return i.success?i.data:t.default}
async function X1d(e,t,n,r){let o=n[Symbol.asyncIterator](),s=await o.next();if(s.done)return t.default;let i=t.payload().safeParse(s.value);if(!i.success)return o.return?.(void 0),t.default;let a=new AbortController,l=()=>a.abort();if(r?.signal)if(r.signal.aborted)a.abort();else r.signal.addEventListener("abort",l,{once:!0});let{replied:c,update:u}=e.request({kind:t.kind,payload:i.data},{signal:a.signal,queueBehind:r?.queueBehind}),d;(async()=>{try{while(!a.signal.aborted){let h=await o.next();if(h.done)return;if(a.signal.aborted)return;let g=t.payload().safeParse(h.value);if(!g.success)continue;u(g.data)}}catch(h){d=h,a.abort()}})().catch(()=>{});let m;try{m=await c}finally{r?.signal?.removeEventListener("abort",l),o.return?.(void 0)}if(d!==void 0)throw d;if("cancelled"in m)return t.default;let f=t.result().safeParse(m.result);return f.success?f.data:t.default}
function i5i(e){if(e===void 0)return!1;if(isSdkDialogHostActive()&&!(getSdkSupportedDialogKinds()??[]).includes(Tge.kind))return!1;return!0}
function _ot(e,t){return isFableFamilyOrPinnedModel(e)&&!yqi(getCanonicalName(e))&&zMt()&&i5i(t)}
function a5i(e){return e.isMainThread&&i5i(e.requestDialog)}
function l5i(e){if(getMainLoopModelOverride()!==void 0)return!1;if(Ne.ANTHROPIC_MODEL)return!1;if(getEffectiveSettingSource("model")!=="userSettings")return!1;let t=getSettingsForSource("userSettings")?.model;if(t===void 0||!isFableFamilyOrPinnedModel(parseUserSpecifiedModel(t)))return!1;return ao("userSettings",{model:e}),!0}
async function zHn(){let e=iI();if(e)return uot(e.isEnabled?null:"overage_not_provisioned"),e.isEnabled?"enabled":"disabled";let t=null;try{t=await bae()}catch{return"unknown"}let n=t?.extra_usage;if(n?.is_enabled===!0)return uot(null),"enabled";if(wHn(n))return uot(n?.disabled_reason??null),"blocked";return n?.is_enabled===!1?"disabled":"unknown"}
async function q7r({skipLiveCheck:e=!1}={}){if(!e){let n=await zHn();if(n==="enabled"||n==="blocked")return!0}let t=await VHn();if(t)uot(null);return t}
async function c5i(){if(Pke(),!Oke())await zHn();return r7r()}
var Tge;
var yot=b(()=>{Qr();lt();got();_ge();nB();qoe();Ir();ej();Ro();br();Tge=s_({kind:"fable_overage_consent_prompt",payload:ve(()=>C.object({overagesEnabled:C.boolean(),balanceCents:C.number().nullable().optional(),currency:C.string().nullable().optional()})),result:ve(()=>C.enum(["consent","switch_default","cancelled"])),default:"cancelled"})});
export {s_,s5i,Y1d,J1d,X1d,i5i,_ot,a5i,l5i,zHn,q7r,c5i,Tge,yot};
