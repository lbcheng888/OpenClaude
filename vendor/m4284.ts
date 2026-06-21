// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function LLp(e){let t=e.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,16)||"anon",n=IVa.randomBytes(6).toString("hex");return`plan_${t}_${n}`}
function zL(e){return e.replace(/\\/g,"/").split("/").filter((t)=>t!==""&&t!==".").join("/")}
function Jpo(e){let t=zL(e).toLowerCase();return t==="claude.md"||t.startsWith("claude.md/")||t===".claude"||t.startsWith(".claude/")}
function p6e(e){return/[*?]/.test(e)}
function PVa(e){let t="",n=0,r=0,o=()=>{if(++r>HVa)throw Error(`glob "${e}" exceeds ${HVa} '*'/'**' wildcards`)};while(n<e.length){let s=e.charAt(n);if(s==="*"&&e.charAt(n+1)==="*")if(o(),e.charAt(n+2)==="/")t+="(?:.*/)?",n+=3;else t+=".*",n+=2;else if(s==="*")o(),t+="[^/]*",n+=1;else if(s==="?")t+="[^/]",n+=1;else if(/[.+^$|()[\]{}\\]/.test(s))t+="\\"+s,n+=1;else t+=s,n+=1}return new RegExp(`^${t}$`)}
function w3t(e,t){let n=zL(e);if(!n)return!1;if(n.length>m6e)return!1;if(n.split("/").includes("..")||n.includes("\x00"))return!1;for(let r of t){let o=zL(r);if(p6e(o))try{if(PVa(o).test(n))return!0}catch{}else if(o===n)return!0}return!1}
function OVa(e){let t={projectId:e.projectId,writes:e.writes.map(zL),deletes:e.deletes.map(zL),...e.localDir!==void 0&&{localDir:e.localDir}},n=PLp().safeParse(t);if(!n.success)throw Error("registerPlan: plan failed shape validation");for(let o of[...n.data.writes,...n.data.deletes])if(p6e(o))PVa(o);let r=LLp(e.projectId);return DVa.set(r,n.data),r}
function R3t(e){if(!OLp.test(e))return null;return DVa.get(e)??null}
var IVa,PLp,DVa,OLp,HVa=3,m6e=256;
var LVa=b(()=>{Xr();IVa=require("crypto"),PLp=we(()=>E.object({projectId:E.string(),writes:E.array(E.string()),deletes:E.array(E.string()),localDir:E.string().optional()})),DVa=new Map,OLp=/^plan_[a-z0-9]{1,16}_[a-f0-9]{12}$/});
export {LLp,zL,Jpo,p6e,PVa,w3t,OVa,R3t,IVa,PLp,DVa,OLp,HVa,m6e,LVa};
