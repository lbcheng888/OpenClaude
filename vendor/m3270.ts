// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
import {Ni} from "./m127.ts";
function eBt(e,t){if(!e.includes("<claude-code-hint"))return{hints:[],stripped:e};let n=OJd(t),r=[],o=e.replace($pa,(i)=>{let a=PJd(i),l=Number(a.v),c=a.type,u=a.value;if(!IJd.has(l))return logForDebugging(`[claudeCodeHints] dropped hint with unsupported v=${a.v}`),"";if(!c||!xJd.has(c))return logForDebugging(`[claudeCodeHints] dropped hint with unsupported type=${c}`),"";if(!u)return logForDebugging("[claudeCodeHints] dropped hint with empty value"),"";return r.push({v:l,type:c,value:u,sourceCommand:n}),""}),s=r.length>0||o!==e?o.replace(/\n{3,}/g,`

`):o;return{hints:r,stripped:s}}
function PPn(e){if(!e.includes("<claude-code-hint"))return e;return e.replace($pa,"").replace(/\n{3,}/g,`

`)}
function PJd(e){let t={};for(let n of e.matchAll(DJd))t[n[1]]=n[2]??n[3]??"";return t}
function OJd(e){let t=e.trim(),n=t.search(/\s/);return n===-1?t:t.slice(0,n)}
function Gpa(e){if(neo)return;DPn=e,Wpa()}
function Vpa(){if(DPn!==null)DPn=null,Wpa()}
function Kpa(){neo=!0}
function reo(){return DPn}
function jpa(){return neo}
var IJd,xJd,$pa,DJd,DPn=null,neo=!1,qpa,Wpa,zpa;
var Lit=b(()=>{qe();ig();IJd=new Set([1]),xJd=new Set(["plugin"]),$pa=/^[ \t]*<claude-code-hint\s+([^>]*?)\s*\/>[ \t]*$/gm,DJd=/(\w+)=(?:"([^"]*)"|([^\s/>]+))/g;qpa=Ni(),Wpa=qpa.emit;zpa=qpa.subscribe});
export {eBt,PPn,PJd,OJd,Gpa,Vpa,Kpa,reo,jpa,IJd,xJd,$pa,DJd,DPn,neo,qpa,Wpa,zpa,Lit};
