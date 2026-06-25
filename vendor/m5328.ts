// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {getBridgeAccessToken,getBridgeBaseUrl,BY} from "./m4242.ts";
import {ho} from "./m572.ts";
import {Pt,xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {ap} from "./m573.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var r7l={};
ft(r7l,{resolveInboundAttachments:()=>resolveInboundAttachments,resolveAndPrepend:()=>resolveAndPrepend,prependPathRefs:()=>prependPathRefs,extractInboundAttachments:()=>extractInboundAttachments});
function NGe(e){logForDebugging(`[bridge:inbound-attach] ${e}`)}
function extractInboundAttachments(e){if(typeof e!=="object"||e===null||!("file_attachments"in e))return[];let t=FMm().safeParse(e.file_attachments);return t.success?t.data:[]}
function BMm(e){return T7t.basename(e).replace(/[^a-zA-Z0-9._-]/g,"_")||"attachment"}
function UMm(){return T7t.join(or(),"uploads",getSessionId())}
async function $Mm(e){let t=getBridgeAccessToken();if(!t){NGe("skip: no oauth token");return}let n;try{let a=`${getBridgeBaseUrl()}/api/oauth/files/${encodeURIComponent(e.file_uuid)}/content`,l=await ho.get(a,{headers:{Authorization:`Bearer ${t}`},responseType:"arraybuffer",timeout:MMm,validateStatus:()=>!0});if(l.status!==200){NGe(`fetch ${e.file_uuid} failed: status=${l.status}`);return}n=Buffer.from(l.data)}catch(a){NGe(`fetch ${e.file_uuid} threw: ${a}`);return}let r=BMm(e.file_name),o=(e.file_uuid.slice(0,8)||e7l.randomUUID().slice(0,8)).replace(/[^a-zA-Z0-9_-]/g,"_"),s=UMm(),i=T7t.join(s,`${o}-${r}`);try{await $Zn.mkdir(s,{recursive:!0}),await $Zn.writeFile(i,n)}catch(a){NGe(`write ${i} failed: ${a}`);return}return NGe(`resolved ${e.file_uuid} \u2192 ${i} (${n.length} bytes)`),i}
async function resolveInboundAttachments(e){if(e.length===0)return"";if(NGe(`resolving ${e.length} attachment(s)`),!getBridgeAccessToken())return NGe("skip: no oauth token"),Pt("bridge_attachment_resolve","no_token"),"";let n=(await Promise.all(e.map($Mm))).filter((r)=>r!==void 0);if(n.length===0)return xe("bridge_attachment_resolve","all_failed"),"";if(n.length<e.length)Pt("bridge_attachment_resolve","partial_failed");else He("bridge_attachment_resolve");return n.map((r)=>`@"${r}"`).join(" ")+" "}
function prependPathRefs(e,t){if(!t)return e;if(typeof e==="string")return t+e;let n=e.findLastIndex((r)=>r.type==="text");if(n!==-1){let r=e[n];if(r.type==="text")return[...e.slice(0,n),{...r,text:t+r.text},...e.slice(n+1)]}return[...e,{type:"text",text:t.trimEnd()}]}
async function resolveAndPrepend(e,t){let n=extractInboundAttachments(e);if(n.length===0)return t;let r=await resolveInboundAttachments(n);return prependPathRefs(t,r)}
var e7l,$Zn,T7t,MMm=30000,NMm,FMm;
var BNo=b(()=>{ap();Qr();lt();mn();qe();dn();BY();e7l=require("crypto"),$Zn=require("fs/promises"),T7t=require("path");NMm=ve(()=>C.object({file_uuid:C.string(),file_name:C.string(),is_image:C.boolean().nullish()})),FMm=ve(()=>C.array(NMm()))});
export {r7l,NGe,extractInboundAttachments,BMm,UMm,$Mm,resolveInboundAttachments,prependPathRefs,resolveAndPrepend,e7l,$Zn,T7t,MMm,NMm,FMm,BNo};
