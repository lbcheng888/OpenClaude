// @ts-nocheck
import {Text} from "./m2433.ts";
import {sn,mc} from "./m237.ts";
import {ga,rh} from "./m2550.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function jFm(e){let t=Vjl.c(9),{value:n,onChange:r,historyFailedMatch:o}=e,s=o?"no matching prompt:":"search prompts:",i;if(t[0]!==s)i=q7t.jsx(Text,{dimColor:!0,children:s}),t[0]=s,t[1]=i;else i=t[1];let a=sn(n)+1,l;if(t[2]!==r||t[3]!==a||t[4]!==n)l=q7t.jsx(ga,{value:n,onChange:r,cursorOffset:n.length,onChangeCursorOffset:YFm,columns:a,focus:!0,showCursor:!0,multiline:!1,dimColor:!0}),t[2]=r,t[3]=a,t[4]=n,t[5]=l;else l=t[5];let c;if(t[6]!==i||t[7]!==l)c=q7t.jsxs(Box,{gap:1,children:[i,l]}),t[6]=i,t[7]=l,t[8]=c;else c=t[8];return c}
function YFm(){}
var Vjl,q7t,Kjl;
var zjl=b(()=>{mc();je();rh();Vjl=x(tt(),1),q7t=x(oe(),1);Kjl=jFm});
export {jFm,YFm,Vjl,q7t,Kjl,zjl};
