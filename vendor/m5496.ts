// @ts-nocheck
import {i6i,s6i,nj} from "../src/agent/2746_partialTextChars.ts";
import {q3n,kmo} from "./m4077.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {hr} from "./m2573.ts";
import {hm,DI} from "./m3357.ts";
import {b,x} from "../runtime.ts";
import {TS} from "./m4541.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function oec(e){let t=rec.c(27),{payload:n,answer:r}=e,o;if(t[0]!==n.fallbackModel||t[1]!==n.originalModel)o=i6i(n.originalModel,n.fallbackModel),t[0]=n.fallbackModel,t[1]=n.originalModel,t[2]=o;else o=t[2];let s=o,i;if(t[3]!==s.retry_fallback)i={value:"retry_fallback",label:s.retry_fallback},t[3]=s.retry_fallback,t[4]=i;else i=t[4];let a;if(t[5]!==s.edit_prompt)a={value:"edit_prompt",label:s.edit_prompt},t[5]=s.edit_prompt,t[6]=a;else a=t[6];let l;if(t[7]!==i||t[8]!==a)l=[i,a],t[7]=i,t[8]=a,t[9]=l;else l=t[9];let c=l,u;if(t[10]!==n.apiRefusalCategory||t[11]!==n.originalModel)u=s6i(n.originalModel,n.apiRefusalCategory),t[10]=n.apiRefusalCategory,t[11]=n.originalModel,t[12]=u;else u=t[12];let d;if(t[13]!==u)d=USe.jsx(q3n,{children:u}),t[13]=u,t[14]=d;else d=t[14];let p;if(t[15]!==n.guidanceText)p=n.guidanceText!==void 0&&USe.jsx(Box,{marginTop:1,children:USe.jsx(Text,{color:"inactive",children:n.guidanceText})}),t[15]=n.guidanceText,t[16]=p;else p=t[16];let m;if(t[17]!==r)m=()=>r("cancelled"),t[17]=r,t[18]=m;else m=t[18];let f;if(t[19]!==r||t[20]!==c||t[21]!==m)f=USe.jsx(Box,{marginTop:1,children:USe.jsx(hr,{options:c,onChange:r,onCancel:m})}),t[19]=r,t[20]=c,t[21]=m,t[22]=f;else f=t[22];let h;if(t[23]!==d||t[24]!==p||t[25]!==f)h=USe.jsx(hm,{color:"warning",title:"Session paused",children:USe.jsxs(Box,{flexDirection:"column",marginTop:1,paddingX:1,children:[d,p,f]})}),t[23]=d,t[24]=p,t[25]=f,t[26]=h;else h=t[26];return h}
var rec,USe;
var sec=b(()=>{TS();DI();kmo();je();nj();rec=x(tt(),1),USe=x(oe(),1)});
export {oec,rec,USe,sec};
