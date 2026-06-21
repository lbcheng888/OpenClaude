// @ts-nocheck
import {E2e,oA} from "../src/config/2697_oA.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {HOOK_EVENTS} from "./m718.ts";
import {b} from "../runtime.ts";
import {sQ} from "./m721.ts";
function f2n(e,t){if(e.type!==t.type)return!1;let n=(r,o)=>(r.if??"")===(o.if??"");switch(e.type){case"command":{let r=E2e();return t.type==="command"&&e.command===t.command&&Le(e.args??null)===Le(t.args??null)&&(e.shell??r)===(t.shell??r)&&n(e,t)}case"prompt":return t.type==="prompt"&&e.prompt===t.prompt&&n(e,t);case"agent":return t.type==="agent"&&e.prompt===t.prompt&&n(e,t);case"http":return t.type==="http"&&e.url===t.url&&n(e,t);case"mcp_tool":return t.type==="mcp_tool"&&e.server===t.server&&e.tool===t.tool&&Le(e.input??{})===Le(t.input??{})&&n(e,t);case"function":return!1}}
function E$t(e,t,n,r,o,s,i){vFa(e,t,n,r,o,s,i)}
function Dct(e,t,n,r,o,s,i){let a=i?.id||`function-hook-${Date.now()}-${Math.random()}`,l={type:"function",id:a,timeout:i?.timeout||5000,callback:o,errorMessage:s};return vFa(e,t,n,r,l),a}
function vFa(e,t,n,r,o,s,i){e((a)=>{let l=a.sessionHooks.get(t)??{hooks:{}},c=l.hooks[n]||[],u=c.findIndex((m)=>m.matcher===r&&m.skillRoot===i),d;if(u>=0){d=[...c];let m=d[u];d[u]={matcher:m.matcher,skillRoot:m.skillRoot,hooks:[...m.hooks,{hook:o,onHookSuccess:s}]}}else d=[...c,{matcher:r,skillRoot:i,hooks:[{hook:o,onHookSuccess:s}]}];let p={...l.hooks,[n]:d};return a.sessionHooks.set(t,{hooks:p}),a}),logForDebugging(`Added session hook for event ${n} in session ${t}`)}
function Qao(e,t,n,r){e((o)=>{let s=o.sessionHooks.get(t);if(!s)return o;let a=(s.hooks[n]||[]).map((c)=>{let u=c.hooks.filter((d)=>!f2n(d.hook,r));return u.length>0?{...c,hooks:u}:null}).filter((c)=>c!==null),l=a.length>0?{...s.hooks,[n]:a}:{...s.hooks};if(a.length===0)delete l[n];return o.sessionHooks.set(t,{...s,hooks:l}),o}),logForDebugging(`Removed session hook for event ${n} in session ${t}`)}
function CFa(e){return e.map((t)=>({matcher:t.matcher,skillRoot:t.skillRoot,hooks:t.hooks.map((n)=>n.hook).filter((n)=>n.type!=="function")}))}
function gIe(e,t,n){let r=e.sessionHooks.get(t);if(!r)return new Map;let o=new Map;if(n){let s=r.hooks[n];if(s)o.set(n,CFa(s));return o}for(let s of HOOK_EVENTS){let i=r.hooks[s];if(i)o.set(s,CFa(i))}return o}
function wFa(e,t,n){let r=e.sessionHooks.get(t);if(!r)return new Map;let o=new Map,s=(i)=>i.map((a)=>({matcher:a.matcher,hooks:a.hooks.map((l)=>l.hook).filter((l)=>l.type==="function")})).filter((a)=>a.hooks.length>0);if(n){let i=r.hooks[n];if(i){let a=s(i);if(a.length>0)o.set(n,a)}return o}for(let i of HOOK_EVENTS){let a=r.hooks[i];if(a){let l=s(a);if(l.length>0)o.set(i,l)}}return o}
function RFa(e,t,n,r,o){let s=e.sessionHooks.get(t);if(!s)return;let i=s.hooks[n];if(!i)return;for(let a of i)if(a.matcher===r||r===""){let l=a.hooks.find((c)=>f2n(c.hook,o));if(l)return l}return}
function _qe(e,t){e((n)=>(n.sessionHooks.delete(t),n)),logForDebugging(`Cleared all session hooks for session ${t}`)}
function yqe(e){return{add(t,n,r,o,s){E$t(e,t,n,r,o,void 0,s)},remove(t,n,r){Qao(e,t,n,r)},clear(t){_qe(e,t)}}}
var x9=b(()=>{sQ();qe();oA();Xt()});
export {f2n,E$t,Dct,vFa,Qao,CFa,gIe,wFa,RFa,_qe,yqe,x9};
