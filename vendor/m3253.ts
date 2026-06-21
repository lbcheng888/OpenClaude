// @ts-nocheck
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {wbe,J3} from "../src/artifact/0731_allow.ts";
import {iS,RK} from "./m2231.ts";
import {Oot,nI} from "./m3252.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {xh,mf} from "./m702.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {ci,pT} from "./m1289.ts";
import {ds,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Ev} from "./m2211.ts";
import {ik} from "../src/agent/0726_level.ts";
function Psa(e,t){if(t)return!0;return!1}
async function Osa(){if(hc("skills")||wbe.some((r)=>iS(r))||!Oot())return[];let e=[],t=Ake.join(tr(),"skills");if(xh("userSettings"))e.push({dir:t,scope:"user"});if(xh("projectSettings")){let r=Ake.join(getOriginalCwd(),".claude","skills"),o=(s)=>b1t.realpath(s).catch(()=>s);if(r!==t&&await o(r)!==await o(t))e.push({dir:r,scope:"project"})}let n=[];for(let{dir:r,scope:o}of e)try{if(o==="user"){let s=await ci().listEntries(r);for(let i of s)if(!i.isFile)n.push({dir:Ake.join(r,i.name),scope:o})}else{let s=await b1t.readdir(r,{withFileTypes:!0});for(let i of s)if(i.isDirectory()||i.isSymbolicLink())n.push({dir:Ake.join(r,i.name),scope:o})}}catch(s){if(!ds(s))logForDebugging(`[skill-as-plugin] readdir ${r} failed: ${s}`,{level:"warn"})}return n}
var b1t,Ake;
var _Yr=b(()=>{lt();pT();Iy();qe();sn();bt();Ev();mf();RK();J3();nI();ik();b1t=require("fs/promises"),Ake=require("path")});
export {Psa,Osa,b1t,Ake,_Yr};
