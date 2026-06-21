// @ts-nocheck
import {Mut,U9t} from "../src/agent/4177_runId.ts";
import {Pn,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function b6a(e){let t=new Map,n=new Map;for(let r of e)if(r.type==="result")t.set(r.key,r);else if(r.type==="started"){let o=n.get(r.key);if(o)o.push(r);else n.set(r.key,[r])}return{results:t,started:n}}
function s0p(e){if(!e)return"{}";let t={},n=["schema","model","effort","isolation","agentType"];for(let o of n){let s=e[o];if(s===void 0||typeof s==="function")continue;t[o]=s}let r=(o)=>{if(typeof o==="function")return;if(Array.isArray(o)){let s=[],i=o.length,a=Number.isSafeInteger(i)?i:0;for(let l=0;l<a;l++)s[l]=r(o[l]);return s}if(o&&typeof o==="object"){let s={};for(let i of Object.keys(o).sort()){if(i==="__proto__")continue;s[i]=r(o[i])}return s}return o};return JSON.stringify(r(t))}
function C6a(e,t,n){let r=E6a.createHash("sha256").update(n).update("\x00").update(e).update("\x00").update(s0p(t)).digest("hex");return`${o0p}:${r}`}
class cdo{path;dirReady=!1;constructor(e){this.path=U9n.join(Mut(e),"journal.jsonl")}async load(){let e;try{e=await Nut.readFile(this.path,"utf8")}catch(n){if(Pn(n))return b6a([]);throw n}let t=[];for(let n of e.split(`
`)){if(!n)continue;try{t.push(JSON.parse(n))}catch(r){logForDebugging(`LocalFileJournal: skipping unparseable line in ${this.path}: ${r}`)}}return b6a(t)}async append(e){if(!this.dirReady)await Nut.mkdir(U9n.dirname(this.path),{recursive:!0}),this.dirReady=!0;await Nut.appendFile(this.path,`${JSON.stringify(e)}
`,"utf8")}}
var E6a,Nut,U9n,o0p="v2";
var udo=b(()=>{qe();bt();U9t();E6a=require("crypto"),Nut=require("fs/promises"),U9n=require("path")});
export {b6a,s0p,C6a,cdo,E6a,Nut,U9n,o0p,udo};
