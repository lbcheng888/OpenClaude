// @ts-nocheck
import {ze,_F} from "./m2452.ts";
import {zGt,KGt} from "../src/tui/5539_summarizeEvent.ts";
import {cht,qGt} from "../src/config/5537_applyFleetViewHostWindowsEnv.ts";
import {nz,mg} from "../src/agent/2580_level.ts";
import {withTimeout} from "../src/telemetry/1483_withTimeout.ts";
import {flushSessionStorage,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {claimShutdown,releaseShutdownClaim,gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {qu,bk} from "./m2291.ts";
import {getBaseRenderOptions,zee} from "../src/telemetry/3356_getBaseRenderOptions.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function SMo(){return Promise.all([Promise.resolve().then(() => (ze(),_F)),Promise.resolve().then(() => (zGt(),KGt)),Promise.resolve().then(() => (cht(),qGt))])}
async function BQl(e,t){let n=nz().catch(()=>[]);await withTimeout(flushSessionStorage(),2000,"flush timeout").catch(()=>{});let r=setInterval(()=>{},1073741824);claimShutdown(),qu.get(process.stdout)?.unmount(),await new Promise((u)=>setImmediate(u)),releaseShutdownClaim(),process.env.CLAUDE_AGENTS_SELECT=e;let[{createRoot:o},{mountFleetView:s,seedLastJobs:i},{applyFleetViewHostWindowsEnv:a}]=await(t??SMo());a();let l=await o(getBaseRenderOptions(!1));clearInterval(r);let c=await withTimeout(n,50,"listJobs seed").catch(()=>null);if(c!==null)i(c);logForDebugging("[PERF:bg-leftarrow-mounted]"),await s(l),await gracefulShutdown(0,"other",{suppressResumeHint:!0}),process.exit(0)}
var FQl=b(()=>{bk();mg();qe();ym();zee();ja()});
export {SMo,BQl,FQl};
