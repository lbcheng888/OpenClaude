// @ts-nocheck
import {Text} from "./m2423.ts";
import {tn,Hc} from "./m235.ts";
import {Pa,rh} from "./m2539.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function UIm(e){let t=mjl.c(9),{value:n,onChange:r,historyFailedMatch:o}=e,s=o?"no matching prompt:":"search prompts:",i;if(t[0]!==s)i=l5e.createElement(Text,{dimColor:!0},s),t[0]=s,t[1]=i;else i=t[1];let a=tn(n)+1,l;if(t[2]!==r||t[3]!==a||t[4]!==n)l=l5e.createElement(Pa,{value:n,onChange:r,cursorOffset:n.length,onChangeCursorOffset:$Im,columns:a,focus:!0,showCursor:!0,multiline:!1,dimColor:!0}),t[2]=r,t[3]=a,t[4]=n,t[5]=l;else l=t[5];let c;if(t[6]!==i||t[7]!==l)c=l5e.createElement(Box,{gap:1},i,l),t[6]=i,t[7]=l,t[8]=c;else c=t[8];return c}
function $Im(){}
var mjl,l5e,fjl;
var Ajl=b(()=>{Hc();ze();rh();mjl=M(rt(),1),l5e=M(Te(),1);fjl=UIm});
export {UIm,$Im,mjl,l5e,fjl,Ajl};
