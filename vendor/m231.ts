// @ts-nocheck
import {ft,b} from "../runtime.ts";
var Z8o={};
ft(Z8o,{setBgExitCause:()=>setBgExitCause,readAndClearBgExitCause:()=>readAndClearBgExitCause});
function setBgExitCause(e,t){let n=t??process.env.CLAUDE_JOB_DIR;if(!n)return;try{Lre.writeFileSync(Ecr.join(n,Q8o),e)}catch{}}
function readAndClearBgExitCause(e){let t=Ecr.join(e,Q8o);try{let n=Lre.lstatSync(t);if(!n.isFile()||n.size>65536){try{Lre.rmSync(t,{recursive:!0,force:!0})}catch{}return}let r=Lre.readFileSync(t,"utf8");return Lre.unlinkSync(t),r}catch{return}}
var Lre,Ecr,Q8o="exit-cause";
var mK=b(()=>{Lre=require("fs"),Ecr=require("path")});
export {Z8o,setBgExitCause,readAndClearBgExitCause,Lre,Ecr,Q8o,mK};
