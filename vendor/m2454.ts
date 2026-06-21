// @ts-nocheck
import {useTerminalViewport,d0t} from "./m2440.ts";
import {mr,ki} from "./m2453.ts";
import {measureElement} from "./m2451.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function qZe(e){let t=bwi.c(10),{children:n,lock:r}=e,o=r===void 0?"always":r,[s,i]=useTerminalViewport(),{isVisible:a}=i,{rows:l}=mr(),c=bie.useRef(null),u=bie.useRef(0),[d,p]=bie.useState(0),m;if(t[0]!==s)m=(T)=>{s(T)},t[0]=s,t[1]=m;else m=t[1];let f=m,A=o==="always"||!a,h;if(t[2]!==l)h=()=>{if(!c.current)return;let{height:T}=measureElement(c.current);if(T>u.current)u.current=Math.min(T,l),p(u.current)},t[2]=l,t[3]=h;else h=t[3];bie.useLayoutEffect(h);let g=A?d:void 0,_;if(t[4]!==n)_=bie.default.createElement(Box,{ref:c,flexDirection:"column"},n),t[4]=n,t[5]=_;else _=t[5];let y;if(t[6]!==f||t[7]!==g||t[8]!==_)y=bie.default.createElement(Box,{minHeight:g,ref:f},_),t[6]=f,t[7]=g,t[8]=_,t[9]=y;else y=t[9];return y}
var bwi,bie;
var XSn=b(()=>{ki();d0t();ze();bwi=M(rt(),1),bie=M(Te(),1)});
export {qZe,bwi,bie,XSn};
