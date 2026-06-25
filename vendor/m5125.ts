// @ts-nocheck
import {C} from "./m321.ts";
import {cn,Ce,Ct} from "./m197.ts";
import {Js,rT} from "./m1294.ts";
import {ba,pd} from "./m706.ts";
import {jM,oie} from "./m2269.ts";
import {Yt,Es} from "./m641.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {WORKER_KINDS,yVt} from "./m5124.ts";
import {J_,$X} from "./m446.ts";
import {b} from "../runtime.ts";
import {toe,CR} from "./m450.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
function ZEm(e){return C.union([e,C.array(e)]).optional().transform((t)=>t===void 0?[]:Array.isArray(t)?t:[t])}
function IDo(){return HDo().parse({})}
async function rGe(e){let t;try{let i=await _Ul.stat(e).catch((a)=>cn(a)==="ENOENT"?null:Promise.reject(a));if(i&&(!i.isFile()||i.size>1048576))return{ok:!1,error:`${e} is not a regular file (or exceeds 1MiB)`};t=await Js().read(e)}catch(i){if(cn(i)==="ENOENT")return{ok:!0,config:IDo(),unknownKeys:[]};return{ok:!1,error:`failed to read ${e}: ${Ce(i)}`}}let n=ba(t,!1);if(n===null)return{ok:!1,error:`failed to parse ${e} as JSON`};let r=HDo().safeParse(n);if(!r.success)return{ok:!1,error:`config validation failed: ${r.error.message}`};let o=new Set(Object.keys(HDo().shape)),s=typeof n==="object"&&n!==null?Object.keys(n).filter((i)=>!o.has(i)):[];return{ok:!0,config:r.data,unknownKeys:s}}
function CJn(e,t){let n=pOe.dirname(e),r=pOe.normalize(n),o=pOe.basename(e),s=jM.watch(n,{persistent:!0,ignoreInitial:!0,depth:0,usePolling:Yt()==="macos",interval:100,ignored:(i)=>{let a=pOe.normalize(i);return a!==r&&pOe.basename(a)!==o},awaitWriteFinish:{stabilityThreshold:300,pollInterval:100},atomic:!0,ignorePermissionErrors:!0});return s.on("add",t),s.on("change",t),s.on("unlink",t),s.on("error",(i)=>logForDebugging(`[daemon-config] watcher error: ${Ce(i)}`,{level:"warn"})),()=>void s.close().catch(()=>{})}
function yUl(e,t){let n={stop:[],start:[],restart:[]};for(let r of Object.keys(WORKER_KINDS)){let o=e[r]??[],s=t[r]??[],i=Math.max(o.length,s.length);for(let a=0;a<i;a++){let l=`${r}:${a}`,c=o[a],u=s[a];if(c!==void 0&&u===void 0)n.stop.push(l);else if(c===void 0&&u!==void 0)n.start.push({id:l,kind:r,config:u});else if(!J_(c,u))n.restart.push({id:l,kind:r,config:u})}}return n}
var _Ul,pOe,HDo;
var TVt=b(()=>{oie();$X();toe();Qr();rT();qe();Ct();pd();Es();yVt();_Ul=require("fs/promises"),pOe=require("path");HDo=ve(()=>{let e=CR(WORKER_KINDS,(t)=>ZEm(t.schema()));return C.object({$schema:C.string().optional(),...e})})});
export {ZEm,IDo,rGe,CJn,yUl,_Ul,pOe,HDo,TVt};
