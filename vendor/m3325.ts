// @ts-nocheck
import {Ie,isTmuxControlMode,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function ZWd(e){if(e===void 0||e===null)return"UNSPECIFIED";if(typeof e==="number")return QWd[e]??"UNSPECIFIED";if(typeof e!=="string")return"UNSPECIFIED";let t=e.startsWith(lca)?e.slice(lca.length):e;return XWd.find((n)=>n===t)??"UNSPECIFIED"}
function eGd(e,t){if(e==="SERVICE_VOUCHED")return!0;let n=VJr.findIndex((r)=>r===e);return n!==-1&&n<=VJr.indexOf(t)}
function cca(e){let t=nGd().safeParse(e);return{enforce:!0,acceptLevel:t.success?t.data.accept_level:"VERIFIED",acceptStatuses:new Set(t.success?t.data.accept_statuses:[])}}
function gst(e){uca=e}
function KJr(e){dca=e}
function Q0n(e){let t=typeof e.payload?.type==="string"?e.payload.type:e.event_type,n=t==="user"||t==="control_response",r=ZWd(e.device_attestation_status),o=uca?.()??X0n;if(eGd(r,o.acceptLevel)){if(n)Ie("bridge_event_attestation");return!1}if(!o.enforce){if(r==="UNSPECIFIED")return!1;if(n)logForDebugging(`[bridge:attestation] accepting unverified ${t} event_id=${e.event_id} status=${r}`,{level:"info"}),isTmuxControlMode("bridge_event_attestation",`${r.toLowerCase()}_${t}`);return!1}let s=o.acceptStatuses.has(r);if(n){let i=`${r.toLowerCase()}_${t}`;if(logForDebugging(`[bridge:attestation] ${s?"accepting (config exception)":"DROPPING"} unverified ${t} event_id=${e.event_id} status=${r}`,{level:s?"info":"warn"}),s)isTmuxControlMode("bridge_event_attestation",i);else{Oe("bridge_event_attestation",i);try{dca?.({status:r,payloadType:t})}catch(a){logForDebugging(`[bridge:attestation] drop notifier threw: ${Se(a)}`,{level:"error"})}}}return!s}
var XWd,lca="DEVICE_ATTESTATION_STATUS_",QWd,VJr,X0n,tGd,nGd,uca,dca;
var v9e=b(()=>{Xr();ln();qe();bt();XWd=["UNSPECIFIED","ABSENT","VERIFIED","VERIFIED_BY_GATE","INVALID","UNCHECKED","VERIFIED_KEYLESS_DEVICE","SERVICE_VOUCHED"],QWd=["UNSPECIFIED","ABSENT","VERIFIED","VERIFIED_BY_GATE","INVALID","UNCHECKED"];VJr=["VERIFIED","VERIFIED_KEYLESS_DEVICE","VERIFIED_BY_GATE"];X0n={enforce:!1,acceptLevel:"VERIFIED",acceptStatuses:new Set},tGd=["UNSPECIFIED","ABSENT","INVALID","UNCHECKED"],nGd=we(()=>E.object({accept_level:E.enum(VJr).default("VERIFIED"),accept_statuses:E.array(E.enum(tGd)).default([])}))});
export {ZWd,eGd,cca,gst,KJr,Q0n,XWd,lca,QWd,VJr,X0n,tGd,nGd,uca,dca,v9e};
