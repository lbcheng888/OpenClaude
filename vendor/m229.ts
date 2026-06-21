// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
var o3o={};
isFullscreenWithTTY(o3o,{setBgExitCause:()=>setBgExitCause,readAndClearBgExitCause:()=>readAndClearBgExitCause});
function setBgExitCause(e,t){let n=t??process.env.CLAUDE_JOB_DIR;if(!n)return;try{Nre.writeFileSync(zor.join(n,r3o),e)}catch{}}
function readAndClearBgExitCause(e){let t=zor.join(e,r3o);try{let n=Nre.lstatSync(t);if(!n.isFile()||n.size>65536){try{Nre.rmSync(t,{recursive:!0,force:!0})}catch{}return}let r=Nre.readFileSync(t,"utf8");return Nre.unlinkSync(t),r}catch{return}}
var Nre,zor,r3o="exit-cause";
var qV=b(()=>{Nre=require("fs"),zor=require("path")});
export {o3o,setBgExitCause,readAndClearBgExitCause,Nre,zor,r3o,qV};
