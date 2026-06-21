// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {KM,BS,QT} from "./m642.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {d8,WMe} from "./m641.ts";
import {Pn,bt} from "./m195.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var cPe={};
isFullscreenWithTTY(cPe,{writeBridgePointer:()=>writeBridgePointer,readBridgePointerAcrossWorktrees:()=>readBridgePointerAcrossWorktrees,readBridgePointer:()=>readBridgePointer,getBridgePointerPath:()=>getBridgePointerPath,clearBridgePointer:()=>clearBridgePointer,BRIDGE_POINTER_TTL_MS:()=>BRIDGE_POINTER_TTL_MS});
function getBridgePointerPath(e){return E7n.join(KM(),BS(e),"bridge-pointer.json")}
async function writeBridgePointer(e,t){let n=getBridgePointerPath(e);try{return await Nue.mkdir(E7n.dirname(n),{recursive:!0}),await Nue.writeFile(n,Le(t),"utf8"),logForDebugging(`[bridge:pointer] wrote ${n}`),!0}catch(r){return logForDebugging(`[bridge:pointer] write failed: ${r}`,{level:"warn"}),!1}}
async function readBridgePointer(e){let t=getBridgePointerPath(e),n,r;try{r=(await Nue.stat(t)).mtimeMs,n=await Nue.readFile(t,"utf8")}catch{return null}let o=ymm().safeParse(bmm(n));if(!o.success)return logForDebugging(`[bridge:pointer] invalid schema, clearing: ${t}`),await clearBridgePointer(e),null;let s=Math.max(0,Date.now()-r);if(s>BRIDGE_POINTER_TTL_MS)return logForDebugging(`[bridge:pointer] stale (>4h mtime), clearing: ${t}`),await clearBridgePointer(e),null;return{...o.data,ageMs:s}}
async function readBridgePointerAcrossWorktrees(e){let t=await readBridgePointer(e);if(t)return{pointer:t,dir:e};let n=await d8(e);if(n.length<=1)return null;if(n.length>xDl)return logForDebugging(`[bridge:pointer] ${n.length} worktrees exceeds fanout cap ${xDl}, skipping`),null;let r=BS(e),o=n.filter((a)=>BS(a)!==r),s=await Promise.all(o.map(async(a)=>{let l=await readBridgePointer(a);return l?{pointer:l,dir:a}:null})),i=null;for(let a of s)if(a&&(!i||a.pointer.ageMs<i.pointer.ageMs))i=a;if(i)logForDebugging(`[bridge:pointer] fanout found pointer in worktree ${i.dir} (ageMs=${i.pointer.ageMs})`);return i}
async function clearBridgePointer(e){let t=getBridgePointerPath(e);try{await Nue.unlink(t),logForDebugging(`[bridge:pointer] cleared ${t}`)}catch(n){if(!Pn(n))logForDebugging(`[bridge:pointer] clear failed: ${n}`,{level:"warn"})}}
function bmm(e){try{return qt(e)}catch{return null}}
var Nue,E7n,xDl=50,BRIDGE_POINTER_TTL_MS=14400000,ymm;
var uPe=b(()=>{Xr();qe();bt();WMe();QT();Xt();Nue=require("fs/promises"),E7n=require("path"),ymm=we(()=>E.object({sessionId:E.string(),environmentId:E.string(),source:E.enum(["standalone","repl"]),pid:E.number().optional(),procStart:E.string().optional()}))});
export {cPe,getBridgePointerPath,writeBridgePointer,readBridgePointer,readBridgePointerAcrossWorktrees,clearBridgePointer,bmm,Nue,E7n,xDl,BRIDGE_POINTER_TTL_MS,ymm,uPe};
