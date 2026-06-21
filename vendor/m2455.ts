// @ts-nocheck
import {NoSelect} from "./m2437.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {qZe,XSn} from "./m2454.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Gn(e){let t=O$r.c(11),{children:n,height:r,screenReaderLabel:o}=e;if(L$r.useContext(M$r))return n;let i=o===void 0,a;if(t[0]!==o||t[1]!==i)a=q1.createElement(NoSelect,{fromLeftEdge:!0,flexShrink:0},q1.createElement(Text,{"aria-hidden":i,"aria-label":o,dimColor:!0},"  ","\u23BF \xA0")),t[0]=o,t[1]=i,t[2]=a;else a=t[2];let l;if(t[3]!==n)l=q1.createElement(Box,{flexShrink:1,flexGrow:1},n),t[3]=n,t[4]=l;else l=t[4];let c;if(t[5]!==r||t[6]!==a||t[7]!==l)c=q1.createElement(Rld,null,q1.createElement(Box,{flexDirection:"row",height:r,overflowY:"hidden"},a,l)),t[5]=r,t[6]=a,t[7]=l,t[8]=c;else c=t[8];let u=c;if(r!==void 0)return u;let d;if(t[9]!==u)d=q1.createElement(qZe,{lock:"offscreen"},u),t[9]=u,t[10]=d;else d=t[10];return d}
function Ewi(){return L$r.useContext(M$r)}
function Rld(e){let t=O$r.c(2),{children:n}=e,r;if(t[0]!==n)r=q1.createElement(M$r.Provider,{value:!0},n),t[0]=n,t[1]=r;else r=t[1];return r}
var O$r,q1,L$r,M$r;
var sc=b(()=>{ze();XSn();O$r=M(rt(),1),q1=M(Te(),1),L$r=M(Te(),1);M$r=q1.createContext(!1)});
export {Gn,Ewi,Rld,O$r,q1,L$r,M$r,sc};
