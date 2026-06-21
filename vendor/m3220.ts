// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {u9,Uee,XHn} from "../src/computer-use/3211_level.ts";
import {sra,ira} from "./m3219.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {nIn,fzr} from "./m3215.ts";
import {cot,uot} from "../src/telemetry/3213_enabled.ts";
import {XKr} from "../src/computer-use/3206_apps.ts";
import {Q$e} from "../src/tools/3205_type.ts";
import {XV,YT} from "../src/tools/0323_ttl.ts";
import {enableConfigs,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {initializeAnalyticsSink,Bhe} from "../src/telemetry/3219_createLinkedTransportPair.ts";
import {lMe,mZt} from "./m431.ts";
import {shutdown1PEventLogging,I1} from "../src/session/2197_shutdown1PEventLogging.ts";
import {shutdownDatadog,iZ} from "../src/permissions/5195_trackDatadogEvent.ts";
import {aot} from "./m3206.ts";
var Szr={};
isFullscreenWithTTY(Szr,{runComputerUseMcpServer:()=>runComputerUseMcpServer,createComputerUseMcpServerForCli:()=>createComputerUseMcpServerForCli});
async function bqd(){try{let e=u9(),t=await Uee(()=>e.apps.listInstalled(),ara);return sra(t,lra.homedir())}catch{logForDebugging(`[Computer Use MCP] app enumeration exceeded ${ara}ms or failed; tool description omits list`);return}}
async function createComputerUseMcpServerForCli(){let e=nIn(),t=cot(),n=XKr(e,t),r=await bqd(),o=Q$e(e.executor.capabilities,t,r);return n.setRequestHandler(XV,async()=>e.isDisabled()?{tools:[]}:{tools:o}),n}
async function runComputerUseMcpServer(){enableConfigs(),initializeAnalyticsSink();let e=await createComputerUseMcpServerForCli(),t=new lMe,n=!1,r=async()=>{if(n)return;n=!0,await Promise.all([shutdown1PEventLogging(),shutdownDatadog()]),process.exit(0)};process.stdin.on("end",()=>void r()),process.stdin.on("error",()=>void r()),logForDebugging("[Computer Use MCP] Starting MCP server"),await e.connect(t),logForDebugging("[Computer Use MCP] MCP server started")}
var lra,ara=1000;
var bzr=b(()=>{aot();mZt();YT();iZ();I1();Bhe();Qn();qe();ira();XHn();uot();fzr();lra=require("os")});
export {Szr,bqd,createComputerUseMcpServerForCli,runComputerUseMcpServer,lra,ara,bzr};
