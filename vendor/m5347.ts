// @ts-nocheck
import {ejl,tjl} from "./m5346.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {Box} from "./m2422.ts";
import {h0t,Ld} from "./m2459.ts";
import {Text} from "./m2423.ts";
import {uEt,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function njl(){let e=pOo.c(10);ejl();let t=mt(IIm);if(t.length===0)return null;let n,r,o,s;if(e[0]!==t){let a=t.slice().sort(HIm);n=Box,r="column",o=2,s=a.map(kIm),e[0]=t,e[1]=n,e[2]=r,e[3]=o,e[4]=s}else n=e[1],r=e[2],o=e[3],s=e[4];let i;if(e[5]!==n||e[6]!==r||e[7]!==o||e[8]!==s)i=eTe.createElement(n,{flexDirection:r,paddingLeft:o},s),e[5]=n,e[6]=r,e[7]=o,e[8]=s,e[9]=i;else i=e[9];return i}
function kIm(e){return eTe.createElement(DIm,{key:e.key,notice:e})}
function HIm(e,t){return h0t[e.priority]-h0t[t.priority]}
function IIm(e){return e.notifications.pinned}
function DIm(e){let t=pOo.c(5),{notice:n}=e;if("jsx"in n){let s;if(t[0]!==n.jsx)s=eTe.createElement(Text,{color:"warning",wrap:"truncate"},uEt," ",n.jsx),t[0]=n.jsx,t[1]=s;else s=t[1];return s}let r=n.color??"warning",o;if(t[2]!==n.text||t[3]!==r)o=eTe.createElement(Text,{color:r,wrap:"truncate"},uEt," ",n.text),t[2]=n.text,t[3]=r,t[4]=o;else o=t[4];return o}
var pOo,eTe;
var rjl=b(()=>{sl();Ld();ze();configProtoStore();tjl();pOo=M(rt(),1),eTe=M(Te(),1)});
export {njl,kIm,HIm,IIm,DIm,pOo,eTe,rjl};
