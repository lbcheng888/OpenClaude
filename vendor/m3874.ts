// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {RB,Y_e} from "./m3873.ts";
import {setBgExitCause,mK} from "./m231.ts";
var Eqe={};
ft(Eqe,{severTtyInputForRelaunch:()=>severTtyInputForRelaunch,execRelaunch:()=>execRelaunch});
function severTtyInputForRelaunch(){for(let e=0;e<32;e++){if(e===1||e===2)continue;try{if(RNa.isatty(e))CNa.closeSync(e)}catch{}}}
async function execRelaunch(){await new Promise((s)=>setImmediate(s));let{cmd:e,prefixArgs:t}=RB(),n=process.argv.slice(2),r=ENa.spawn(e,[...t,...n],{stdio:"inherit",env:process.env});severTtyInputForRelaunch();let o=["SIGINT","SIGTERM","SIGHUP"];for(let s of o)process.on(s,()=>{try{r.kill(s)}catch{}});return new Promise(()=>{r.on("close",(s,i)=>{let a=i?128+(ANa.constants.signals[i]??0):0;process.exit(s??a)}),r.on("error",(s)=>{process.stderr.write(`Failed to relaunch Claude Code: ${s.message}
`),setBgExitCause("relaunch_child_error"),process.exit(1)})})}
var ENa,CNa,ANa,RNa;
var Cqe=b(()=>{mK();Y_e();ENa=require("child_process"),CNa=require("fs"),ANa=require("os"),RNa=require("tty")});
export {Eqe,severTtyInputForRelaunch,execRelaunch,ENa,CNa,ANa,RNa,Cqe};
