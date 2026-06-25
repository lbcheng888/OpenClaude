// @ts-nocheck
import {J_,$X} from "./m446.ts";
import {l9,$m,FDe,ocl,dS} from "../src/config/4460_source.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {P5,bk} from "../src/agent/0731_level.ts";
import {Gu,Xl} from "../src/config/0651_maxBytes.ts";
import {findCanonicalGitRoot,ia} from "./m698.ts";
import {b} from "../runtime.ts";
function C2o(e,t,n){let r=[],o=[],s=[];for(let[i,a]of Object.entries(e)){let l=t[i],c=wuc(a.source,n?.projectRoot);if(!l)r.push(i);else if(a.sourceIsFallback)s.push(i);else if(!J_(c,l.source))o.push({name:i,declaredSource:c,materializedSource:l.source});else s.push(i)}return{missing:r,sourceChanged:o,upToDate:s}}
async function Gnr(e){let t=l9();if(Object.keys(t).length===0)return{installed:[],updated:[],failed:[],upToDate:[],skipped:[]};let n;try{n=await $m()}catch(u){logForDebugging(`reconciler: failed to load known_marketplaces.json, treating as empty: ${Ce(u)}`,{level:"error"}),n={}}let r=C2o(t,n,{projectRoot:getOriginalCwd()}),o=[...r.missing.map((u)=>({name:u,source:wuc(t[u].source),action:"install"})),...r.sourceChanged.map(({name:u,declaredSource:d})=>({name:u,source:d,action:"update"}))],s=[],i=[];for(let u of o){if(e?.skip?.(u.name,u.source)){s.push(u.name);continue}if(u.action==="update"&&P5(u.source)&&!await Gu(u.source.path)){logForDebugging(`[reconcile] '${u.name}' declared path does not exist; keeping materialized entry`),s.push(u.name);continue}i.push(u)}let a=[],l=[],c=[];if(i.length>0){logForDebugging(`[reconcile] ${i.length} marketplace(s): ${i.map((u)=>`${u.name}(${u.action})`).join(", ")}`);for(let u=0;u<i.length;u++){let{name:d,source:p,action:m}=i[u];e?.onProgress?.({type:"installing",name:d,action:m,index:u+1,total:i.length});try{let f=await FDe(p);if(m==="install")a.push(d);else l.push(d);e?.onProgress?.({type:"installed",name:d,alreadyMaterialized:f.alreadyMaterialized})}catch(f){let h=Ce(f);c.push({name:d,error:h}),e?.onProgress?.({type:"failed",name:d,error:h}),logForDebugging(`[reconcile] failed to ${m} marketplace '${d}': ${h}`,{level:"error"})}}}try{await ocl(i.length===0?n:void 0)}catch(u){logForDebugging(`reconciler: syncDeclaredAutoUpdateToJson failed: ${Ce(u)}`,{level:"error"})}return{installed:a,updated:l,failed:c,upToDate:r.upToDate,skipped:s}}
function wuc(e,t){if((e.source==="directory"||e.source==="file")&&!Wnr.isAbsolute(e.path)){let n=t??getOriginalCwd(),r=findCanonicalGitRoot(n);return{...e,path:Wnr.resolve(r??n,e.path)}}return e}
var Wnr;
var A2o=b(()=>{$X();lt();qe();Ct();Xl();ia();dS();bk();Wnr=require("path")});
export {C2o,Gnr,wuc,Wnr,A2o};
