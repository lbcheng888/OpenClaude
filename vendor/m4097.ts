// @ts-nocheck
import {H$e,Zm} from "../src/config/2709_Zm.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {HOOK_EVENTS} from "./m723.ts";
import {b} from "../runtime.ts";
import {isBundledSkillsDisabled} from "./m726.ts";
function e4n(e,t){if(e.type!==t.type)return!1;let n=(r,o)=>(r.if??"")===(o.if??"");switch(e.type){case"command":{let r=H$e();return t.type==="command"&&e.command===t.command&&TeamDeleteToolName(e.args??null)===TeamDeleteToolName(t.args??null)&&(e.shell??r)===(t.shell??r)&&n(e,t)}case"prompt":return t.type==="prompt"&&e.prompt===t.prompt&&n(e,t);case"agent":return t.type==="agent"&&e.prompt===t.prompt&&n(e,t);case"http":return t.type==="http"&&e.url===t.url&&n(e,t);case"mcp_tool":return t.type==="mcp_tool"&&e.server===t.server&&e.tool===t.tool&&TeamDeleteToolName(e.input??{})===TeamDeleteToolName(t.input??{})&&n(e,t);case"function":return!1}}
function l4t(e,t,n,r,o,s,i){Z6a(e,t,n,r,o,s,i)}
function Q6a(e,t,n,r,o,s,i){let a=i?.id||`function-hook-${Date.now()}-${Math.random()}`,l={type:"function",id:a,timeout:i?.timeout||5000,callback:o,errorMessage:s};return Z6a(e,t,n,r,l),a}
function Z6a(e,t,n,r,o,s,i){e((a)=>{let l=a.sessionHooks.get(t)??{hooks:{}},c=l.hooks[n]||[],u=c.findIndex((m)=>m.matcher===r&&m.skillRoot===i),d;if(u>=0){d=[...c];let m=d[u],f=o.type==="function"&&o.id?m.hooks.findIndex((g)=>g.hook.type==="function"&&g.hook.id===o.id):-1,h=f>=0?m.hooks.with(f,{hook:o,onHookSuccess:s}):[...m.hooks,{hook:o,onHookSuccess:s}];d[u]={matcher:m.matcher,skillRoot:m.skillRoot,hooks:h}}else d=[...c,{matcher:r,skillRoot:i,hooks:[{hook:o,onHookSuccess:s}]}];let p={...l.hooks,[n]:d};return a.sessionHooks.set(t,{hooks:p}),a}),logForDebugging(`Added session hook for event ${n} in session ${t}`)}
function Fmo(e,t,n,r){e((o)=>{let s=o.sessionHooks.get(t);if(!s)return o;let a=(s.hooks[n]||[]).map((c)=>{let u=c.hooks.filter((d)=>!e4n(d.hook,r));return u.length>0?{...c,hooks:u}:null}).filter((c)=>c!==null),l=a.length>0?{...s.hooks,[n]:a}:{...s.hooks};if(a.length===0)delete l[n];return o.sessionHooks.set(t,{...s,hooks:l}),o}),logForDebugging(`Removed session hook for event ${n} in session ${t}`)}
function X6a(e){return e.map((t)=>({matcher:t.matcher,skillRoot:t.skillRoot,hooks:t.hooks.map((n)=>n.hook).filter((n)=>n.type!=="function")}))}
function vxe(e,t,n){let r=e.sessionHooks.get(t);if(!r)return new Map;let o=new Map;if(n){let s=r.hooks[n];if(s)o.set(n,X6a(s));return o}for(let s of HOOK_EVENTS){let i=r.hooks[s];if(i)o.set(s,X6a(i))}return o}
function e5a(e,t,n){let r=e.sessionHooks.get(t);if(!r)return new Map;let o=new Map,s=(i)=>i.map((a)=>({matcher:a.matcher,hooks:a.hooks.map((l)=>l.hook).filter((l)=>l.type==="function")})).filter((a)=>a.hooks.length>0);if(n){let i=r.hooks[n];if(i){let a=s(i);if(a.length>0)o.set(n,a)}return o}for(let i of HOOK_EVENTS){let a=r.hooks[i];if(a){let l=s(a);if(l.length>0)o.set(i,l)}}return o}
function t5a(e,t,n,r,o){let s=e.sessionHooks.get(t);if(!s)return;let i=s.hooks[n];if(!i)return;for(let a of i)if(a.matcher===r||r===""){let l=a.hooks.find((c)=>e4n(c.hook,o));if(l)return l}return}
function Bmo(e,t){e((n)=>(n.sessionHooks.delete(t),n)),logForDebugging(`Cleared all session hooks for session ${t}`)}
function j6e(e){return{add(t,n,r,o,s){l4t(e,t,n,r,o,void 0,s)},remove(t,n,r){Fmo(e,t,n,r)},clear(t){Bmo(e,t)}}}
var vY=b(()=>{isBundledSkillsDisabled();qe();Zm();tn()});
export {e4n,l4t,Q6a,Z6a,Fmo,X6a,vxe,e5a,t5a,Bmo,j6e,vY};
