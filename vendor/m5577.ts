// @ts-nocheck
import {je,d4} from "./m2462.ts";
import {GUo,Aac} from "../src/tui/5576_summarizeEvent.ts";
import {kyt,_zt} from "../src/config/5574_applyFleetViewHostWindowsEnv.ts";
import {Azt,Czt} from "./m5576.ts";
import {Hz,Pf} from "../src/agent/2591_level.ts";
import {withTimeout} from "../src/telemetry/1488_withTimeout.ts";
import {flushSessionStorage,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {claimShutdown,releaseShutdownClaim,gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {du,iw} from "./m2302.ts";
import {getBaseRenderOptions,qee} from "../src/telemetry/3372_getBaseRenderOptions.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function VUo(){return Promise.all([Promise.resolve().then(() => (je(),d4)),Promise.resolve().then(() => (GUo(),Aac)),Promise.resolve().then(() => (kyt(),_zt)),Promise.resolve().then(() => (Azt(),Czt))])}
async function Rac(e,t){let n=Hz().catch(()=>[]);await withTimeout(flushSessionStorage(),2000,"flush timeout").catch(()=>{});let r=setInterval(()=>{},1073741824);claimShutdown(),du.get(process.stdout)?.unmount(),await new Promise((u)=>setImmediate(u)),releaseShutdownClaim(),process.env.CLAUDE_AGENTS_SELECT=e;let[{createRoot:o},{seedLastJobs:s},{applyFleetViewHostWindowsEnv:i},{mountFleetViewWithComposerBack:a}]=await(t??VUo());i();let l=await o(getBaseRenderOptions(!1));clearInterval(r);let c=await withTimeout(n,50,"listJobs seed").catch(()=>null);if(c!==null)s(c);logForDebugging("[PERF:bg-leftarrow-mounted]"),await a(l),await gracefulShutdown(0,"other",{suppressResumeHint:!0}),process.exit(0)}
var vac=b(()=>{iw();Pf();qe();isAmberSentinelEnabled();qee();_a()});
export {VUo,Rac,vac};
