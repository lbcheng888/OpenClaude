// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function t9p(e){let t=e.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,16)||"anon",n=QXa.randomBytes(6).toString("hex");return`plan_${t}_${n}`}
function fL(e){return e.replace(/\\/g,"/").split("/").filter((t)=>t!==""&&t!==".").join("/")}
function K_o(e){let t=fL(e).toLowerCase();return t==="claude.md"||t.startsWith("claude.md/")||t===".claude"||t.startsWith(".claude/")}
function N5e(e){return/[*?]/.test(e)}
function eQa(e){let t="",n=0,r=0,o=()=>{if(++r>XXa)throw Error(`glob "${e}" exceeds ${XXa} '*'/'**' wildcards`)};while(n<e.length){let s=e.charAt(n);if(s==="*"&&e.charAt(n+1)==="*")if(o(),e.charAt(n+2)==="/")t+="(?:.*/)?",n+=3;else t+=".*",n+=2;else if(s==="*")o(),t+="[^/]*",n+=1;else if(s==="?")t+="[^/]",n+=1;else if(/[.+^$|()[\]{}\\]/.test(s))t+="\\"+s,n+=1;else t+=s,n+=1}return new RegExp(`^${t}$`)}
function Vqt(e,t){let n=fL(e);if(!n)return!1;if(n.length>F5e)return!1;if(n.split("/").includes("..")||n.includes("\x00"))return!1;for(let r of t){let o=fL(r);if(N5e(o))try{if(eQa(o).test(n))return!0}catch{}else if(o===n)return!0}return!1}
function tQa(e){let t={projectId:e.projectId,writes:e.writes.map(fL),deletes:e.deletes.map(fL),...e.localDir!==void 0&&{localDir:e.localDir}},n=Z$p().safeParse(t);if(!n.success)throw Error("registerPlan: plan failed shape validation");for(let o of[...n.data.writes,...n.data.deletes])if(N5e(o))eQa(o);let r=t9p(e.projectId);return ZXa.set(r,n.data),r}
function Kqt(e){if(!e9p.test(e))return null;return ZXa.get(e)??null}
var QXa,Z$p,ZXa,e9p,XXa=3,F5e=256;
var nQa=b(()=>{Qr();QXa=require("crypto"),Z$p=ve(()=>C.object({projectId:C.string(),writes:C.array(C.string()),deletes:C.array(C.string()),localDir:C.string().optional()})),ZXa=new Map,e9p=/^plan_[a-z0-9]{1,16}_[a-f0-9]{12}$/});
export {t9p,fL,K_o,N5e,eQa,Vqt,tQa,Kqt,QXa,Z$p,ZXa,e9p,XXa,F5e,nQa};
