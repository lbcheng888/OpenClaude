// @ts-nocheck
import {useTerminalViewport,$Pt} from "./m2450.ts";
import {_r,ui} from "./m2463.ts";
import {measureElement} from "./m2461.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Gtt(e){let t=Uxi.c(10),{children:n,lock:r}=e,o=r===void 0?"always":r,[s,i]=useTerminalViewport(),{isVisible:a}=i,{rows:l}=_r(),c=T2e.useRef(null),u=T2e.useRef(0),[d,p]=T2e.useState(0),m;if(t[0]!==s)m=(S)=>{s(S)},t[0]=s,t[1]=m;else m=t[1];let f=m,h=o==="always"||!a,g;if(t[2]!==l)g=()=>{if(!c.current)return;let{height:S}=measureElement(c.current);if(S>u.current)u.current=Math.min(S,l),p(u.current)},t[2]=l,t[3]=g;else g=t[3];T2e.useLayoutEffect(g);let _=h?d:void 0,T;if(t[4]!==n)T=d6r.jsx(Box,{ref:c,flexDirection:"column",children:n}),t[4]=n,t[5]=T;else T=t[5];let y;if(t[6]!==f||t[7]!==_||t[8]!==T)y=d6r.jsx(Box,{minHeight:_,ref:f,children:T}),t[6]=f,t[7]=_,t[8]=T,t[9]=y;else y=t[9];return y}
var Uxi,T2e,d6r;
var FAn=b(()=>{ui();$Pt();je();Uxi=x(tt(),1),T2e=x(et(),1),d6r=x(oe(),1)});
export {Gtt,Uxi,T2e,d6r,FAn};
