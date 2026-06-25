// @ts-nocheck
import {Ymc,jmc} from "./m5694.ts";
import {FL,_Ve,i$o} from "../src/config/5694_hasCompletedOnboarding.ts";
import {BIo,J0l} from "../src/tui/4910_TeleportResumeWrapper.ts";
import {Qmc,Xmc} from "./m5695.ts";
import {ofc,rfc} from "../src/tui/5698_parsePrIdentifier.ts";
import {hNo,fNo} from "./m5302.ts";
import {KeybindingSetup,WW} from "./m3362.ts";
import {b,x} from "../runtime.ts";
import {oe} from "./m2275.ts";
async function sfc(e,t){let{InvalidSettingsDialog:n}=await Promise.resolve().then(() => (Ymc(),jmc));return FL(e,(r)=>JSe.jsx(n,{settingsErrors:t.settingsErrors,onContinue:()=>r(void 0),onFix:()=>r("fix"),onExit:t.onExit}))}
async function ifc(e){let{TeleportResumeWrapper:t}=await Promise.resolve().then(() => (BIo(),J0l));return FL(e,(n)=>JSe.jsx(t,{onComplete:n,onCancel:()=>n(null),source:"cliArg"}))}
async function afc(e,t){let{TeleportRepoMismatchDialog:n}=await Promise.resolve().then(() => (Qmc(),Xmc));return FL(e,(r)=>JSe.jsx(n,{targetRepo:t.targetRepo,initialPaths:t.initialPaths,onSelectPath:r,onCancel:()=>r(null)}))}
async function lfc(e,t,n,r){let[o,{ResumeConversation:s},{App:i}]=await Promise.all([n,Promise.resolve().then(() => (ofc(),rfc)),Promise.resolve().then(() => (hNo(),fNo))]);await _Ve(e,JSe.jsx(i,{getFpsMetrics:t.getFpsMetrics,stats:t.stats,initialState:t.initialState,children:JSe.jsx(KeybindingSetup,{children:JSe.jsx(s,{...r,worktreePaths:o})})}))}
var JSe;
var cfc=b(()=>{i$o();WW();JSe=x(oe(),1)});
export {sfc,ifc,afc,lfc,JSe,cfc};
