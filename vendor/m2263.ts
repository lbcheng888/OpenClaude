// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Yyn,kK,$Fe,Ive,C0} from "./m2262.ts";
import {Pn,dn,ds,Se,bt} from "./m195.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {M1,sie} from "./m2261.ts";
import {b} from "../runtime.ts";
function e_i(e){return Xyn?.get(e)}
function fFr(e){Xyn??=new Map;for(let t of e)Xyn.set(t.slug,t.base)}
function lIt(){return _5.join(tr(),"themes")}
function jFe(e){return`${mFr}${e}`}
function k4(e){return e.startsWith(mFr)?e.slice(mFr.length):null}
function t_i(e,t,n){let r;try{r=qt(t)}catch{logForDebugging(`[theme] ${e}.json: invalid JSON`,{level:"warn"});return}if(typeof r!=="object"||r===null||Array.isArray(r))return;let o=r,s=Yyn(o.base)?o.base:"dark",i=typeof o.name==="string"?o.name:e,a={};if(typeof o.overrides==="object"&&o.overrides!==null){let l=kK(s);for(let[c,u]of Object.entries(o.overrides))if(Object.hasOwn(l,c)&&$Fe(u))a[c]=u}return{slug:e,name:i,base:s,overrides:a,source:n}}
function Xgi(e,t,n){let r;try{if(UQe.statSync(e).size>Zgi){logForDebugging(`[theme] ${e} exceeds 256KB; skipping`,{level:"warn"});return}r=UQe.readFileSync(e,"utf8")}catch(o){if(!Pn(o))logForDebugging(`[theme] failed to read ${e}`,{level:"warn"});return}return t_i(t,r,n)}
async function Qgi(e,t,n){let r;try{if((await iie.stat(e)).size>Zgi){logForDebugging(`[theme] ${e} exceeds 256KB; skipping`,{level:"warn"});return}r=await iie.readFile(e,"utf8")}catch(o){if(!Pn(o))logForDebugging(`[theme] failed to read ${e}`,{level:"warn"});return}return t_i(t,r,n)}
function aed(e,t,n=""){let r;try{r=UQe.readdirSync(e)}catch(s){if(dn(s)==="ENOTDIR"){let i=Xgi(e,n+_5.basename(e,".json"),t);return i?[i]:[]}if(!ds(s))logForDebugging(`[theme] readdir ${e} failed`,{level:"warn"});return[]}let o=[];for(let s of r){if(_5.extname(s)!==".json")continue;let i=Xgi(_5.join(e,s),n+_5.basename(s,".json"),t);if(i)o.push(i)}return o}
async function AFr(e,t,n=""){let r;try{r=await iie.readdir(e)}catch(s){if(dn(s)==="ENOTDIR"){let i=await Qgi(e,n+_5.basename(e,".json"),t);return i?[i]:[]}if(!ds(s))logForDebugging(`[theme] readdir ${e} failed`,{level:"warn"});return[]}let o=[];for(let s of r){if(_5.extname(s)!==".json")continue;let i=await Qgi(_5.join(e,s),n+_5.basename(s,".json"),t);if(i)o.push(i)}return o}
function hFr(){let e=hc("themes")?[]:aed(lIt(),"user");return Xyn=new Map(e.map((t)=>[t.slug,t.base])),fFr(qFe.getState()),e.sort((t,n)=>t.name.localeCompare(n.name))}
async function gFr(e){let t=lIt();await iie.mkdir(t,{recursive:!0});let n={name:e.name,base:e.base,overrides:e.overrides};await iie.writeFile(_5.join(t,`${e.slug}.json`),Le(n,null,2)+`
`,"utf8")}
function n_i(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"theme"}
function r_i(e){if(hc("themes"))return()=>{};let t=M1.watch(lIt(),{persistent:!0,ignoreInitial:!0,depth:0,awaitWriteFinish:{stabilityThreshold:300,pollInterval:100},ignorePermissionErrors:!0});return t.on("add",e),t.on("change",e),t.on("unlink",e),t.on("error",(n)=>logForDebugging(`[theme] watcher error: ${Se(n)}`,{level:"warn"})),()=>void t.close()}
var UQe,iie,_5,mFr="custom:",Zgi=262144,Xyn,qFe;
var zfe=b(()=>{sie();Iy();qe();sn();bt();Xt();Ive();UQe=require("fs"),iie=require("fs/promises"),_5=require("path");qFe=C0([])});
export {e_i,fFr,lIt,jFe,k4,t_i,Xgi,Qgi,aed,AFr,hFr,gFr,n_i,r_i,UQe,iie,_5,mFr,Zgi,Xyn,qFe,zfe};
