// @ts-nocheck
import {Tl,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ggt,Lxo,Mxo} from "./m5090.ts";
import {dA} from "./m436.ts";
import {sVt,eJn} from "./m5091.ts";
import {Jge,mit} from "../src/telemetry/3235_createLinkedTransportPair.ts";
import {getBridgeTokenOverride,BY} from "./m4242.ts";
import {BRIDGE_LOGIN_ERROR} from "../src/core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {TJn,yJn} from "../src/permissions/5123_runBridgeLoop.ts";
import {zOn} from "./m3343.ts";
import {b} from "../runtime.ts";
import {YU} from "./m459.ts";
import {Qr} from "./m323.ts";
import {jN,EXTERNAL_PERMISSION_MODES} from "./m721.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
async function SJn(e,t){return Tl("daemon_rc_add",async()=>{let n="added";return await Ggt((r)=>{let o=Lxo(r.remoteControl),s=o.findIndex((i)=>i.dir===e.dir);if(s>=0){let i=dA(e,(a)=>a!==void 0);o[s]={...o[s],...i},n="updated"}else o.push(e),n="added";r.remoteControl=o},t),n})}
async function bJn(e,t){return Tl("daemon_rc_remove",async()=>{await Ggt((n)=>{let r=Lxo(n.remoteControl),o=r.filter((s)=>s.dir!==e);if(o.length===r.length)return!1;if(o.length===0)delete n.remoteControl;else n.remoteControl=o},t)})}
var wDo,dUl=async(e,t,n,r)=>{let o=wDo().parse(e),{initializeErrorLogSink:s}=await Promise.resolve().then(() => (sVt(),eJn)),{initializeAnalyticsSink:i}=await Promise.resolve().then(() => (Jge(),mit));s(),i();let a=()=>getBridgeTokenOverride()??r.getAccessToken();if(!a())n(BRIDGE_LOGIN_ERROR),process.exit(1);let{runBridgeHeadless:l,BridgeHeadlessPermanentError:c}=await Promise.resolve().then(() => (TJn(),yJn));try{await l({dir:o.dir,name:o.name,spawnMode:o.spawnMode,capacity:o.capacity,permissionMode:o.permissionMode,sandbox:o.sandbox,createSessionOnStart:o.createSessionOnStart,getAccessToken:a,onAuth401:r.reportAuth401,log:n},t)}catch(u){if(u instanceof c)n(u.message),process.exit(zOn);throw u}};
var EJn=b(()=>{YU();Qr();BY();mn();jN();Mxo();wDo=ve(()=>C.object({dir:C.string(),name:C.string().optional(),spawnMode:C.enum(["same-dir","worktree"]).default("same-dir"),capacity:C.number().int().positive().default(32),permissionMode:C.enum(EXTERNAL_PERMISSION_MODES).optional(),sandbox:C.boolean().default(!1),sessionTimeoutSeconds:C.number().int().positive().optional(),createSessionOnStart:C.boolean().default(!1)}).strict())});
export {SJn,bJn,wDo,dUl,EJn};
