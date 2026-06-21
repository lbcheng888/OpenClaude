// @ts-nocheck
import {x0,mg} from "../src/agent/2580_level.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {Rh,c8,ok} from "./m633.ts";
import {wN,$He} from "./m3864.ts";
import {Ul,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var z8l=3;
function tXn(e){let t=Y8l.createHash("sha256").update(e).digest("hex").slice(0,8);return $Oo.join(x0(),`.draft-${t}`)}
function X8l(e){return Le({...e,ts:Date.now()})}
async function nXn(e,t){try{await GPe.mkdir(x0(),{recursive:!0}),await Rh(tXn(e),X8l(t))}catch{}}
function Q8l(e,t){try{c8(tXn(e),X8l(t))}catch{}}
async function Z8l(e){await GPe.unlink(tXn(e)).catch(()=>{})}
async function t5l(e){let t=await wN(tXn(e),8388608);if(t===null)return;let n;try{n=e5l().safeParse(qt(t))}catch{return}if(!n.success)return;let{q:r,collapsed:o,ts:s}=n.data;if(Date.now()-s>J8l)return;return{q:r,collapsed:o??[]}}
async function rXn(){return Ul("job_sweep_drafts",async()=>{let e;try{e=await GPe.readdir(x0())}catch{return}let t=Date.now();await Promise.all(e.filter((n)=>n.startsWith(".draft-")).map(async(n)=>{let r=$Oo.join(x0(),n),o=await wN(r,8388608);if(o!==null)try{let s=e5l().safeParse(qt(o));if(s.success&&t-s.data.ts<=J8l)return}catch{}await GPe.rm(r,{recursive:!0,force:!0}).catch(()=>{})}))})}
var Y8l,GPe,$Oo,J8l=86400000,e5l;
var qOo=b(()=>{Xr();ln();ok();$He();Xt();mg();Y8l=require("crypto"),GPe=require("fs/promises"),$Oo=require("path");e5l=we(()=>E.object({q:E.string(),collapsed:E.array(E.string()).optional(),ts:E.number()}))});
export {z8l,tXn,X8l,nXn,Q8l,Z8l,t5l,rXn,Y8l,GPe,$Oo,J8l,e5l,qOo};
