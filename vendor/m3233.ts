// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Hj} from "./m3214.ts";
import {Yge,rua,oua} from "../src/tools/3233_computerUseMcpState.ts";
import {Mca,Fca,BQr} from "../src/computer-use/3225_flag.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {Kca,WDn} from "./m3227.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {BDn} from "../src/computer-use/3222_apps.ts";
import {zDn,JQr} from "./m3231.ts";
import {cit,uit} from "../src/telemetry/3229_enabled.ts";
import {UDn,OQr} from "./m3223.ts";
import {ait} from "./m3222.ts";
var aua={};
ft(aua,{getComputerUseMCPToolOverrides:()=>getComputerUseMCPToolOverrides,buildSessionContext:()=>buildSessionContext,_resetComputerUseWrapperForTesting:()=>_resetComputerUseWrapperForTesting});
function tq(){return QQr}
function _resetComputerUseWrapperForTesting(){MFt=void 0,QQr=void 0,ZQr=void 0,jDn=0}
function sua(e){return`Computer use is in use by another Claude session (${e.slice(0,8)}\u2026). Wait for that session to finish or run /exit there.`}
function buildSessionContext(){return{getAllowedApps:()=>tq().getAppState().computerUseMcpState?.allowedApps??[],getGrantFlags:()=>tq().getAppState().computerUseMcpState?.grantFlags??Hj,getUserDeniedBundleIds:()=>[],getSelectedDisplayId:()=>tq().getAppState().computerUseMcpState?.selectedDisplayId,getDisplayPinnedByModel:()=>tq().getAppState().computerUseMcpState?.displayPinnedByModel??!1,getDisplayResolvedForApps:()=>tq().getAppState().computerUseMcpState?.displayResolvedForApps,getLastScreenshotDims:()=>{let e=tq().getAppState().computerUseMcpState?.lastScreenshotDims;return e?{...e,displayId:e.displayId??0,originX:e.originX??0,originY:e.originY??0}:void 0},onPermissionRequest:(e,t)=>jjd(e),onAllowedAppsChanged:(e,t)=>Yge(tq().setAppState,(n)=>{let r=n?.allowedApps,o=n?.grantFlags,s=r?.length===e.length&&e.every((a,l)=>r[l]?.bundleId===a.bundleId),i=o?.clipboardRead===t.clipboardRead&&o?.clipboardWrite===t.clipboardWrite&&o?.systemKeyCombos===t.systemKeyCombos;return s&&i?n:{...n,allowedApps:[...e],grantFlags:t}}),onAppsHidden:(e)=>{if(e.length===0)return;Yge(tq().setAppState,(t)=>{let n=t?.hiddenDuringTurn;if(n&&e.every((r)=>n.has(r)))return t;return{...t,hiddenDuringTurn:new Set([...n??[],...e])}})},onResolvedDisplayUpdated:(e)=>Yge(tq().setAppState,(t)=>{if(t?.selectedDisplayId===e&&!t.displayPinnedByModel&&t.displayResolvedForApps===void 0)return t;return{...t,selectedDisplayId:e,displayPinnedByModel:!1,displayResolvedForApps:void 0}}),onDisplayPinned:(e)=>Yge(tq().setAppState,(t)=>{let n=e!==void 0,r=n?t?.displayResolvedForApps:void 0;if(t?.selectedDisplayId===e&&t?.displayPinnedByModel===n&&t?.displayResolvedForApps===r)return t;return{...t,selectedDisplayId:e,displayPinnedByModel:n,displayResolvedForApps:r}}),onDisplayResolvedForApps:(e)=>Yge(tq().setAppState,(t)=>{if(t?.displayResolvedForApps===e)return t;return{...t,displayResolvedForApps:e}}),onScreenshotCaptured:(e)=>Yge(tq().setAppState,(t)=>{let n=t?.lastScreenshotDims;return n?.width===e.width&&n?.height===e.height&&n?.displayWidth===e.displayWidth&&n?.displayHeight===e.displayHeight&&n?.displayId===e.displayId&&n?.originX===e.originX&&n?.originY===e.originY?t:{...t,lastScreenshotDims:e}}),checkCuLock:async()=>{let e=await Mca();switch(e.kind){case"free":return{holder:void 0,isSelf:!1};case"held_by_self":return{holder:getSessionId(),isSelf:!0};case"blocked":return{holder:e.by,isSelf:!1}}},acquireCuLock:async()=>{let e=await Fca();if(e.kind==="blocked")throw Error(sua(e.by));if(e.fresh){let t=Kca(()=>{if(jDn===0){logForDebugging("[cu-esc] user escape with no CU call in flight; consumed only");return}logForDebugging("[cu-esc] user escape, aborting turn"),tq().abortController.abort()});ZQr?.({type:"os_notification",message:t?"Claude is using your computer \xB7 press Esc to stop":"Claude is using your computer \xB7 press Ctrl+C to stop",notificationType:"computer_use_enter"})}},formatLockHeldMessage:sua}}
function Kjd(){if(MFt)return MFt;let e=buildSessionContext();return MFt={ctx:e,dispatch:BDn(zDn(),cit(),e)},MFt}
function getComputerUseMCPToolOverrides(e){let t=async(n,r,o,s,i)=>{QQr=r,ZQr=i,jDn++;let a;try{let{dispatch:d}=Kjd();a=await d(e,n)}finally{jDn--}let{telemetry:l,...c}=a;if(l?.error_kind)logForDebugging(`[Computer Use MCP] ${e} error_kind=${l.error_kind}`);return{data:Array.isArray(c.content)?c.content.map((d)=>d.type==="image"?{type:"image",source:{type:"base64",media_type:d.mimeType??"image/jpeg",data:d.data}}:{type:"text",text:d.type==="text"?d.text:""}):c.content}};return{...rua(e),call:t}}
async function jjd(e){let t=tq(),n=t.requestDialog;if(!n)return{granted:[],denied:[],flags:Hj};return n(UDn,e,{signal:t.abortController.signal})}
var MFt,QQr,ZQr,jDn=0;
var lua=b(()=>{ait();lt();OQr();qe();BQr();WDn();uit();JQr();oua()});
export {aua,tq,_resetComputerUseWrapperForTesting,sua,buildSessionContext,Kjd,getComputerUseMCPToolOverrides,jjd,MFt,QQr,ZQr,jDn,lua};
