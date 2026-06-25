// @ts-nocheck
import {V0,Pf} from "../src/agent/2591_level.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {vf,R5,Pv} from "./m639.ts";
import {U1,x0e} from "../src/config/3883_x0e.ts";
import {Tl,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var DJl=3;
function ntr(e){let t=PJl.createHash("sha256").update(e).digest("hex").slice(0,8);return iBo.join(V0(),`.draft-${t}`)}
function LJl(e){return TeamDeleteToolName({...e,ts:Date.now()})}
async function rtr(e,t){try{await GOe.mkdir(V0(),{recursive:!0}),await vf(ntr(e),LJl(t))}catch{}}
function MJl(e,t){try{R5(ntr(e),LJl(t))}catch{}}
async function NJl(e){await GOe.unlink(ntr(e)).catch(()=>{})}
async function BJl(e){let t=await U1(ntr(e),8388608);if(t===null)return;let n;try{n=FJl().safeParse(qt(t))}catch{return}if(!n.success)return;let{q:r,collapsed:o,ts:s}=n.data;if(Date.now()-s>OJl)return;return{q:r,collapsed:o??[]}}
async function otr(){return Tl("job_sweep_drafts",async()=>{let e;try{e=await GOe.readdir(V0())}catch{return}let t=Date.now();await Promise.all(e.filter((n)=>n.startsWith(".draft-")).map(async(n)=>{let r=iBo.join(V0(),n),o=await U1(r,8388608);if(o!==null)try{let s=FJl().safeParse(qt(o));if(s.success&&t-s.data.ts<=OJl)return}catch{}await GOe.rm(r,{recursive:!0,force:!0}).catch(()=>{})}))})}
var PJl,GOe,iBo,OJl=86400000,FJl;
var aBo=b(()=>{Qr();mn();Pv();x0e();tn();Pf();PJl=require("crypto"),GOe=require("fs/promises"),iBo=require("path");FJl=ve(()=>C.object({q:C.string(),collapsed:C.array(C.string()).optional(),ts:C.number()}))});
export {DJl,ntr,LJl,rtr,MJl,NJl,BJl,otr,PJl,GOe,iBo,OJl,FJl,aBo};
