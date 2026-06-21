// @ts-nocheck
import {SandboxManager,Ag} from "./m2671.ts";
import {zt,qs} from "./m635.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function r$m(e){let t=e.getHours()%12||12,n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0"),o=e.getHours()<12?"am":"pm";return`${t}:${n}:${r}${o}`}
function XMo(){let e=ntc.c(15),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=[],e[0]=t;else t=e[0];let[n,r]=oVt.useState(t),[o,s]=oVt.useState(0),i,a;if(e[1]===Symbol.for("react.memo_cache_sentinel"))i=()=>{let f=SandboxManager.getSandboxViolationStore();return f.subscribe((h)=>{r(h.slice(-10)),s(f.getTotalCount())})},a=[],e[1]=i,e[2]=a;else i=e[1],a=e[2];if(oVt.useEffect(i,a),!SandboxManager.isSandboxingEnabled()||zt()==="linux")return null;if(o===0)return null;let l=o===1?"operation":"operations",c;if(e[3]!==l||e[4]!==o)c=t3.createElement(Box,{marginLeft:0},t3.createElement(Text,{color:"permission"},"\u29C8 Sandbox blocked ",o," total"," ",l)),e[3]=l,e[4]=o,e[5]=c;else c=e[5];let u;if(e[6]!==n)u=n.map(o$m),e[6]=n,e[7]=u;else u=e[7];let d=Math.min(10,n.length),p;if(e[8]!==d||e[9]!==o)p=t3.createElement(Box,{paddingLeft:2},t3.createElement(Text,{dimColor:!0},"\u2026 showing last ",d," of ",o)),e[8]=d,e[9]=o,e[10]=p;else p=e[10];let m;if(e[11]!==c||e[12]!==u||e[13]!==p)m=t3.createElement(Box,{flexDirection:"column",marginTop:1},c,u,p),e[11]=c,e[12]=u,e[13]=p,e[14]=m;else m=e[14];return m}
function o$m(e,t){return t3.createElement(Box,{key:`${e.timestamp.getTime()}-${t}`,paddingLeft:2},t3.createElement(Text,{dimColor:!0},r$m(e.timestamp),e.command?` ${e.command}:`:""," ",e.line))}
var ntc,t3,oVt;
var rtc=b(()=>{ze();Ag();qs();ntc=M(rt(),1),t3=M(Te(),1),oVt=M(Te(),1)});
export {r$m,XMo,o$m,ntc,t3,oVt,rtc};
