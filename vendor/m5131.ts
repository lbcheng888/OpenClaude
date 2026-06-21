// @ts-nocheck
import {_t,cu} from "./m582.ts";
import {setBgExitCause,qV} from "./m229.ts";
import {ym,yNt} from "../src/config/3332_flushAnalyticsSinks.ts";
import {b} from "../runtime.ts";
function T8e(e){console.error(_t.red(e))}
function Fs(e){if(e)T8e(e);setBgExitCause("cli_error"),process.exit(1);return}
function vI(e){if(e)process.stdout.write(e+`
`);process.exit(0);return}
async function APe(e){await new Promise((t)=>{process.stdout.write(e,()=>t())})}
function uj(e){process.stderr.write(_t.yellow(e)+`
`)}
async function hko(){let{flushAnalyticsSinks:e}=await Promise.resolve().then(() => (ym(),yNt));await e()}
async function X9(e){await hko(),process.exit(e);return}
async function Lx(e){return await hko(),Fs(e)}
async function hPe(e){if(e)process.stdout.write(e+`
`);return await hko(),vI()}
var qU=b(()=>{cu();qV()});
export {T8e,Fs,vI,APe,uj,hko,X9,Lx,hPe,qU};
