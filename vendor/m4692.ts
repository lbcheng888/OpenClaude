// @ts-nocheck
import {W5r,bs,ff} from "./m2561.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function YI(e){let t=XSl.c(9),{status:n,children:r}=e,{color:o}=W5r[n],s;if(t[0]!==n)s=pWe.jsx(Box,{width:2,flexShrink:0,children:pWe.jsx(bs,{status:n})}),t[0]=n,t[1]=s;else s=t[1];let i=!o,a;if(t[2]!==r||t[3]!==o||t[4]!==i)a=pWe.jsx(Box,{flexGrow:1,flexShrink:1,children:pWe.jsx(Text,{color:o,dimColor:i,children:r})}),t[2]=r,t[3]=o,t[4]=i,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==a)l=pWe.jsxs(Box,{flexDirection:"row",children:[s,a]}),t[6]=s,t[7]=a,t[8]=l;else l=t[8];return l}
var XSl,pWe;
var yht=b(()=>{je();ff();XSl=x(tt(),1),pWe=x(oe(),1)});
export {YI,XSl,pWe,yht};
