// @ts-nocheck
import {f3r,Bs,rA} from "./m2550.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function GP(e){let t=Iml.c(9),{status:n,children:r}=e,{color:o}=f3r[n],s;if(t[0]!==n)s=Rne.createElement(Box,{width:2,flexShrink:0},Rne.createElement(Bs,{status:n})),t[0]=n,t[1]=s;else s=t[1];let i=!o,a;if(t[2]!==r||t[3]!==o||t[4]!==i)a=Rne.createElement(Box,{flexGrow:1,flexShrink:1},Rne.createElement(Text,{color:o,dimColor:i},r)),t[2]=r,t[3]=o,t[4]=i,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==a)l=Rne.createElement(Box,{flexDirection:"row"},s,a),t[6]=s,t[7]=a,t[8]=l;else l=t[8];return l}
var Iml,Rne;
var ljt=b(()=>{ze();rA();Iml=M(rt(),1),Rne=M(Te(),1)});
export {GP,Iml,Rne,ljt};
