// @ts-nocheck
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {lCe,h3} from "../src/artifact/0736_allow.ts";
import {JS,ez} from "./m2239.ts";
import {Oit,II} from "./m3268.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {xh,wm} from "./m707.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {Js,rT} from "./m1294.ts";
import {Jo,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {HA} from "./m2219.ts";
import {bk} from "../src/agent/0731_level.ts";
function Bpa(e,t){if(t)return!0;return!1}
async function Upa(){if(buildMcpToolName("skills")||lCe.some((r)=>JS(r))||!Oit())return[];let e=[],t=rIe.join(or(),"skills");if(xh("userSettings"))e.push({dir:t,scope:"user"});if(xh("projectSettings")){let r=rIe.join(getOriginalCwd(),".claude","skills"),o=(s)=>ZFt.realpath(s).catch(()=>s);if(r!==t&&await o(r)!==await o(t))e.push({dir:r,scope:"project"})}let n=[];for(let{dir:r,scope:o}of e)try{if(o==="user"){let s=await Js().listEntries(r);for(let i of s)if(!i.isFile)n.push({dir:rIe.join(r,i.name),scope:o})}else{let s=await ZFt.readdir(r,{withFileTypes:!0});for(let i of s)if(i.isDirectory()||i.isSymbolicLink())n.push({dir:rIe.join(r,i.name),scope:o})}}catch(s){if(!Jo(s))logForDebugging(`[skill-as-plugin] readdir ${r} failed: ${s}`,{level:"warn"})}return n}
var ZFt,rIe;
var teo=b(()=>{lt();rT();ky();qe();dn();Ct();HA();wm();ez();h3();II();bk();ZFt=require("fs/promises"),rIe=require("path")});
export {Bpa,Upa,ZFt,rIe,teo};
