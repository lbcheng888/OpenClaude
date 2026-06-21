// @ts-nocheck
import {Ul,ln} from "../src/telemetry/0594_feature_name.ts";
import {Rft,RRo,xRo} from "./m5060.ts";
import {sv} from "./m434.ts";
import {M8t,a7n} from "./m5061.ts";
import {Bhe,mot} from "../src/telemetry/3219_createLinkedTransportPair.ts";
import {getBridgeTokenOverride,tJ} from "./m4224.ts";
import {BRIDGE_LOGIN_ERROR} from "../src/core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {w7n,v7n} from "../src/permissions/5093_runBridgeLoop.ts";
import {nDn} from "./m3327.ts";
import {b} from "../runtime.ts";
import {B3} from "./m453.ts";
import {Xr} from "./m321.ts";
import {U2,EXTERNAL_PERMISSION_MODES} from "./m716.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
async function R7n(e,t){return Ul("daemon_rc_add",async()=>{let n="added";return await Rft((r)=>{let o=RRo(r.remoteControl),s=o.findIndex((i)=>i.dir===e.dir);if(s>=0){let i=sv(e,(a)=>a!==void 0);o[s]={...o[s],...i},n="updated"}else o.push(e),n="added";r.remoteControl=o},t),n})}
async function x7n(e,t){return Ul("daemon_rc_remove",async()=>{await Rft((n)=>{let r=RRo(n.remoteControl),o=r.filter((s)=>s.dir!==e);if(o.length===r.length)return!1;if(o.length===0)delete n.remoteControl;else n.remoteControl=o},t)})}
var yxo,NDl=async(e,t,n,r)=>{let o=yxo().parse(e),{initializeErrorLogSink:s}=await Promise.resolve().then(() => (M8t(),a7n)),{initializeAnalyticsSink:i}=await Promise.resolve().then(() => (Bhe(),mot));s(),i();let a=()=>getBridgeTokenOverride()??r.getAccessToken();if(!a())n(BRIDGE_LOGIN_ERROR),process.exit(1);let{runBridgeHeadless:l,BridgeHeadlessPermanentError:c}=await Promise.resolve().then(() => (w7n(),v7n));try{await l({dir:o.dir,name:o.name,spawnMode:o.spawnMode,capacity:o.capacity,permissionMode:o.permissionMode,sandbox:o.sandbox,createSessionOnStart:o.createSessionOnStart,getAccessToken:a,onAuth401:r.reportAuth401,log:n},t)}catch(u){if(u instanceof c)n(u.message),process.exit(nDn);throw u}};
var k7n=b(()=>{B3();Xr();tJ();ln();U2();xRo();yxo=we(()=>E.object({dir:E.string(),name:E.string().optional(),spawnMode:E.enum(["same-dir","worktree"]).default("same-dir"),capacity:E.number().int().positive().default(32),permissionMode:E.enum(EXTERNAL_PERMISSION_MODES).optional(),sandbox:E.boolean().default(!1),sessionTimeoutSeconds:E.number().int().positive().optional(),createSessionOnStart:E.boolean().default(!1)}).strict())});
export {R7n,x7n,yxo,NDl,k7n};
