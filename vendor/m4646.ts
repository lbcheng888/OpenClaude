// @ts-nocheck
import {ds,bt} from "./m195.ts";
import {b} from "../runtime.ts";
function wzp(){return[vzp]}
async function Rzp(e,t){if(e.length===0)return t?.("[Claude in Chrome] No browser paths to check"),{isInstalled:!1,browser:null};let n=wzp();for(let{browser:r,path:o}of e){let s=[];try{s=await fSo.readdir(o,{withFileTypes:!0})}catch(a){if(ds(a))continue;throw a}let i=s.filter((a)=>a.isDirectory()).filter((a)=>a.name==="Default"||a.name.startsWith("Profile ")).map((a)=>a.name);if(i.length>0)t?.(`[Claude in Chrome] Found ${r} profiles: ${i.join(", ")}`);for(let a of i)for(let l of n){let c=kpl.join(o,a,"Extensions",l);try{return await fSo.readdir(c),t?.(`[Claude in Chrome] Extension ${l} found in ${r} ${a}`),{isInstalled:!0,browser:r}}catch{}}}return t?.("[Claude in Chrome] Extension not found in any browser"),{isInstalled:!1,browser:null}}
async function Hpl(e,t){return(await Rzp(e,t)).isInstalled}
var fSo,kpl,vzp="fcoeoabgfenejglbffodgkkbkcdhcgfn";
var Ipl=b(()=>{bt();fSo=require("fs/promises"),kpl=require("path")});
export {wzp,Rzp,Hpl,fSo,kpl,vzp,Ipl};
