// @ts-nocheck
import {Nee,O0} from "../src/tools/3222_name.ts";
import {isTmuxControlMode,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {_o,bt} from "./m195.ts";
import {CLAUDE_IN_CHROME_MCP_SERVER_NAME,oL} from "../src/mcp/2581_trackClaudeInChromeTabId.ts";
import {b,M} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function jec(e,t){let n=qec.c(6);nVt.useRef(void 0);let r;if(n[0]!==e)r=[e],n[0]=e,n[1]=r;else r=n[1];nVt.useEffect(Y2m,r);let o,s;if(n[2]!==e||n[3]!==t)o=()=>{let i=J2m(e);if(!i)return;Nee("set_permission_mode",{mode:t==="bypassPermissions"?"skip_all_permission_checks":"ask"},i).then(z2m).catch(K2m)},s=[e,t],n[2]=e,n[3]=t,n[4]=o,n[5]=s;else o=n[4],s=n[5];nVt.useEffect(o,s)}
function K2m(e){isTmuxControlMode("chrome_permission_sync","set_mode_failed"),logForDebugging(`claude-in-chrome set_permission_mode failed: ${_o(e).message}`,{level:"error"})}
function z2m(){return Ie("chrome_permission_sync")}
function Y2m(){}
function J2m(e){return e.find((t)=>t.type==="connected"&&t.name===CLAUDE_IN_CHROME_MCP_SERVER_NAME)}
var qec,nVt,cib;
var Wec=b(()=>{qe();bt();Xr();ln();O0();oL();qec=M(rt(),1),nVt=M(Te(),1),cib=we(()=>E.object({method:E.literal("notifications/message"),params:E.object({prompt:E.string(),image:E.object({type:E.literal("base64"),media_type:E.enum(["image/jpeg","image/png","image/gif","image/webp"]),data:E.string()}).optional(),tabId:E.number().optional()})}))});
export {jec,K2m,z2m,Y2m,J2m,qec,nVt,cib,Wec};
