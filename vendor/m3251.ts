// @ts-nocheck
import {lb,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {VI,dr} from "./m231.ts";
import {b} from "../runtime.ts";
import {Dot} from "./m3250.ts";
function hYr(e){if(!e||!e.trim())return[];let t=lb(e);return t.length>0?t:e.split(/\s+/).filter(Boolean)}
function NIn(e){if(!e)return[];let t=(n)=>typeof n==="string"&&n.trim()!==""&&!/^\d+$/.test(n);if(Array.isArray(e))return e.filter(t);if(typeof e==="string")return e.split(/\s+/).filter(t);return[]}
function Csa(e,t){let n=e.slice(t.length);if(n.length===0)return;return n.map((r)=>`[${r}]`).join(" ")}
function Pot(e,t,n=!0,r=[],o){if(t===void 0||t===null)return e;let s=(p)=>{let m=(p??"").replaceAll(AYr,"");return o?o(m):m},i=hYr(t),a=r.map((p,m)=>({name:p,i:m})).filter((p)=>Boolean(p.name)).sort((p,m)=>m.name.length-p.name.length),l=["\\d","ARGUMENTS",...a.map(({name:p})=>`${VI(p)}(?![\\[\\w])`)].join("|"),c=e.replace(new RegExp(`(?<!\\\\)\\\\\\$(?=${l})`,"g"),AYr),u=c!==e;e=c;let d=!1;for(let{name:p,i:m}of a)e=e.replace(new RegExp(`\\$${VI(p)}(?![\\[\\w])`,"g"),()=>(d=!0,s(i[m])));if(e=e.replace(/\$ARGUMENTS\[(\d+)\]/g,(p,m)=>{d=!0;let f=parseInt(m,10);return s(i[f])}),e=e.replace(/\$(\d+)(?!\w)/g,(p,m)=>{d=!0;let f=parseInt(m,10);return s(i[f])}),e=e.replaceAll("$ARGUMENTS",()=>(d=!0,s(t))),!d&&n&&t)e=e+`

ARGUMENTS: ${s(t)}`;if(u)e=e.replaceAll(AYr,"$");return e}
var AYr="\uFFFF";
var T1t=b(()=>{AN();dr();Dot()});
export {hYr,NIn,Csa,Pot,AYr,T1t};
