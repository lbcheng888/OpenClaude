// @ts-nocheck
import {Djl,Pjl} from "./m5378.ts";
import {_t,uo} from "./m2468.ts";
import {Box} from "./m2432.ts";
import {VPt,fd} from "./m2469.ts";
import {Text} from "./m2433.ts";
import {NRt,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ojl(){let e=xFo.c(10);Djl();let t=_t(BFm);if(t.length===0)return null;let n,r,o,s;if(e[0]!==t){let a=t.slice().sort(FFm);n=Box,r="column",o=2,s=a.map(NFm),e[0]=t,e[1]=n,e[2]=r,e[3]=o,e[4]=s}else n=e[1],r=e[2],o=e[3],s=e[4];let i;if(e[5]!==n||e[6]!==r||e[7]!==o||e[8]!==s)i=uyt.jsx(n,{flexDirection:r,paddingLeft:o,children:s}),e[5]=n,e[6]=r,e[7]=o,e[8]=s,e[9]=i;else i=e[9];return i}
function NFm(e){return uyt.jsx(UFm,{notice:e},e.key)}
function FFm(e,t){return VPt[e.priority]-VPt[t.priority]}
function BFm(e){return e.notifications.pinned}
function UFm(e){let t=xFo.c(5),{notice:n}=e;if("jsx"in n){let s;if(t[0]!==n.jsx)s=uyt.jsxs(Text,{color:"warning",wrap:"truncate",children:[NRt," ",n.jsx]}),t[0]=n.jsx,t[1]=s;else s=t[1];return s}let r=n.color??"warning",o;if(t[2]!==n.text||t[3]!==r)o=uyt.jsxs(Text,{color:r,wrap:"truncate",children:[NRt," ",n.text]}),t[2]=n.text,t[3]=r,t[4]=o;else o=t[4];return o}
var xFo,uyt;
var Ljl=b(()=>{Pa();fd();je();uo();Pjl();xFo=x(tt(),1),uyt=x(oe(),1)});
export {Ojl,NFm,FFm,BFm,UFm,xFo,uyt,Ljl};
