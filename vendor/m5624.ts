// @ts-nocheck
import {SandboxManager,Uh} from "./m2682.ts";
import {Yt,Es} from "./m641.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function DGm(e){let t=e.getHours()%12||12,n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0"),o=e.getHours()<12?"am":"pm";return`${t}:${n}:${r}${o}`}
function S2o(){let e=Gcc.c(15),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=[],e[0]=t;else t=e[0];let[n,r]=Dzt.useState(t),[o,s]=Dzt.useState(0),i,a;if(e[1]===Symbol.for("react.memo_cache_sentinel"))i=()=>{let f=SandboxManager.getSandboxViolationStore();return f.subscribe((g)=>{r(g.slice(-10)),s(f.getTotalCount())})},a=[],e[1]=i,e[2]=a;else i=e[1],a=e[2];if(Dzt.useEffect(i,a),!SandboxManager.isSandboxingEnabled()||Yt()==="linux")return null;if(o===0)return null;let l=o===1?"operation":"operations",c;if(e[3]!==l||e[4]!==o)c=GSe.jsx(Box,{marginLeft:0,children:GSe.jsxs(Text,{color:"permission",children:["\u29C8 Sandbox blocked ",o," total"," ",l]})}),e[3]=l,e[4]=o,e[5]=c;else c=e[5];let u;if(e[6]!==n)u=n.map(PGm),e[6]=n,e[7]=u;else u=e[7];let d=Math.min(10,n.length),p;if(e[8]!==d||e[9]!==o)p=GSe.jsx(Box,{paddingLeft:2,children:GSe.jsxs(Text,{dimColor:!0,children:["\u2026 showing last ",d," of ",o]})}),e[8]=d,e[9]=o,e[10]=p;else p=e[10];let m;if(e[11]!==c||e[12]!==u||e[13]!==p)m=GSe.jsxs(Box,{flexDirection:"column",marginTop:1,children:[c,u,p]}),e[11]=c,e[12]=u,e[13]=p,e[14]=m;else m=e[14];return m}
function PGm(e,t){return GSe.jsx(Box,{paddingLeft:2,children:GSe.jsxs(Text,{dimColor:!0,children:[DGm(e.timestamp),e.command?` ${e.command}:`:""," ",e.line]})},`${e.timestamp.getTime()}-${t}`)}
var Gcc,Dzt,GSe;
var Vcc=b(()=>{je();Uh();Es();Gcc=x(tt(),1),Dzt=x(et(),1),GSe=x(oe(),1)});
export {DGm,S2o,PGm,Gcc,Dzt,GSe,Vcc};
