// @ts-nocheck
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {a3,yje} from "./m642.ts";
import {b} from "../runtime.ts";
function L1e(e,t=300000){let n=(i)=>typeof t==="function"?t(i):t,r=new Map,o=new Map,s=async(...i)=>{let a=TeamDeleteToolName(i),l=r.get(a),c=Date.now();if(!l){let u=o.get(a);if(u)return u;let d=e(...i);o.set(a,d);try{let p=await d;if(o.get(a)===d)r.set(a,{value:p,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(p)});return p}finally{if(o.get(a)===d)o.delete(a)}}if(l&&c-l.timestamp>l.lifetimeMs&&!l.refreshing){l.refreshing=!0;let u=l;return e(...i).then((d)=>{if(r.get(a)===u)r.set(a,{value:d,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(d)})}).catch((d)=>{if(logForDebugging(String(d),{level:"error"}),r.get(a)===u)r.delete(a)}),l.value}return r.get(a).value};return s.cache={clear:()=>{r.clear(),o.clear()}},s}
function Lv(e,t,n=100){let r=new a3({max:n}),o=(...s)=>{let i=t(...s),a=r.get(i);if(a!==void 0)return a;let l=e(...s);return r.set(i,l),l};return o.cache={clear:()=>r.clear(),size:()=>r.size,delete:(s)=>r.delete(s),get:(s)=>r.peek(s),has:(s)=>r.has(s)},o}
function nRt(e,t,n){let r=n?.maxSize??Dou,o=new Map;xou.add(o);function s(...i){let a=t?t(...i):i[0],l=o.get(a);if(l)return l;let c=e(...i);if(o.size>=r)o.delete(o.keys().next().value);return o.set(a,c),c.catch(()=>{if(o.get(a)===c)o.delete(a)}),c}return s.cache=o,s}
var xou,Dou=128;
var v5=b(()=>{yje();qe();tn();xou=new Set});
export {L1e,Lv,nRt,xou,Dou,v5};
