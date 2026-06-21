// @ts-nocheck
import {E} from "./m319.ts";
import {dn,Se,bt} from "./m195.ts";
import {ci,pT} from "./m1289.ts";
import {Fa,Pd} from "./m701.ts";
import {M1,sie} from "./m2261.ts";
import {zt,qs} from "./m635.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {WORKER_KINDS,Y8t} from "./m5094.ts";
import {aT,durationUnitMillis} from "./m442.ts";
import {b} from "../runtime.ts";
import {roe,hw} from "./m446.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
function qmm(e){return E.union([e,E.array(e)]).optional().transform((t)=>t===void 0?[]:Array.isArray(t)?t:[t])}
function bxo(){return Sxo().parse({})}
async function A8e(e){let t;try{let i=await jDl.stat(e).catch((a)=>dn(a)==="ENOENT"?null:Promise.reject(a));if(i&&(!i.isFile()||i.size>1048576))return{ok:!1,error:`${e} is not a regular file (or exceeds 1MiB)`};t=await ci().read(e)}catch(i){if(dn(i)==="ENOENT")return{ok:!0,config:bxo(),unknownKeys:[]};return{ok:!1,error:`failed to read ${e}: ${Se(i)}`}}let n=Fa(t,!1);if(n===null)return{ok:!1,error:`failed to parse ${e} as JSON`};let r=Sxo().safeParse(n);if(!r.success)return{ok:!1,error:`config validation failed: ${r.error.message}`};let o=new Set(Object.keys(Sxo().shape)),s=typeof n==="object"&&n!==null?Object.keys(n).filter((i)=>!o.has(i)):[];return{ok:!0,config:r.data,unknownKeys:s}}
function H7n(e,t){let n=pPe.dirname(e),r=pPe.normalize(n),o=pPe.basename(e),s=M1.watch(n,{persistent:!0,ignoreInitial:!0,depth:0,usePolling:zt()==="macos",interval:100,ignored:(i)=>{let a=pPe.normalize(i);return a!==r&&pPe.basename(a)!==o},awaitWriteFinish:{stabilityThreshold:300,pollInterval:100},atomic:!0,ignorePermissionErrors:!0});return s.on("add",t),s.on("change",t),s.on("unlink",t),s.on("error",(i)=>logForDebugging(`[daemon-config] watcher error: ${Se(i)}`,{level:"warn"})),()=>void s.close().catch(()=>{})}
function WDl(e,t){let n={stop:[],start:[],restart:[]};for(let r of Object.keys(WORKER_KINDS)){let o=e[r]??[],s=t[r]??[],i=Math.max(o.length,s.length);for(let a=0;a<i;a++){let l=`${r}:${a}`,c=o[a],u=s[a];if(c!==void 0&&u===void 0)n.stop.push(l);else if(c===void 0&&u!==void 0)n.start.push({id:l,kind:r,config:u});else if(!aT(c,u))n.restart.push({id:l,kind:r,config:u})}}return n}
var jDl,pPe,Sxo;
var J8t=b(()=>{sie();durationUnitMillis();roe();Xr();pT();qe();bt();Pd();qs();Y8t();jDl=require("fs/promises"),pPe=require("path");Sxo=we(()=>{let e=hw(WORKER_KINDS,(t)=>qmm(t.schema()));return E.object({$schema:E.string().optional(),...e})})});
export {qmm,bxo,A8e,H7n,WDl,jDl,pPe,Sxo,J8t};
