// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Iic(e){let t=Hic.c(18),{questions:n,ageLabel:r,ageColor:o}=e,s=n[0];if(!s)return null;let i;if(t[0]!==o||t[1]!==r)i=ML.jsx(Text,{color:o,children:r}),t[0]=o,t[1]=r,t[2]=i;else i=t[2];let a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=ML.jsx(Text,{children:" "}),t[3]=a;else a=t[3];let l;if(t[4]!==s.question)l=ML.jsx(Box,{flexGrow:1,width:0,children:ML.jsx(Text,{bold:!0,wrap:"truncate",children:s.question})}),t[4]=s.question,t[5]=l;else l=t[5];let c;if(t[6]!==n.length)c=n.length>1&&ML.jsx(Box,{flexShrink:0,paddingLeft:1,children:ML.jsxs(Text,{dimColor:!0,children:["+",n.length-1," more \xB7 enter to open"]})}),t[6]=n.length,t[7]=c;else c=t[7];let u;if(t[8]!==i||t[9]!==l||t[10]!==c)u=ML.jsxs(Box,{children:[i,a,l,c]}),t[8]=i,t[9]=l,t[10]=c,t[11]=u;else u=t[11];let d;if(t[12]!==s.options)d=s.options.map(s8m),t[12]=s.options,t[13]=d;else d=t[13];let p;if(t[14]===Symbol.for("react.memo_cache_sentinel"))p=ML.jsx(Box,{paddingLeft:5,children:ML.jsx(Text,{dimColor:!0,children:"or type your own answer below"})}),t[14]=p;else p=t[14];let m;if(t[15]!==u||t[16]!==d)m=ML.jsxs(Box,{flexDirection:"column",children:[u,d,p]}),t[15]=u,t[16]=d,t[17]=m;else m=t[17];return m}
function s8m(e,t){return ML.jsxs(Box,{paddingLeft:2,children:[ML.jsx(Box,{width:3,flexShrink:0,children:ML.jsxs(Text,{dimColor:!0,children:[t+1,"."]})}),ML.jsx(Box,{flexGrow:1,width:0,children:ML.jsxs(Text,{wrap:"truncate",children:[e.label,e.description&&ML.jsxs(Text,{dimColor:!0,children:[" \xB7 ",e.description]})]})})]},e.label)}
function xic(e,t){let n=t?.[0];if(!n||e<"1"||e>"9")return null;let r=Number(e)-1;return n.options[r]?.label??null}
var Hic,ML;
var Dic=b(()=>{je();Hic=x(tt(),1),ML=x(oe(),1)});
export {Iic,s8m,xic,Hic,ML,Dic};
