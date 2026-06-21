// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {E} from "./m319.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
function HQu(e){if(!e.startsWith("/"))return!1;try{return new URL(e,"https://sentinel.invalid").origin==="https://sentinel.invalid"}catch{return!1}}
function IQu(e){let t=e.replace(/\/+$/,""),n=t.slice(t.lastIndexOf("/")+1);if(n==="")throw Error(`cannot derive mount name from path: ${e}`);let r=n.replace(/[^A-Za-z0-9_-]/g,"-");if(r===""||r==="."||r==="..")throw Error(`derived mount name is not a valid path segment: ${n}`);return r}
function RBr(e){if(e.length===0)return!1;return e.split("/").every((n)=>/^[A-Za-z0-9._-]+$/.test(n)&&n!=="."&&n!=="..")}
function tie(){let e=process.env.CLAUDE_MEMORY_STORES;if(!e||e.trim()==="")return null;let t;try{t=qt(e)}catch(i){throw Error(`CLAUDE_MEMORY_STORES is not valid JSON: ${i instanceof Error?i.message:String(i)}`)}let n=E.array(PQu()).safeParse(t);if(!n.success)throw Error(`CLAUDE_MEMORY_STORES failed validation: ${n.error.message}`);let r=[],o=new Set,s=!1;for(let i of n.data){let a=typeof i==="string"?{path:i,mode:"rw",scope:"team"}:i,l=a.mount??IQu(a.path);if(o.has(l))throw Error(`CLAUDE_MEMORY_STORES has duplicate mount: ${l}`);if(o.add(l),a.scope==="user"){if(s)throw Error('CLAUDE_MEMORY_STORES has more than one scope:"user" entry');s=!0}r.push({path:a.path,mode:a.mode,scope:a.scope,mount:l,...a.promptIndex!==void 0&&{promptIndex:a.promptIndex},...a.promptIndexMaxBytes!==void 0&&{promptIndexMaxBytes:a.promptIndexMaxBytes}})}if(r.length===0)return null;return logForDebugging(`memory-stores: parsed ${r.length} store(s): `+r.map((i)=>`${i.mount}(${i.mode})`).join(", "),{level:"debug"}),r}
var DQu="mount must match /^[A-Za-z0-9_-]+$/",dhi,PQu;
var RQe=b(()=>{Xr();qe();Xt();dhi=we(()=>E.string().min(1).refine(HQu,{message:"path must be path-absolute and must not override the host"})),PQu=we(()=>E.union([dhi(),E.object({path:dhi(),mode:E.enum(["rw","ro"]).default("rw"),scope:E.enum(["user","team"]).default("team"),mount:E.string().min(1).refine((e)=>/^[A-Za-z0-9_-]+$/.test(e),{message:DQu}).optional(),promptIndex:E.string().min(1).refine(RBr,{message:"promptIndex segments must match [A-Za-z0-9._-]+ and must not be . or .."}).optional(),promptIndexMaxBytes:E.number().int().positive().optional()})]))});
export {HQu,IQu,RBr,tie,DQu,dhi,PQu,RQe};
