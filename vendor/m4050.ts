// @ts-nocheck
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {formatDuration,Xo} from "./m240.ts";
import {Text} from "./m2433.ts";
import {Ql,Pa} from "./m720.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function bDp(e){switch(e){case"completed":return"success";case"failed":return"error";case"killed":return"warning";default:return"text"}}
function H4a(e){let t=k4a.c(19),{addMargin:n,param:r}=e,{text:o}=r,s;if(t[0]!==o)s=fl(o,"summary"),t[0]=o,t[1]=s;else s=t[1];let i=s;if(!i)return null;let a;if(t[2]!==o){let T=fl(o,"status");a=bDp(T),t[2]=o,t[3]=a}else a=t[3];let l=a,c;if(t[4]!==o)c=fl(o,"duration_ms"),t[4]=o,t[5]=c;else c=t[5];let u=Number(c),d;if(t[6]!==u)d=Number.isFinite(u)&&u>0?` \xB7 ${formatDuration(u)}`:null,t[6]=u,t[7]=d;else d=t[7];let p=d,m=n?1:0,f;if(t[8]!==l)f=Fdt.jsx(Text,{color:l,children:Ql}),t[8]=l,t[9]=f;else f=t[9];let h;if(t[10]!==p)h=p&&Fdt.jsx(Text,{dimColor:!0,children:p}),t[10]=p,t[11]=h;else h=t[11];let g;if(t[12]!==i||t[13]!==f||t[14]!==h)g=Fdt.jsxs(Text,{children:[f," ",i,h]}),t[12]=i,t[13]=f,t[14]=h,t[15]=g;else g=t[15];let _;if(t[16]!==m||t[17]!==g)_=Fdt.jsx(Box,{marginTop:m,children:g}),t[16]=m,t[17]=g,t[18]=_;else _=t[18];return _}
var k4a,Fdt;
var I4a=b(()=>{Pa();je();Xo();po();k4a=x(tt(),1),Fdt=x(oe(),1)});
export {bDp,H4a,k4a,Fdt,I4a};
