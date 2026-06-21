// @ts-nocheck
import {Cn,dr} from "./m231.ts";
import {truncateToWidth,EH} from "./m237.ts";
import {formatSecondsShort,ps} from "./m238.ts";
import {b} from "../runtime.ts";
function f1a(e){if(!e.startsWith(m1a))return"";let t=e.slice(m1a.length),n=[];for(let r=0;r<t.length;r++){let o=t[r];if(o==='"')break;if(o!=="\\"){n.push(o);continue}let s=t[r+1];if(s===void 0)break;if(r++,s==="n")n.push(`
`);else if(s==="t")n.push("\t");else if(s==="r")n.push("\r");else if(s==="u"){let i=t.slice(r+1,r+5);if(i.length<4)break;n.push(String.fromCharCode(parseInt(i,16))),r+=4}else n.push(s)}return n.join("")}
function DUn(e,t,n){if(e.length<=t+n+1)return e.map((r)=>({line:r}));return[...e.slice(0,t).map((r)=>({line:r})),{line:`\u2026 ${e.length-t-n} lines \u2026`,folded:!0},...e.slice(-n).map((r)=>({line:r}))]}
function A1a(e){let t=new Set,n=new Map;for(let r of e){if(t.has(r.data.toolUseId))continue;t.add(r.data.toolUseId),n.set(r.data.toolName,(n.get(r.data.toolName)??0)+1)}return[...n].map(([r,o])=>`${o} ${Cn(o,r,Lbp(r))}`).join(", ")}
function Lbp(e){return/(?:s|sh|ch|x|z)$/i.test(e)?`${e}es`:`${e}s`}
function h1a(e){if(!e||typeof e!=="object")return"";let t=Object.values(e).find((n)=>typeof n==="string");if(typeof t!=="string")return"";return truncateToWidth(t.replace(/\s+/g," "),40)}
function g1a(e){let t=e[0]?.timestamp,n=e.at(-1)?.timestamp;if(!t||!n)return"";let r=Date.parse(n)-Date.parse(t);return Number.isFinite(r)&&r>=0?formatSecondsShort(r):""}
var m1a='{"code":"';
var nao=b(()=>{ps();dr();EH()});
export {f1a,DUn,A1a,Lbp,h1a,g1a,m1a,nao};
