// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {sU,Pge} from "./m3855.ts";
import {setBgExitCause,qV} from "./m229.ts";
var xUt={};
isFullscreenWithTTY(xUt,{severTtyInputForRelaunch:()=>severTtyInputForRelaunch,execRelaunch:()=>execRelaunch});
function severTtyInputForRelaunch(){for(let e=0;e<32;e++){if(e===1||e===2)continue;try{if(ZIa.isatty(e))XIa.closeSync(e)}catch{}}}
async function execRelaunch(){await new Promise((s)=>setImmediate(s));let{cmd:e,prefixArgs:t}=sU(),n=process.argv.slice(2),r=JIa.spawn(e,[...t,...n],{stdio:"inherit",env:process.env});severTtyInputForRelaunch();let o=["SIGINT","SIGTERM","SIGHUP"];for(let s of o)process.on(s,()=>{try{r.kill(s)}catch{}});return new Promise(()=>{r.on("close",(s,i)=>{let a=i?128+(QIa.constants.signals[i]??0):0;process.exit(s??a)}),r.on("error",(s)=>{process.stderr.write(`Failed to relaunch Claude Code: ${s.message}
`),setBgExitCause("relaunch_child_error"),process.exit(1)})})}
var JIa,XIa,QIa,ZIa;
var kUt=b(()=>{qV();Pge();JIa=require("child_process"),XIa=require("fs"),QIa=require("os"),ZIa=require("tty")});
export {xUt,severTtyInputForRelaunch,execRelaunch,JIa,XIa,QIa,ZIa,kUt};
