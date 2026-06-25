// @ts-nocheck
import {Sje,bje} from "./m644.ts";
import {A_,zf} from "./m133.ts";
import {b} from "../runtime.ts";
async function w5(e){let t=Sje("git");if(t===null)return[];try{let{stdout:n}=await Uou(t,["worktree","list","--porcelain"],{cwd:e,timeout:5000,windowsHide:!0});if(!n)return[];return n.split(`
`).filter((r)=>r.startsWith("worktree ")).map((r)=>A_(r.slice(9)))}catch{return[]}}
var Brs,Urs,Uou;
var N1e=b(()=>{zf();bje();Brs=require("child_process"),Urs=require("util"),Uou=Urs.promisify(Brs.execFile)});
export {w5,Brs,Urs,Uou,N1e};
