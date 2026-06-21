// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {kg} from "./m129.ts";
import {ca} from "./m5.ts";
function E1t(e,t){if(!e.includes("<claude-code-hint"))return{hints:[],stripped:e};let n=K6d(t),r=[],o=e.replace(Lsa,(i)=>{let a=V6d(i),l=Number(a.v),c=a.type,u=a.value;if(!j6d.has(l))return logForDebugging(`[claudeCodeHints] dropped hint with unsupported v=${a.v}`),"";if(!c||!W6d.has(c))return logForDebugging(`[claudeCodeHints] dropped hint with unsupported type=${c}`),"";if(!u)return logForDebugging("[claudeCodeHints] dropped hint with empty value"),"";return r.push({v:l,type:c,value:u,sourceCommand:n}),""}),s=r.length>0||o!==e?o.replace(/\n{3,}/g,`

`):o;return{hints:r,stripped:s}}
function jIn(e){if(!e.includes("<claude-code-hint"))return e;return e.replace(Lsa,"").replace(/\n{3,}/g,`

`)}
function V6d(e){let t={};for(let n of e.matchAll(G6d))t[n[1]]=n[2]??n[3]??"";return t}
function K6d(e){let t=e.trim(),n=t.search(/\s/);return n===-1?t:t.slice(0,n)}
function Bsa(e){if(yYr)return;qIn=e,Nsa()}
function Fsa(){if(qIn!==null)qIn=null,Nsa()}
function Usa(){yYr=!0}
function TYr(){return qIn}
function qsa(){return yYr}
var j6d,W6d,Lsa,G6d,qIn=null,yYr=!1,Msa,Nsa,$sa;
var Lot=b(()=>{qe();kg();j6d=new Set([1]),W6d=new Set(["plugin"]),Lsa=/^[ \t]*<claude-code-hint\s+([^>]*?)\s*\/>[ \t]*$/gm,G6d=/(\w+)=(?:"([^"]*)"|([^\s/>]+))/g;Msa=ca(),Nsa=Msa.emit;$sa=Msa.subscribe});
export {E1t,jIn,V6d,K6d,Bsa,Fsa,Usa,TYr,qsa,j6d,W6d,Lsa,G6d,qIn,yYr,Msa,Nsa,$sa,Lot};
