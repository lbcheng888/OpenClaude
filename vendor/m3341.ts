// @ts-nocheck
import {He,Pt,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function Uep(e){if(e===void 0||e===null)return"UNSPECIFIED";if(typeof e==="number")return Bep[e]??"UNSPECIFIED";if(typeof e!=="string")return"UNSPECIFIED";let t=e.startsWith(yga)?e.slice(yga.length):e;return Fep.find((n)=>n===t)??"UNSPECIFIED"}
function $ep(e,t){if(e==="SERVICE_VOUCHED")return!0;let n=kto.findIndex((r)=>r===e);return n!==-1&&n<=kto.indexOf(t)}
function Tga(e){let t=Wep().safeParse(e);return{enforce:!0,acceptLevel:t.success?t.data.accept_level:"VERIFIED",acceptStatuses:new Set(t.success?t.data.accept_statuses:[])}}
function gat(e){Sga=e}
function Hto(e){bga=e}
function WOn(e){let t=typeof e.payload?.type==="string"?e.payload.type:e.event_type,n=t==="user"||t==="control_response",r=Uep(e.device_attestation_status),o=Sga?.()??qOn;if($ep(r,o.acceptLevel)){if(n)He("bridge_event_attestation");return!1}if(!o.enforce){if(r==="UNSPECIFIED")return!1;if(n)logForDebugging(`[bridge:attestation] accepting unverified ${t} event_id=${e.event_id} status=${r}`,{level:"info"}),Pt("bridge_event_attestation",`${r.toLowerCase()}_${t}`);return!1}let s=o.acceptStatuses.has(r);if(n){let i=`${r.toLowerCase()}_${t}`;if(logForDebugging(`[bridge:attestation] ${s?"accepting (config exception)":"DROPPING"} unverified ${t} event_id=${e.event_id} status=${r}`,{level:s?"info":"warn"}),s)Pt("bridge_event_attestation",i);else{xe("bridge_event_attestation",i);try{bga?.({status:r,payloadType:t})}catch(a){logForDebugging(`[bridge:attestation] drop notifier threw: ${Ce(a)}`,{level:"error"})}}}return!s}
var Fep,yga="DEVICE_ATTESTATION_STATUS_",Bep,kto,qOn,qep,Wep,Sga,bga;
var M3e=b(()=>{Qr();mn();qe();Ct();Fep=["UNSPECIFIED","ABSENT","VERIFIED","VERIFIED_BY_GATE","INVALID","UNCHECKED","VERIFIED_KEYLESS_DEVICE","SERVICE_VOUCHED"],Bep=["UNSPECIFIED","ABSENT","VERIFIED","VERIFIED_BY_GATE","INVALID","UNCHECKED"];kto=["VERIFIED","VERIFIED_KEYLESS_DEVICE","VERIFIED_BY_GATE"];qOn={enforce:!1,acceptLevel:"VERIFIED",acceptStatuses:new Set},qep=["UNSPECIFIED","ABSENT","INVALID","UNCHECKED"],Wep=ve(()=>C.object({accept_level:C.enum(kto).default("VERIFIED"),accept_statuses:C.array(C.enum(qep)).default([])}))});
export {Uep,$ep,Tga,gat,Hto,WOn,Fep,yga,Bep,kto,qOn,qep,Wep,Sga,bga,M3e};
