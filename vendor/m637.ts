// @ts-nocheck
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {j3,S7e} from "./m636.ts";
import {b} from "../runtime.ts";
function qMe(e,t=300000){let n=(i)=>typeof t==="function"?t(i):t,r=new Map,o=new Map,s=async(...i)=>{let a=Le(i),l=r.get(a),c=Date.now();if(!l){let u=o.get(a);if(u)return u;let d=e(...i);o.set(a,d);try{let p=await d;if(o.get(a)===d)r.set(a,{value:p,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(p)});return p}finally{if(o.get(a)===d)o.delete(a)}}if(l&&c-l.timestamp>l.lifetimeMs&&!l.refreshing){l.refreshing=!0;let u=l;return e(...i).then((d)=>{if(r.get(a)===u)r.set(a,{value:d,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(d)})}).catch((d)=>{if(logForDebugging(String(d),{level:"error"}),r.get(a)===u)r.delete(a)}),l.value}return r.get(a).value};return s.cache={clear:()=>{r.clear(),o.clear()}},s}
function CR(e,t,n=100){let r=new j3({max:n}),o=(...s)=>{let i=t(...s),a=r.get(i);if(a!==void 0)return a;let l=e(...s);return r.set(i,l),l};return o.cache={clear:()=>r.clear(),size:()=>r.size,delete:(s)=>r.delete(s),get:(s)=>r.peek(s),has:(s)=>r.has(s)},o}
function Hbt(e,t,n){let r=n?.maxSize??Azc,o=new Map;fzc.add(o);function s(...i){let a=t?t(...i):i[0],l=o.get(a);if(l)return l;let c=e(...i);if(o.size>=r)o.delete(o.keys().next().value);return o.set(a,c),c.catch(()=>{if(o.get(a)===c)o.delete(a)}),c}return s.cache=o,s}
var fzc,Azc=128;
var u8=b(()=>{S7e();qe();Xt();fzc=new Set});
export {qMe,CR,Hbt,fzc,Azc,u8};
