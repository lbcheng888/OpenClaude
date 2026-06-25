// @ts-nocheck
import {bt,Gc} from "./m588.ts";
import {setBgExitCause,mK} from "./m231.ts";
import {isAmberSentinelEnabled,YBt} from "../src/config/3348_flushAnalyticsSinks.ts";
import {b} from "../runtime.ts";
function dGe(e){console.error(bt.red(e))}
function Rs(e){if(e)dGe(e);setBgExitCause("cli_error"),process.exit(1);return}
function ZI(e){if(e)process.stdout.write(e+`
`);process.exit(0);return}
async function fOe(e){await new Promise((t)=>{process.stdout.write(e,()=>t())})}
function B6(e){process.stderr.write(bt.yellow(e)+`
`)}
async function CPo(){let{flushAnalyticsSinks:e}=await Promise.resolve().then(() => (isAmberSentinelEnabled(),YBt));await e()}
async function gN(e){await CPo(),process.exit(e);return}
async function Qh(e){return await CPo(),Rs(e)}
async function createUserMessage(e){if(e)process.stdout.write(e+`
`);return await CPo(),ZI()}
var _N=b(()=>{Gc();mK()});
export {dGe,Rs,ZI,fOe,B6,CPo,gN,Qh,createUserMessage,_N};
