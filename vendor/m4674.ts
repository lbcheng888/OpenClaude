// @ts-nocheck
import {Jo,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function krm(){return[wrm]}
async function Hrm(e,t){if(e.length===0)return t?.("[Claude in Chrome] No browser paths to check"),{isInstalled:!1,browser:null};let n=krm();for(let{browser:r,path:o}of e){let s=[];try{s=await kvo.readdir(o,{withFileTypes:!0})}catch(a){if(Jo(a))continue;throw a}let i=s.filter((a)=>a.isDirectory()).filter((a)=>a.name==="Default"||a.name.startsWith("Profile ")).map((a)=>a.name);if(i.length>0)t?.(`[Claude in Chrome] Found ${r} profiles: ${i.join(", ")}`);for(let a of i)for(let l of n){let c=gSl.join(o,a,"Extensions",l);try{return await kvo.readdir(c),t?.(`[Claude in Chrome] Extension ${l} found in ${r} ${a}`),{isInstalled:!0,browser:r}}catch{}}}return t?.("[Claude in Chrome] Extension not found in any browser"),{isInstalled:!1,browser:null}}
async function _Sl(e,t){return(await Hrm(e,t)).isInstalled}
var kvo,gSl,wrm="fcoeoabgfenejglbffodgkkbkcdhcgfn";
var ySl=b(()=>{Ct();kvo=require("fs/promises"),gSl=require("path")});
export {krm,Hrm,_Sl,kvo,gSl,wrm,ySl};
