// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {DEn,sz,BUe,hve} from "./m2271.ts";
import {In,cn,Jo,Ce,Ct} from "./m197.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {jM,oie} from "./m2269.ts";
import {b} from "../runtime.ts";
import {lZ,q0} from "./m2270.ts";
function tAi(e){return OEn?.get(e)}
function V9r(e){OEn??=new Map;for(let t of e)OEn.set(t.slug,t.base)}
function MDt(){return D8.join(or(),"themes")}
function $Ue(e){return`${G9r}${e}`}
function J3(e){return e.startsWith(G9r)?e.slice(G9r.length):null}
function nAi(e,t,n){let r;try{r=qt(t)}catch{logForDebugging(`[theme] ${e}.json: invalid JSON`,{level:"warn"});return}if(typeof r!=="object"||r===null||Array.isArray(r))return;let o=r,s=DEn(o.base)?o.base:"dark",i=typeof o.name==="string"?o.name:e,a={};if(typeof o.overrides==="object"&&o.overrides!==null){let l=sz(s);for(let[c,u]of Object.entries(o.overrides))if(Object.hasOwn(l,c)&&BUe(u))a[c]=u}return{slug:e,name:i,base:s,overrides:a,source:n}}
function QCi(e,t,n){let r;try{if($et.statSync(e).size>eAi){logForDebugging(`[theme] ${e} exceeds 256KB; skipping`,{level:"warn"});return}r=$et.readFileSync(e,"utf8")}catch(o){if(!In(o))logForDebugging(`[theme] failed to read ${e}`,{level:"warn"});return}return nAi(t,r,n)}
async function ZCi(e,t,n){let r;try{if((await sie.stat(e)).size>eAi){logForDebugging(`[theme] ${e} exceeds 256KB; skipping`,{level:"warn"});return}r=await sie.readFile(e,"utf8")}catch(o){if(!In(o))logForDebugging(`[theme] failed to read ${e}`,{level:"warn"});return}return nAi(t,r,n)}
function xud(e,t,n=""){let r;try{r=$et.readdirSync(e)}catch(s){if(cn(s)==="ENOTDIR"){let i=QCi(e,n+D8.basename(e,".json"),t);return i?[i]:[]}if(!Jo(s))logForDebugging(`[theme] readdir ${e} failed`,{level:"warn"});return[]}let o=[];for(let s of r){if(D8.extname(s)!==".json")continue;let i=QCi(D8.join(e,s),n+D8.basename(s,".json"),t);if(i)o.push(i)}return o}
async function K9r(e,t,n=""){let r;try{r=await sie.readdir(e)}catch(s){if(cn(s)==="ENOTDIR"){let i=await ZCi(e,n+D8.basename(e,".json"),t);return i?[i]:[]}if(!Jo(s))logForDebugging(`[theme] readdir ${e} failed`,{level:"warn"});return[]}let o=[];for(let s of r){if(D8.extname(s)!==".json")continue;let i=await ZCi(D8.join(e,s),n+D8.basename(s,".json"),t);if(i)o.push(i)}return o}
function z9r(){let e=buildMcpToolName("themes")?[]:xud(MDt(),"user");return OEn=new Map(e.map((t)=>[t.slug,t.base])),V9r(UUe.getState()),e.sort((t,n)=>t.name.localeCompare(n.name))}
async function j9r(e){let t=MDt();await sie.mkdir(t,{recursive:!0});let n={name:e.name,base:e.base,overrides:e.overrides};await sie.writeFile(D8.join(t,`${e.slug}.json`),TeamDeleteToolName(n,null,2)+`
`,"utf8")}
function rAi(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"theme"}
function oAi(e){if(buildMcpToolName("themes"))return()=>{};let t=jM.watch(MDt(),{persistent:!0,ignoreInitial:!0,depth:0,awaitWriteFinish:{stabilityThreshold:300,pollInterval:100},ignorePermissionErrors:!0});return t.on("add",e),t.on("change",e),t.on("unlink",e),t.on("error",(n)=>logForDebugging(`[theme] watcher error: ${Ce(n)}`,{level:"warn"})),()=>void t.close()}
var $et,sie,D8,G9r="custom:",eAi=262144,OEn,UUe;
var she=b(()=>{oie();lZ();ky();qe();dn();Ct();tn();hve();$et=require("fs"),sie=require("fs/promises"),D8=require("path");UUe=q0([])});
export {tAi,V9r,MDt,$Ue,J3,nAi,QCi,ZCi,xud,K9r,z9r,j9r,rAi,oAi,$et,sie,D8,G9r,eAi,OEn,UUe,she};
