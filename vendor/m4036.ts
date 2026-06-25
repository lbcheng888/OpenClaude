// @ts-nocheck
import {Text} from "./m2433.ts";
import {Yn,Pl} from "./m2465.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function y3n(e){let t=J3a.c(22),{hookEvent:n,lookups:r,toolUseID:o,isTranscriptMode:s}=e,i;if(t[0]!==n||t[1]!==r.inProgressHookCounts||t[2]!==o)i=r.inProgressHookCounts.get(o)?.get(n)??0,t[0]=n,t[1]=r.inProgressHookCounts,t[2]=o,t[3]=i;else i=t[3];let a=i,l=r.resolvedHookCounts.get(o)?.get(n)??0;if(a===0)return null;if(n==="PreToolUse"||n==="PostToolUse"){if(s){let f;if(t[4]!==a)f=bY.jsxs(Text,{dimColor:!0,children:[a," "]}),t[4]=a,t[5]=f;else f=t[5];let h;if(t[6]!==n)h=bY.jsx(Text,{dimColor:!0,bold:!0,children:n}),t[6]=n,t[7]=h;else h=t[7];let g=a===1?" hook":" hooks",_;if(t[8]!==g)_=bY.jsxs(Text,{dimColor:!0,children:[g," ran"]}),t[8]=g,t[9]=_;else _=t[9];let T;if(t[10]!==f||t[11]!==h||t[12]!==_)T=bY.jsx(Yn,{children:bY.jsxs(Box,{flexDirection:"row",children:[f,h,_]})}),t[10]=f,t[11]=h,t[12]=_,t[13]=T;else T=t[13];return T}return null}if(l===a)return null;let c;if(t[14]===Symbol.for("react.memo_cache_sentinel"))c=bY.jsx(Text,{dimColor:!0,children:"Running "}),t[14]=c;else c=t[14];let u;if(t[15]!==n)u=bY.jsx(Text,{dimColor:!0,bold:!0,children:n}),t[15]=n,t[16]=u;else u=t[16];let d=a===1?" hook\u2026":" hooks\u2026",p;if(t[17]!==d)p=bY.jsx(Text,{dimColor:!0,children:d}),t[17]=d,t[18]=p;else p=t[18];let m;if(t[19]!==u||t[20]!==p)m=bY.jsx(Yn,{children:bY.jsxs(Box,{flexDirection:"row",children:[c,u,p]})}),t[19]=u,t[20]=p,t[21]=m;else m=t[21];return m}
var J3a,bY;
var zpo=b(()=>{je();Pl();J3a=x(tt(),1),bY=x(oe(),1)});
export {y3n,J3a,bY,zpo};
