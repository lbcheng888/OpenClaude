// @ts-nocheck
import {useIsScreenReaderEnabled,Jve} from "./m2444.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {getCurrentProjectConfig,saveCurrentProjectConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Yxt,vu} from "../src/mcp/2200_mcpServerName.ts";
import {Udn,RM} from "./m1289.ts";
import {q0e,K9t,V$} from "../src/telemetry/3911_contextWindow.ts";
import {isShuttingDown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function lXl(e){let t=useIsScreenReaderEnabled();aXl.useEffect(()=>{if(getIsRemoteMode())return;let n=getCurrentProjectConfig(),r=Yxt();if(n.lastGracefulShutdown!==!1||n.lastVersionBase!==r)saveCurrentProjectConfig((s)=>({...s,lastGracefulShutdown:!1,lastVersionBase:r}));let o=()=>{if(Udn()){let s=t?"Cost: ":"";process.stdout.write(`
`+s+q0e()+`
`)}K9t(e?.())};return process.on("exit",o),()=>{if(isShuttingDown())K9t(e?.());process.off("exit",o)}},[t])}
var aXl;
var cXl=b(()=>{lt();V$();Jve();vu();RM();tr();isAmberSentinelEnabled();aXl=x(et(),1)});
export {lXl,aXl,cXl};
