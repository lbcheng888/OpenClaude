// @ts-nocheck
import {jRn,J2} from "../src/session/2532_id.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function CNm(){let e=Date.now();if(GGe&&e-xzl<ENm)return GGe;let t=[],n=new Set;try{for await(let r of jRn()){if(r.display&&r.display.startsWith("!")){let o=r.display.slice(1).trim();if(o&&!n.has(o))n.add(o),t.push(o)}if(t.length>=50)break}}catch(r){logForDebugging(`Failed to read shell history: ${r}`)}return GGe=t,xzl=e,t}
function Dzl(e){if(!GGe)return;let t=GGe.indexOf(e);if(t!==-1)GGe.splice(t,1);GGe.unshift(e)}
async function Pzl(e){if(!e||e.length<2)return null;if(!e.trim())return null;let n=await CNm();for(let r of n)if(r.startsWith(e)&&r!==e)return{fullCommand:r,suffix:r.slice(e.length)};return null}
var GGe=null,xzl=0,ENm=60000;
var uFo=b(()=>{J2();qe()});
export {CNm,Dzl,Pzl,GGe,xzl,ENm,uFo};
