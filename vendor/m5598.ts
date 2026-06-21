// @ts-nocheck
import {aT,durationUnitMillis} from "./m442.ts";
import {F9,vf,q0e,_nl,hS} from "../src/config/4438_source.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {g8,ik} from "../src/agent/0726_level.ts";
import {ud,mc} from "../src/config/0645_maxBytes.ts";
import {findCanonicalGitRoot,Ba} from "./m693.ts";
import {b} from "../runtime.ts";
function e1o(e,t,n){let r=[],o=[],s=[];for(let[i,a]of Object.entries(e)){let l=t[i],c=Ftc(a.source,n?.projectRoot);if(!l)r.push(i);else if(a.sourceIsFallback)s.push(i);else if(!aT(c,l.source))o.push({name:i,declaredSource:c,materializedSource:l.source});else s.push(i)}return{missing:r,sourceChanged:o,upToDate:s}}
async function $Qn(e){let t=F9();if(Object.keys(t).length===0)return{installed:[],updated:[],failed:[],upToDate:[],skipped:[]};let n;try{n=await vf()}catch(u){logForDebugging(`reconciler: failed to load known_marketplaces.json, treating as empty: ${Se(u)}`,{level:"error"}),n={}}let r=e1o(t,n,{projectRoot:getOriginalCwd()}),o=[...r.missing.map((u)=>({name:u,source:Ftc(t[u].source),action:"install"})),...r.sourceChanged.map(({name:u,declaredSource:d})=>({name:u,source:d,action:"update"}))],s=[],i=[];for(let u of o){if(e?.skip?.(u.name,u.source)){s.push(u.name);continue}if(u.action==="update"&&g8(u.source)&&!await ud(u.source.path)){logForDebugging(`[reconcile] '${u.name}' declared path does not exist; keeping materialized entry`),s.push(u.name);continue}i.push(u)}let a=[],l=[],c=[];if(i.length>0){logForDebugging(`[reconcile] ${i.length} marketplace(s): ${i.map((u)=>`${u.name}(${u.action})`).join(", ")}`);for(let u=0;u<i.length;u++){let{name:d,source:p,action:m}=i[u];e?.onProgress?.({type:"installing",name:d,action:m,index:u+1,total:i.length});try{let f=await q0e(p);if(m==="install")a.push(d);else l.push(d);e?.onProgress?.({type:"installed",name:d,alreadyMaterialized:f.alreadyMaterialized})}catch(f){let A=Se(f);c.push({name:d,error:A}),e?.onProgress?.({type:"failed",name:d,error:A}),logForDebugging(`[reconcile] failed to ${m} marketplace '${d}': ${A}`,{level:"error"})}}}try{await _nl(i.length===0?n:void 0)}catch(u){logForDebugging(`reconciler: syncDeclaredAutoUpdateToJson failed: ${Se(u)}`,{level:"error"})}return{installed:a,updated:l,failed:c,upToDate:r.upToDate,skipped:s}}
function Ftc(e,t){if((e.source==="directory"||e.source==="file")&&!UQn.isAbsolute(e.path)){let n=t??getOriginalCwd(),r=findCanonicalGitRoot(n);return{...e,path:UQn.resolve(r??n,e.path)}}return e}
var UQn;
var t1o=b(()=>{durationUnitMillis();lt();qe();bt();mc();Ba();hS();ik();UQn=require("path")});
export {e1o,$Qn,Ftc,UQn,t1o};
