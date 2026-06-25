// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {aM,NS,VT} from "./m648.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {w5,N1e} from "./m647.ts";
import {In,Ct} from "./m197.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var cOe={};
ft(cOe,{writeBridgePointer:()=>writeBridgePointer,readBridgePointerAcrossWorktrees:()=>readBridgePointerAcrossWorktrees,readBridgePointer:()=>readBridgePointer,getBridgePointerPath:()=>getBridgePointerPath,clearBridgePointer:()=>clearBridgePointer,BRIDGE_POINTER_TTL_MS:()=>BRIDGE_POINTER_TTL_MS});
function getBridgePointerPath(e){return gJn.join(aM(),NS(e),"bridge-pointer.json")}
async function writeBridgePointer(e,t){let n=getBridgePointerPath(e);try{return await Wue.mkdir(gJn.dirname(n),{recursive:!0}),await Wue.writeFile(n,TeamDeleteToolName(t),"utf8"),logForDebugging(`[bridge:pointer] wrote ${n}`),!0}catch(r){return logForDebugging(`[bridge:pointer] write failed: ${r}`,{level:"warn"}),!1}}
async function readBridgePointer(e){let t=getBridgePointerPath(e),n,r;try{r=(await Wue.stat(t)).mtimeMs,n=await Wue.readFile(t,"utf8")}catch{return null}let o=IEm().safeParse(PEm(n));if(!o.success)return logForDebugging(`[bridge:pointer] invalid schema, clearing: ${t}`),await clearBridgePointer(e),null;let s=Math.max(0,Date.now()-r);if(s>BRIDGE_POINTER_TTL_MS)return logForDebugging(`[bridge:pointer] stale (>4h mtime), clearing: ${t}`),await clearBridgePointer(e),null;return{...o.data,ageMs:s}}
async function readBridgePointerAcrossWorktrees(e){let t=await readBridgePointer(e);if(t)return{pointer:t,dir:e};let n=await w5(e);if(n.length<=1)return null;if(n.length>nUl)return logForDebugging(`[bridge:pointer] ${n.length} worktrees exceeds fanout cap ${nUl}, skipping`),null;let r=NS(e),o=n.filter((a)=>NS(a)!==r),s=await Promise.all(o.map(async(a)=>{let l=await readBridgePointer(a);return l?{pointer:l,dir:a}:null})),i=null;for(let a of s)if(a&&(!i||a.pointer.ageMs<i.pointer.ageMs))i=a;if(i)logForDebugging(`[bridge:pointer] fanout found pointer in worktree ${i.dir} (ageMs=${i.pointer.ageMs})`);return i}
async function clearBridgePointer(e){let t=getBridgePointerPath(e);try{await Wue.unlink(t),logForDebugging(`[bridge:pointer] cleared ${t}`)}catch(n){if(!In(n))logForDebugging(`[bridge:pointer] clear failed: ${n}`,{level:"warn"})}}
function PEm(e){try{return qt(e)}catch{return null}}
var Wue,gJn,nUl=50,BRIDGE_POINTER_TTL_MS=14400000,IEm;
var uOe=b(()=>{Qr();qe();Ct();N1e();VT();tn();Wue=require("fs/promises"),gJn=require("path"),IEm=ve(()=>C.object({sessionId:C.string(),environmentId:C.string(),source:C.enum(["standalone","repl"]),pid:C.number().optional(),procStart:C.string().optional()}))});
export {cOe,getBridgePointerPath,writeBridgePointer,readBridgePointer,readBridgePointerAcrossWorktrees,clearBridgePointer,PEm,Wue,gJn,nUl,BRIDGE_POINTER_TTL_MS,IEm,uOe};
