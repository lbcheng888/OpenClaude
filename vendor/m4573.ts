// @ts-nocheck
import {Text} from "./m2423.ts";
import {Bs,rA} from "./m2550.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Hx(e){let t=ccl.c(10),{title:n,status:r,detail:o}=e,s;if(t[0]!==n)s=R6t.default.createElement(Text,{bold:!0},n),t[0]=n,t[1]=s;else s=t[1];let i;if(t[2]!==r)i=R6t.default.createElement(Bs,{status:r}),t[2]=r,t[3]=i;else i=t[3];let a;if(t[4]!==o)a=o?R6t.default.createElement(Text,{dimColor:!0}," \xB7 ",o):null,t[4]=o,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==i||t[8]!==a)l=R6t.default.createElement(Text,null,s," ",i,a),t[6]=s,t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
var ccl,R6t;
var Ypt=b(()=>{ze();rA();ccl=M(rt(),1),R6t=M(Te(),1)});
export {Hx,ccl,R6t,Ypt};
