// @ts-nocheck
import {Sn,lr} from "./m233.ts";
import {truncateToWidth,XH} from "./m239.ts";
import {formatSecondsShort,Xo} from "./m240.ts";
import {b} from "../runtime.ts";
function B3a(e){if(!e.startsWith(F3a))return"";let t=e.slice(F3a.length),n=[];for(let r=0;r<t.length;r++){let o=t[r];if(o==='"')break;if(o!=="\\"){n.push(o);continue}let s=t[r+1];if(s===void 0)break;if(r++,s==="n")n.push(`
`);else if(s==="t")n.push("\t");else if(s==="r")n.push("\r");else if(s==="u"){let i=t.slice(r+1,r+5);if(i.length<4)break;n.push(String.fromCharCode(parseInt(i,16))),r+=4}else n.push(s)}return n.join("")}
function h3n(e,t,n){if(e.length<=t+n+1)return e.map((r)=>({line:r}));return[...e.slice(0,t).map((r)=>({line:r})),{line:`\u2026 ${e.length-t-n} lines \u2026`,folded:!0},...e.slice(-n).map((r)=>({line:r}))]}
function U3a(e){let t=new Set,n=new Map;for(let r of e){if(t.has(r.data.toolUseId))continue;t.add(r.data.toolUseId),n.set(r.data.toolName,(n.get(r.data.toolName)??0)+1)}return[...n].map(([r,o])=>`${o} ${Sn(o,r,Hxp(r))}`).join(", ")}
function Hxp(e){return/(?:s|sh|ch|x|z)$/i.test(e)?`${e}es`:`${e}s`}
function $3a(e){if(!e||typeof e!=="object")return"";let t=Object.values(e).find((n)=>typeof n==="string");if(typeof t!=="string")return"";return truncateToWidth(t.replace(/\s+/g," "),40)}
function q3a(e){let t=e[0]?.timestamp,n=e.at(-1)?.timestamp;if(!t||!n)return"";let r=Date.parse(n)-Date.parse(t);return Number.isFinite(r)&&r>=0?formatSecondsShort(r):""}
var F3a='{"code":"';
var Upo=b(()=>{Xo();lr();XH()});
export {B3a,h3n,U3a,Hxp,$3a,q3a,F3a,Upo};
