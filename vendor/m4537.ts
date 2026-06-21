// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function cR(e){let t=Aal.c(7),{children:n,subtitle:r}=e,o;if(t[0]!==n)o=_je.createElement(Text,{bold:!0},n),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==r)s=r&&_je.createElement(Text,{dimColor:!0},r),t[2]=r,t[3]=s;else s=t[3];let i;if(t[4]!==o||t[5]!==s)i=_je.createElement(Box,{flexDirection:"column"},o,s),t[4]=o,t[5]=s,t[6]=i;else i=t[6];return i}
var Aal,_je;
var gJ=b(()=>{ze();Aal=M(rt(),1),_je=M(Te(),1)});
export {cR,Aal,_je,gJ};
