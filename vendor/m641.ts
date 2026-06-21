// @ts-nocheck
import {E7e,C7e} from "./m638.ts";
import {A_,ng} from "./m132.ts";
import {b} from "../runtime.ts";
async function d8(e){let t=E7e("git");if(t===null)return[];try{let{stdout:n}=await Ezc(t,["worktree","list","--porcelain"],{cwd:e,timeout:5000,windowsHide:!0});if(!n)return[];return n.split(`
`).filter((r)=>r.startsWith("worktree ")).map((r)=>A_(r.slice(9)))}catch{return[]}}
var qXo,jXo,Ezc;
var WMe=b(()=>{ng();C7e();qXo=require("child_process"),jXo=require("util"),Ezc=jXo.promisify(qXo.execFile)});
export {d8,qXo,jXo,Ezc,WMe};
