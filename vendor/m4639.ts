// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {l7n,bvo} from "./m4638.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Eyl(){let e=byl.c(8),{rows:t}=_r(),n=t<Bnm,r=n?0:1,o=n?0:1,s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s=dJ.jsx(Box,{flexShrink:0,children:dJ.jsx(Text,{children:"Claude understands your codebase, makes edits with your permission, and executes commands \u2014 right from your terminal."})}),e[0]=s;else s=e[0];let i;if(e[1]!==n)i=!n&&dJ.jsx(Box,{children:dJ.jsxs(Text,{dimColor:!0,children:["New here? Run ",dJ.jsx(Text,{color:"suggestion",children:"/powerup"})," to learn the features most people miss."]})}),e[1]=n,e[2]=i;else i=e[2];let a;if(e[3]===Symbol.for("react.memo_cache_sentinel"))a=dJ.jsxs(Box,{flexDirection:"column",children:[dJ.jsx(Box,{flexShrink:0,children:dJ.jsx(Text,{bold:!0,children:"Shortcuts"})}),dJ.jsx(l7n,{gap:2,fixedWidth:!0})]}),e[3]=a;else a=e[3];let l;if(e[4]!==r||e[5]!==o||e[6]!==i)l=dJ.jsxs(Box,{flexDirection:"column",paddingY:r,gap:o,children:[s,i,a]}),e[4]=r,e[5]=o,e[6]=i,e[7]=l;else l=e[7];return l}
var byl,dJ,Bnm=44;
var Cyl=b(()=>{ui();je();bvo();byl=x(tt(),1),dJ=x(oe(),1)});
export {Eyl,byl,dJ,Bnm,Cyl};
