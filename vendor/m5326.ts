// @ts-nocheck
import {aEn,K4} from "../src/session/2521_id.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function zkm(){let e=Date.now();if(e5e&&e-Eql<Kkm)return e5e;let t=[],n=new Set;try{for await(let r of aEn()){if(r.display&&r.display.startsWith("!")){let o=r.display.slice(1).trim();if(o&&!n.has(o))n.add(o),t.push(o)}if(t.length>=50)break}}catch(r){logForDebugging(`Failed to read shell history: ${r}`)}return e5e=t,Eql=e,t}
function Cql(e){if(!e5e)return;let t=e5e.indexOf(e);if(t!==-1)e5e.splice(t,1);e5e.unshift(e)}
async function vql(e){if(!e||e.length<2)return null;if(!e.trim())return null;let n=await zkm();for(let r of n)if(r.startsWith(e)&&r!==e)return{fullCommand:r,suffix:r.slice(e.length)};return null}
var e5e=null,Eql=0,Kkm=60000;
var PPo=b(()=>{K4();qe()});
export {zkm,Cql,vql,e5e,Eql,Kkm,PPo};
