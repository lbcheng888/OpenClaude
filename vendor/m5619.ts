// @ts-nocheck
import {xee,ReactRuntime} from "../src/tools/3238_name.ts";
import {Pt,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {mo,Ct} from "./m197.ts";
import {CLAUDE_IN_CHROME_MCP_SERVER_NAME,bO} from "../src/mcp/2592_trackClaudeInChromeTabId.ts";
import {b,x} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function xcc(e,t){let n=Icc.c(6);Izt.useRef(void 0);let r;if(n[0]!==e)r=[e],n[0]=e,n[1]=r;else r=n[1];Izt.useEffect(AGm,r);let o,s;if(n[2]!==e||n[3]!==t)o=()=>{let i=RGm(e);if(!i)return;xee("set_permission_mode",{mode:t==="bypassPermissions"?"skip_all_permission_checks":"ask"},i).then(CGm).catch(EGm)},s=[e,t],n[2]=e,n[3]=t,n[4]=o,n[5]=s;else o=n[4],s=n[5];Izt.useEffect(o,s)}
function EGm(e){Pt("chrome_permission_sync","set_mode_failed"),logForDebugging(`claude-in-chrome set_permission_mode failed: ${mo(e).message}`,{level:"error"})}
function CGm(){return He("chrome_permission_sync")}
function AGm(){}
function RGm(e){return e.find((t)=>t.type==="connected"&&t.name===CLAUDE_IN_CHROME_MCP_SERVER_NAME)}
var Icc,Izt,mCE;
var Dcc=b(()=>{qe();Ct();Qr();mn();ReactRuntime();bO();Icc=x(tt(),1),Izt=x(et(),1),mCE=ve(()=>C.object({method:C.literal("notifications/message"),params:C.object({prompt:C.string(),image:C.object({type:C.literal("base64"),media_type:C.enum(["image/jpeg","image/png","image/gif","image/webp"]),data:C.string()}).optional(),tabId:C.number().optional()})}))});
export {xcc,EGm,CGm,AGm,RGm,Icc,Izt,mCE,Dcc};
