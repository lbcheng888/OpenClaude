// @ts-nocheck
import {Box} from "./m2432.ts";
import {Button} from "./m2443.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function blc(e){let t=Slc.c(10),{options:n,optionWidth:r,onSelect:o,marginTop:s}=e,i;if(t[0]!==o||t[1]!==r||t[2]!==n){let l;if(t[4]!==o||t[5]!==r)l=(c)=>{let{key:u,label:d}=c;return uVe.jsx(Box,{width:r,children:uVe.jsx(Button,{tabIndex:-1,onAction:()=>o(u),children:(p)=>{let{hovered:m}=p;return uVe.jsxs(Text,{backgroundColor:m?"userMessageBackgroundHover":void 0,children:[uVe.jsx(Text,{color:"ansi:cyan",children:u}),": ",d]})}})},u)},t[4]=o,t[5]=r,t[6]=l;else l=t[6];i=n.map(l),t[0]=o,t[1]=r,t[2]=n,t[3]=i}else i=t[3];let a;if(t[7]!==s||t[8]!==i)a=uVe.jsx(Box,{marginLeft:2,marginTop:s,children:i}),t[7]=s,t[8]=i,t[9]=a;else a=t[9];return a}
var Slc,uVe;
var Elc=b(()=>{je();Slc=x(tt(),1),uVe=x(oe(),1)});
export {blc,Slc,uVe,Elc};
