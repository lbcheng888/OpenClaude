// @ts-nocheck
import {AUi,fUi,xz} from "../src/agent/2734_partialTextChars.ts";
import {r2n,jao} from "./m4013.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {pr} from "./m2562.ts";
import {Tm,Fk} from "./m3341.ts";
import {b,M} from "../runtime.ts";
import {yb} from "./m4521.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function SVl(e){let t=TVl.c(27),{payload:n,answer:r}=e,o;if(t[0]!==n.fallbackModel||t[1]!==n.originalModel)o=AUi(n.originalModel,n.fallbackModel),t[0]=n.fallbackModel,t[1]=n.originalModel,t[2]=o;else o=t[2];let s=o,i;if(t[3]!==s.retry_fallback)i={value:"retry_fallback",label:s.retry_fallback},t[3]=s.retry_fallback,t[4]=i;else i=t[4];let a;if(t[5]!==s.edit_prompt)a={value:"edit_prompt",label:s.edit_prompt},t[5]=s.edit_prompt,t[6]=a;else a=t[6];let l;if(t[7]!==i||t[8]!==a)l=[i,a],t[7]=i,t[8]=a,t[9]=l;else l=t[9];let c=l,u;if(t[10]!==n.apiRefusalCategory||t[11]!==n.originalModel)u=fUi(n.originalModel,n.apiRefusalCategory),t[10]=n.apiRefusalCategory,t[11]=n.originalModel,t[12]=u;else u=t[12];let d;if(t[13]!==u)d=e3.createElement(r2n,null,u),t[13]=u,t[14]=d;else d=t[14];let p;if(t[15]!==n.guidanceText)p=n.guidanceText!==void 0&&e3.createElement(Box,{marginTop:1},e3.createElement(Text,{color:"inactive"},n.guidanceText)),t[15]=n.guidanceText,t[16]=p;else p=t[16];let m;if(t[17]!==r)m=()=>r("cancelled"),t[17]=r,t[18]=m;else m=t[18];let f;if(t[19]!==r||t[20]!==c||t[21]!==m)f=e3.createElement(Box,{marginTop:1},e3.createElement(pr,{options:c,onChange:r,onCancel:m})),t[19]=r,t[20]=c,t[21]=m,t[22]=f;else f=t[22];let A;if(t[23]!==d||t[24]!==p||t[25]!==f)A=e3.createElement(Tm,{color:"warning",title:"Session paused"},e3.createElement(Box,{flexDirection:"column",marginTop:1,paddingX:1},d,p,f)),t[23]=d,t[24]=p,t[25]=f,t[26]=A;else A=t[26];return A}
var TVl,e3;
var bVl=b(()=>{yb();Fk();jao();ze();xz();TVl=M(rt(),1),e3=M(Te(),1)});
export {SVl,TVl,e3,bVl};
