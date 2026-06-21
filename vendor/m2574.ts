// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function ic(e){let t=e0i.c(9),{children:n,hint:r}=e;if(!r){let a;if(t[0]!==n)a=bAe.createElement(Text,{dimColor:!0},n),t[0]=n,t[1]=a;else a=t[1];return a}let o;if(t[2]!==n)o=bAe.createElement(Text,{dimColor:!0},n),t[2]=n,t[3]=o;else o=t[3];let s;if(t[4]!==r)s=bAe.createElement(Text,{dimColor:!0},r),t[4]=r,t[5]=s;else s=t[5];let i;if(t[6]!==o||t[7]!==s)i=bAe.createElement(Box,{flexDirection:"column"},o,s),t[6]=o,t[7]=s,t[8]=i;else i=t[8];return i}
var e0i,bAe;
var Ny=b(()=>{ze();e0i=M(rt(),1),bAe=M(Te(),1)});
export {ic,e0i,bAe,Ny};
