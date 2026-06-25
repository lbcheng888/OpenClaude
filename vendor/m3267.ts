// @ts-nocheck
import {ab,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {mk,lr} from "./m233.ts";
import {b} from "../runtime.ts";
import {_3e} from "./m3266.ts";
function ZZr(e){if(!e||!e.trim())return[];let t=ab(e);return t.length>0?t:e.split(/\s+/).filter(Boolean)}
function wPn(e){if(!e)return[];let t=(n)=>typeof n==="string"&&n.trim()!==""&&!/^\d+$/.test(n);if(Array.isArray(e))return e.filter(t);if(typeof e==="string")return e.split(/\s+/).filter(t);return[]}
function Ipa(e,t){let n=e.slice(t.length);if(n.length===0)return;return n.map((r)=>`[${r}]`).join(" ")}
function Pit(e,t,n=!0,r=[],o){if(t===void 0||t===null)return e;let s=(p)=>{let m=(p??"").replaceAll(QZr,"");return o?o(m):m},i=ZZr(t),a=r.map((p,m)=>({name:p,i:m})).filter((p)=>Boolean(p.name)).sort((p,m)=>m.name.length-p.name.length),l=["\\d","ARGUMENTS",...a.map(({name:p})=>`${mk(p)}(?![\\[\\w])`)].join("|"),c=e.replace(new RegExp(`(?<!\\\\)\\\\\\$(?=${l})`,"g"),QZr),u=c!==e;e=c;let d=!1;for(let{name:p,i:m}of a)e=e.replace(new RegExp(`\\$${mk(p)}(?![\\[\\w])`,"g"),()=>(d=!0,s(i[m])));if(e=e.replace(/\$ARGUMENTS\[(\d+)\]/g,(p,m)=>{d=!0;let f=parseInt(m,10);return s(i[f])}),e=e.replace(/\$(\d+)(?!\w)/g,(p,m)=>{d=!0;let f=parseInt(m,10);return s(i[f])}),e=e.replaceAll("$ARGUMENTS",()=>(d=!0,s(t))),!d&&n&&t)e=e+`

ARGUMENTS: ${s(t)}`;if(u)e=e.replaceAll(QZr,"$");return e}
var QZr="\uFFFF";
var XFt=b(()=>{H1();lr();_3e()});
export {ZZr,wPn,Ipa,Pit,QZr,XFt};
