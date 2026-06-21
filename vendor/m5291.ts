// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {getBridgeAccessToken,getBridgeBaseUrl,tJ} from "./m4224.ts";
import {fo} from "./m566.ts";
import {isTmuxControlMode,Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Gp} from "./m567.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var z3l={};
isFullscreenWithTTY(z3l,{resolveInboundAttachments:()=>resolveInboundAttachments,resolveAndPrepend:()=>resolveAndPrepend,prependPathRefs:()=>prependPathRefs,extractInboundAttachments:()=>extractInboundAttachments});
function V8e(e){logForDebugging(`[bridge:inbound-attach] ${e}`)}
function extractInboundAttachments(e){if(typeof e!=="object"||e===null||!("file_attachments"in e))return[];let t=cxm().safeParse(e.file_attachments);return t.success?t.data:[]}
function uxm(e){return UWt.basename(e).replace(/[^a-zA-Z0-9._-]/g,"_")||"attachment"}
function dxm(){return UWt.join(tr(),"uploads",getSessionId())}
async function pxm(e){let t=getBridgeAccessToken();if(!t){V8e("skip: no oauth token");return}let n;try{let a=`${getBridgeBaseUrl()}/api/oauth/files/${encodeURIComponent(e.file_uuid)}/content`,l=await fo.get(a,{headers:{Authorization:`Bearer ${t}`},responseType:"arraybuffer",timeout:axm,validateStatus:()=>!0});if(l.status!==200){V8e(`fetch ${e.file_uuid} failed: status=${l.status}`);return}n=Buffer.from(l.data)}catch(a){V8e(`fetch ${e.file_uuid} threw: ${a}`);return}let r=uxm(e.file_name),o=(e.file_uuid.slice(0,8)||G3l.randomUUID().slice(0,8)).replace(/[^a-zA-Z0-9_-]/g,"_"),s=dxm(),i=UWt.join(s,`${o}-${r}`);try{await LYn.mkdir(s,{recursive:!0}),await LYn.writeFile(i,n)}catch(a){V8e(`write ${i} failed: ${a}`);return}return V8e(`resolved ${e.file_uuid} \u2192 ${i} (${n.length} bytes)`),i}
async function resolveInboundAttachments(e){if(e.length===0)return"";if(V8e(`resolving ${e.length} attachment(s)`),!getBridgeAccessToken())return V8e("skip: no oauth token"),isTmuxControlMode("bridge_attachment_resolve","no_token"),"";let n=(await Promise.all(e.map(pxm))).filter((r)=>r!==void 0);if(n.length===0)return Oe("bridge_attachment_resolve","all_failed"),"";if(n.length<e.length)isTmuxControlMode("bridge_attachment_resolve","partial_failed");else Ie("bridge_attachment_resolve");return n.map((r)=>`@"${r}"`).join(" ")+" "}
function prependPathRefs(e,t){if(!t)return e;if(typeof e==="string")return t+e;let n=e.findLastIndex((r)=>r.type==="text");if(n!==-1){let r=e[n];if(r.type==="text")return[...e.slice(0,n),{...r,text:t+r.text},...e.slice(n+1)]}return[...e,{type:"text",text:t.trimEnd()}]}
async function resolveAndPrepend(e,t){let n=extractInboundAttachments(e);if(n.length===0)return t;let r=await resolveInboundAttachments(n);return prependPathRefs(t,r)}
var G3l,LYn,UWt,axm=30000,lxm,cxm;
var pPo=b(()=>{Gp();Xr();lt();ln();qe();sn();tJ();G3l=require("crypto"),LYn=require("fs/promises"),UWt=require("path");lxm=we(()=>E.object({file_uuid:E.string(),file_name:E.string(),is_image:E.boolean().nullish()})),cxm=we(()=>E.array(lxm()))});
export {z3l,V8e,extractInboundAttachments,uxm,dxm,pxm,resolveInboundAttachments,prependPathRefs,resolveAndPrepend,G3l,LYn,UWt,axm,lxm,cxm,pPo};
