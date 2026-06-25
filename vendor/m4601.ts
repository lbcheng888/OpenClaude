// @ts-nocheck
import {Text} from "./m2433.ts";
import {bs,ff} from "./m2561.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ww(e){let t=Ggl.c(10),{title:n,status:r,detail:o}=e,s;if(t[0]!==n)s=eht.jsx(Text,{bold:!0,children:n}),t[0]=n,t[1]=s;else s=t[1];let i;if(t[2]!==r)i=eht.jsx(bs,{status:r}),t[2]=r,t[3]=i;else i=t[3];let a;if(t[4]!==o)a=o?eht.jsxs(Text,{dimColor:!0,children:[" \xB7 ",o]}):null,t[4]=o,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==i||t[8]!==a)l=eht.jsxs(Text,{children:[s," ",i,a]}),t[6]=s,t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
var Ggl,eht;
var tht=b(()=>{je();ff();Ggl=x(tt(),1),eht=x(oe(),1)});
export {Ww,Ggl,eht,tht};
