// @ts-nocheck
import {useIsScreenReaderEnabled,dwe} from "./m2434.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {getCurrentProjectConfig,saveCurrentProjectConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {bHt,$u} from "../src/mcp/2194_mcpServerName.ts";
import {ncn,LB} from "./m1284.ts";
import {EIe,D$t,H9} from "../src/telemetry/4045_contextWindow.ts";
import {Bk,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function C5l(e){let t=useIsScreenReaderEnabled();E5l.useEffect(()=>{if(getIsRemoteMode())return;let n=getCurrentProjectConfig(),r=bHt();if(n.lastGracefulShutdown!==!1||n.lastVersionBase!==r)saveCurrentProjectConfig((s)=>({...s,lastGracefulShutdown:!1,lastVersionBase:r}));let o=()=>{if(ncn()){let s=t?"Cost: ":"";process.stdout.write(`
`+s+EIe()+`
`)}D$t(e?.())};return process.on("exit",o),()=>{if(Bk())D$t(e?.());process.off("exit",o)}},[t])}
var E5l;
var v5l=b(()=>{lt();H9();dwe();$u();LB();Qn();ym();E5l=M(Te(),1)});
export {C5l,E5l,v5l};
