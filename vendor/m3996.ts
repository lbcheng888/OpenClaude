// @ts-nocheck
import {cL,po} from "../src/tools/5224_userPromptCount.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Ql,Pa} from "./m720.ts";
import {Yn,Pl} from "./m2465.ts";
import {dr,uc} from "./m2558.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function P9a(e){let t=D9a.c(24),{message:n,screen:r}=e,o=r==="transcript",s;if(t[0]!==n)s=cL(n)||"",t[0]=n,t[1]=s;else s=t[1];let i=s,a=n.summarizeMetadata;if(a){let m;if(t[2]===Symbol.for("react.memo_cache_sentinel"))m=MC.jsx(Box,{minWidth:2,children:MC.jsx(Text,{"aria-hidden":!0,color:"text",children:Ql})}),t[2]=m;else m=t[2];let f;if(t[3]===Symbol.for("react.memo_cache_sentinel"))f=MC.jsx(Text,{bold:!0,children:"Summarized conversation"}),t[3]=f;else f=t[3];let h;if(t[4]!==o||t[5]!==a)h=!o&&MC.jsx(Yn,{children:MC.jsxs(Box,{flexDirection:"column",children:[MC.jsxs(Text,{dimColor:!0,children:["Summarized ",a.messagesSummarized," messages"," ",a.direction==="up_to"?"up to this point":"from this point"]}),a.userContext&&MC.jsxs(Text,{dimColor:!0,children:["Context: ","\u201C",a.userContext,"\u201D"]}),MC.jsx(Text,{dimColor:!0,children:MC.jsx(dr,{action:"app:toggleTranscript",context:"Global",fallback:"ctrl+o",description:"expand history",parens:!0})})]})}),t[4]=o,t[5]=a,t[6]=h;else h=t[6];let g;if(t[7]!==o||t[8]!==i)g=o&&MC.jsx(Yn,{children:MC.jsx(Text,{children:i})}),t[7]=o,t[8]=i,t[9]=g;else g=t[9];let _;if(t[10]!==h||t[11]!==g)_=MC.jsx(Box,{flexDirection:"column",marginTop:1,children:MC.jsxs(Box,{flexDirection:"row",children:[m,MC.jsxs(Box,{flexDirection:"column",children:[f,h,g]})]})}),t[10]=h,t[11]=g,t[12]=_;else _=t[12];return _}let l;if(t[13]===Symbol.for("react.memo_cache_sentinel"))l=MC.jsx(Box,{minWidth:2,children:MC.jsx(Text,{"aria-hidden":!0,color:"text",children:Ql})}),t[13]=l;else l=t[13];let c;if(t[14]!==o)c=!o&&MC.jsxs(Text,{dimColor:!0,children:[" ",MC.jsx(dr,{action:"app:toggleTranscript",context:"Global",fallback:"ctrl+o",description:"expand",parens:!0})]}),t[14]=o,t[15]=c;else c=t[15];let u;if(t[16]!==c)u=MC.jsxs(Box,{flexDirection:"row",children:[l,MC.jsx(Box,{flexDirection:"column",children:MC.jsxs(Text,{bold:!0,children:["Compact summary",c]})})]}),t[16]=c,t[17]=u;else u=t[17];let d;if(t[18]!==o||t[19]!==i)d=o&&MC.jsx(Yn,{children:MC.jsx(Text,{children:i})}),t[18]=o,t[19]=i,t[20]=d;else d=t[20];let p;if(t[21]!==u||t[22]!==d)p=MC.jsxs(Box,{flexDirection:"column",marginTop:1,children:[u,d]}),t[21]=u,t[22]=d,t[23]=p;else p=t[23];return p}
var D9a,MC;
var O9a=b(()=>{Pa();je();po();uc();Pl();D9a=x(tt(),1),MC=x(oe(),1)});
export {P9a,D9a,MC,O9a};
