// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {C} from "./m321.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
function ecd(e){if(!e.startsWith("/"))return!1;try{return new URL(e,"https://sentinel.invalid").origin==="https://sentinel.invalid"}catch{return!1}}
function tcd(e){let t=e.replace(/\/+$/,""),n=t.slice(t.lastIndexOf("/")+1);if(n==="")throw Error(`cannot derive mount name from path: ${e}`);let r=n.replace(/[^A-Za-z0-9_-]/g,"-");if(r===""||r==="."||r==="..")throw Error(`derived mount name is not a valid path segment: ${n}`);return r}
function s9r(e){if(e.length===0)return!1;return e.split("/").every((n)=>/^[A-Za-z0-9._-]+$/.test(n)&&n!=="."&&n!=="..")}
function eie(){let e=process.env.CLAUDE_MEMORY_STORES;if(!e||e.trim()==="")return null;let t;try{t=qt(e)}catch(i){throw Error(`CLAUDE_MEMORY_STORES is not valid JSON: ${i instanceof Error?i.message:String(i)}`)}let n=C.array(rcd()).safeParse(t);if(!n.success)throw Error(`CLAUDE_MEMORY_STORES failed validation: ${n.error.message}`);let r=[],o=new Set,s=!1;for(let i of n.data){let a=typeof i==="string"?{path:i,mode:"rw",scope:"team"}:i,l=a.mount??tcd(a.path);if(o.has(l))throw Error(`CLAUDE_MEMORY_STORES has duplicate mount: ${l}`);if(o.add(l),a.scope==="user"){if(s)throw Error('CLAUDE_MEMORY_STORES has more than one scope:"user" entry');s=!0}r.push({path:a.path,mode:a.mode,scope:a.scope,mount:l,...a.promptIndex!==void 0&&{promptIndex:a.promptIndex},...a.promptIndexMaxBytes!==void 0&&{promptIndexMaxBytes:a.promptIndexMaxBytes}})}if(r.length===0)return null;return logForDebugging(`memory-stores: parsed ${r.length} store(s): `+r.map((i)=>`${i.mount}(${i.mode})`).join(", "),{level:"debug"}),r}
var ncd="mount must match /^[A-Za-z0-9_-]+$/",pEi,rcd;
var ket=b(()=>{Qr();qe();tn();pEi=ve(()=>C.string().min(1).refine(ecd,{message:"path must be path-absolute and must not override the host"})),rcd=ve(()=>C.union([pEi(),C.object({path:pEi(),mode:C.enum(["rw","ro"]).default("rw"),scope:C.enum(["user","team"]).default("team"),mount:C.string().min(1).refine((e)=>/^[A-Za-z0-9_-]+$/.test(e),{message:ncd}).optional(),promptIndex:C.string().min(1).refine(s9r,{message:"promptIndex segments must match [A-Za-z0-9._-]+ and must not be . or .."}).optional(),promptIndexMaxBytes:C.number().int().positive().optional()})]))});
export {ecd,tcd,s9r,eie,ncd,pEi,rcd,ket};
