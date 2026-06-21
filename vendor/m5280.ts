// @ts-nocheck
import {Obn} from "./m2510.ts";
import {b} from "../runtime.ts";
import {initKp} from "./m609.ts";
import {Ct} from "./m131.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {xH} from "../src/config/0580_xH.ts";
function HWt(e,t){if(e==="now")return e;return t&&CRm.has(t)?"later":e}
function kRm(){return!1}
function HRm(){return!1}
function IRm(e,t){return e!==void 0&&vRm.has(e)&&t===wRm&&kRm()}
function DRm(e,t){return e===RRm&&t===xRm&&HRm()}
function DAt(e,t){return IRm(e,t)||DRm(e,t)}
function IWt(e,t){if(e&&e.kind!=="peer")return e;if(t&&ERm.has(t))return{kind:"task-notification"};if(t&&bRm.has(t))return{kind:"human"};return}
function y3l(e,t,n){if(e==="now")return e;return DAt(t,n)?"later":e}
function HYn(e){return e.verifiedSlackHumanTurn===!0&&e.priority==="later"}
function T3l(e,t){if(e==="now")return e;return t?"later":e}
function XDo(e){let r=e.trimStart();if(!r.startsWith("<system-reminder>"))return e;while(r.startsWith("<system-reminder>")){let o=r.indexOf("</system-reminder>");if(o<0)break;r=r.slice(o+18).trimStart()}return r===""?e:r}
function IYn(e){if(e.type!=="user")return;let t=e.message?.content;if(!t)return;if(Array.isArray(t)&&t.length===0)return;let n="uuid"in e&&typeof e.uuid==="string"?e.uuid:void 0,r="client_platform"in e&&typeof e.client_platform==="string"?e.client_platform:void 0,o="inbound_origin"in e&&typeof e.inbound_origin==="string"?e.inbound_origin:void 0,s=Array.isArray(t)?PRm(ORm(t)):XDo(t);if(Array.isArray(s)&&s.length===0)return;return{content:s,uuid:n,clientPlatform:r,inboundOrigin:o}}
function S3l(e){return}
function PRm(e){if(!e.some(g3l))return e;return e.filter((t)=>!g3l(t))}
function g3l(e){if(e.type!=="text")return!1;return typeof e.text!=="string"||e.text.trim()===""}
function ORm(e){if(!e.some(_3l))return e;return e.map((t)=>{if(!_3l(t))return t;let n=t.source,r=typeof n.mediaType==="string"&&n.mediaType?n.mediaType:Obn(t.source.data);return{...t,source:{type:"base64",media_type:r,data:t.source.data}}})}
function _3l(e){if(e.type!=="image"||e.source?.type!=="base64")return!1;return!e.source.media_type}
var bRm,ERm,CRm,vRm,wRm="slack_human",RRm="claude-in-teams",xRm="teams_human";
var DYn=b(()=>{initKp();Ct();qe();xH();bRm=new Set(["ios","android","web_claude_ai","desktop_app"]),ERm=new Set(["scheduled_trigger","force_run_trigger","github_webhook_trigger","fire_routine","pr_steward"]),CRm=new Set(["scheduled_trigger","force_run_trigger","fire_routine"]);vRm=new Set(["claude-in-slack","claude_in_slack"])});
export {HWt,kRm,HRm,IRm,DRm,DAt,IWt,y3l,HYn,T3l,XDo,IYn,S3l,PRm,g3l,ORm,_3l,bRm,ERm,CRm,vRm,wRm,RRm,xRm,DYn};
