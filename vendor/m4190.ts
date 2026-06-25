// @ts-nocheck
import {Fte,g5e} from "../src/agent/4190_runId.ts";
import {In,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function HKa(e){let t=new Map,n=new Map;for(let r of e)if(r.type==="result")t.set(r.key,r);else if(r.type==="started"){let o=n.get(r.key);if(o)o.push(r);else n.set(r.key,[r])}return{results:t,started:n}}
function EFp(e){if(!e)return"{}";let t={},n=["schema","model","effort","isolation","agentType"];for(let o of n){let s=e[o];if(s===void 0||typeof s==="function")continue;t[o]=s}let r=(o)=>{if(typeof o==="function")return;if(Array.isArray(o)){let s=[],i=o.length,a=Number.isSafeInteger(i)?i:0;for(let l=0;l<a;l++)s[l]=r(o[l]);return s}if(o&&typeof o==="object"){let s={};for(let i of Object.keys(o).sort()){if(i==="__proto__")continue;s[i]=r(o[i])}return s}return o};return JSON.stringify(r(t))}
function xKa(e,t,n){let r=IKa.createHash("sha256").update(n).update("\x00").update(e).update("\x00").update(EFp(t)).digest("hex");return`${bFp}:${r}`}
class Qho{path;dirReady=!1;constructor(e){this.path=$qn.join(Fte(e),"journal.jsonl")}async load(){let e;try{e=await Lpt.readFile(this.path,"utf8")}catch(n){if(In(n))return HKa([]);throw n}let t=[];for(let n of e.split(`
`)){if(!n)continue;try{t.push(JSON.parse(n))}catch(r){logForDebugging(`LocalFileJournal: skipping unparseable line in ${this.path}: ${r}`)}}return HKa(t)}async append(e){if(!this.dirReady)await Lpt.mkdir($qn.dirname(this.path),{recursive:!0}),this.dirReady=!0;await Lpt.appendFile(this.path,`${JSON.stringify(e)}
`,"utf8")}}
var IKa,Lpt,$qn,bFp="v2";
var Zho=b(()=>{qe();Ct();g5e();IKa=require("crypto"),Lpt=require("fs/promises"),$qn=require("path")});
export {HKa,EFp,xKa,Qho,IKa,Lpt,$qn,bFp,Zho};
