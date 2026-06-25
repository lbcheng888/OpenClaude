// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {L$,Pee,qDn} from "../src/computer-use/3227_level.ts";
import {uua,dua} from "./m3235.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {zDn,JQr} from "./m3231.ts";
import {cit,uit} from "../src/telemetry/3229_enabled.ts";
import {PQr} from "../src/computer-use/3222_apps.ts";
import {i3e} from "../src/tools/3221_type.ts";
import {EK,Qy} from "../src/tools/0325_ttl.ts";
import {enableConfigs,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {initializeAnalyticsSink,Jge} from "../src/telemetry/3235_createLinkedTransportPair.ts";
import {t1e,Ktn} from "./m433.ts";
import {shutdown1PEventLogging,GM} from "../src/session/2203_shutdown1PEventLogging.ts";
import {shutdownDatadog,Q7} from "../src/permissions/5229_trackDatadogEvent.ts";
import {ait} from "./m3222.ts";
var oZr={};
ft(oZr,{runComputerUseMcpServer:()=>runComputerUseMcpServer,createComputerUseMcpServerForCli:()=>createComputerUseMcpServerForCli});
async function aYd(){try{let e=L$(),t=await Pee(()=>e.apps.listInstalled(),pua);return uua(t,mua.homedir())}catch{logForDebugging(`[Computer Use MCP] app enumeration exceeded ${pua}ms or failed; tool description omits list`);return}}
async function createComputerUseMcpServerForCli(){let e=zDn(),t=cit(),n=PQr(e,t),r=await aYd(),o=i3e(e.executor.capabilities,t,r);return n.setRequestHandler(EK,async()=>e.isDisabled()?{tools:[]}:{tools:o}),n}
async function runComputerUseMcpServer(){enableConfigs(),initializeAnalyticsSink();let e=await createComputerUseMcpServerForCli(),t=new t1e,n=!1,r=async()=>{if(n)return;n=!0,await Promise.all([shutdown1PEventLogging(),shutdownDatadog()]),process.exit(0)};process.stdin.on("end",()=>void r()),process.stdin.on("error",()=>void r()),logForDebugging("[Computer Use MCP] Starting MCP server"),await e.connect(t),logForDebugging("[Computer Use MCP] MCP server started")}
var mua,pua=1000;
var sZr=b(()=>{ait();Ktn();Qy();Q7();GM();Jge();tr();qe();dua();qDn();uit();JQr();mua=require("os")});
export {oZr,aYd,createComputerUseMcpServerForCli,runComputerUseMcpServer,mua,pua,sZr};
