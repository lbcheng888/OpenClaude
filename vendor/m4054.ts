// @ts-nocheck
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {xv,Ud} from "./m615.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function B4a(e){let t=F4a.c(19),{addMargin:n,param:r}=e,{text:o}=r,s;if(t[0]!==o)s=fl(o,xv),t[0]=o,t[1]=s;else s=t[1];let i=s,a;if(t[2]!==o)a=fl(o,"command-args"),t[2]=o,t[3]=a;else a=t[3];let l=a,c=fl(o,"skill-format")==="true";if(!i)return null;if(c){let g=n?1:0,_;if(t[4]===Symbol.for("react.memo_cache_sentinel"))_=Tce.jsxs(Text,{color:"subtle",children:[Xe.pointer," "]}),t[4]=_;else _=t[4];let T;if(t[5]!==i)T=Tce.jsxs(Text,{children:[_,Tce.jsxs(Text,{color:"text",children:["Skill(",i,")"]})]}),t[5]=i,t[6]=T;else T=t[6];let y;if(t[7]!==g||t[8]!==T)y=Tce.jsx(Box,{flexDirection:"column",marginTop:g,backgroundColor:"userMessageBackground",paddingRight:1,children:T}),t[7]=g,t[8]=T,t[9]=y;else y=t[9];return y}let u;if(t[10]!==l||t[11]!==i)u=[i,l].filter(Boolean),t[10]=l,t[11]=i,t[12]=u;else u=t[12];let d=`/${u.join(" ")}`,p=n?1:0,m;if(t[13]===Symbol.for("react.memo_cache_sentinel"))m=Tce.jsxs(Text,{color:"subtle",children:[Xe.pointer," "]}),t[13]=m;else m=t[13];let f;if(t[14]!==d)f=Tce.jsxs(Text,{children:[m,Tce.jsx(Text,{color:"text",children:d})]}),t[14]=d,t[15]=f;else f=t[15];let h;if(t[16]!==p||t[17]!==f)h=Tce.jsx(Box,{flexDirection:"column",marginTop:p,backgroundColor:"userMessageBackground",paddingRight:1,children:f}),t[16]=p,t[17]=f,t[18]=h;else h=t[18];return h}
var F4a,Tce;
var U4a=b(()=>{Zs();Ud();je();po();F4a=x(tt(),1),Tce=x(oe(),1)});
export {B4a,F4a,Tce,U4a};
