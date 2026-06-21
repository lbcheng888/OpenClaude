// @ts-nocheck
import {isc,ssc} from "./m5656.ts";
import {CM,k5e,O1o} from "../src/tui/5656_hasCompletedOnboarding.ts";
import {bvo,qEl} from "../src/tui/4880_TeleportResumeWrapper.ts";
import {csc,lsc} from "./m5657.ts";
import {Asc,fsc} from "../src/tui/5660_parsePrIdentifier.ts";
import {jDo,qDo} from "./m5266.ts";
import {KeybindingSetup,xW} from "./m3346.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
async function hsc(e,t){let{InvalidSettingsDialog:n}=await Promise.resolve().then(() => (isc(),ssc));return CM(e,(r)=>H5e.default.createElement(n,{settingsErrors:t.settingsErrors,onContinue:()=>r(void 0),onFix:()=>r("fix"),onExit:t.onExit}))}
async function gsc(e){let{TeleportResumeWrapper:t}=await Promise.resolve().then(() => (bvo(),qEl));return CM(e,(n)=>H5e.default.createElement(t,{onComplete:n,onCancel:()=>n(null),source:"cliArg"}))}
async function _sc(e,t){let{TeleportRepoMismatchDialog:n}=await Promise.resolve().then(() => (csc(),lsc));return CM(e,(r)=>H5e.default.createElement(n,{targetRepo:t.targetRepo,initialPaths:t.initialPaths,onSelectPath:r,onCancel:()=>r(null)}))}
async function ysc(e,t,n,r){let[o,{ResumeConversation:s},{App:i}]=await Promise.all([n,Promise.resolve().then(() => (Asc(),fsc)),Promise.resolve().then(() => (jDo(),qDo))]);await k5e(e,H5e.default.createElement(i,{getFpsMetrics:t.getFpsMetrics,stats:t.stats,initialState:t.initialState},H5e.default.createElement(KeybindingSetup,null,H5e.default.createElement(s,{...r,worktreePaths:o}))))}
var H5e;
var Tsc=b(()=>{O1o();xW();H5e=M(Te(),1)});
export {hsc,gsc,_sc,ysc,H5e,Tsc};
