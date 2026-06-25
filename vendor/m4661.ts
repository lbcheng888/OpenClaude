// @ts-nocheck
import {Box} from "./m2432.ts";
import {qE,BG} from "./m4563.ts";
import {Text} from "./m2433.ts";
import {_ue} from "../src/tui/4657_existingApiKey.ts";
import {pb,eG} from "./m3827.ts";
import {cS,Rj} from "./m3188.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function NTl(e){let t=MTl.c(15),{error:n,errorReason:r,errorInstructions:o}=e,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=Cx.jsx(Box,{marginBottom:1,children:Cx.jsx(qE,{children:"Install GitHub App"})}),t[0]=s;else s=t[0];let i;if(t[1]!==n)i=Cx.jsxs(Text,{color:"error",children:["Error: ",n]}),t[1]=n,t[2]=i;else i=t[2];let a;if(t[3]!==r)a=r&&Cx.jsx(Box,{marginTop:1,children:Cx.jsxs(Text,{dimColor:!0,children:["Reason: ",r]})}),t[3]=r,t[4]=a;else a=t[4];let l;if(t[5]!==o)l=o.length>0&&Cx.jsxs(Box,{flexDirection:"column",marginTop:1,children:[Cx.jsx(Text,{dimColor:!0,children:"How to fix:"}),Cx.jsx(Box,{flexDirection:"column",marginLeft:2,children:o.map(grm)})]}),t[5]=o,t[6]=l;else l=t[6];let c;if(t[7]===Symbol.for("react.memo_cache_sentinel"))c=Cx.jsx(Box,{marginTop:1,children:Cx.jsxs(Text,{dimColor:!0,children:["For manual setup instructions, see:"," ",Cx.jsx(Text,{color:"claude",children:_ue})]})}),t[7]=c;else c=t[7];let u;if(t[8]!==i||t[9]!==a||t[10]!==l)u=Cx.jsxs(pb,{children:[s,i,a,l,c]}),t[8]=i,t[9]=a,t[10]=l,t[11]=u;else u=t[11];let d;if(t[12]===Symbol.for("react.memo_cache_sentinel"))d=Cx.jsx(Box,{marginLeft:3,children:Cx.jsx(Text,{dimColor:!0,children:"Press any key to exit"})}),t[12]=d;else d=t[12];let p;if(t[13]!==u)p=Cx.jsxs(Cx.Fragment,{children:[u,d]}),t[13]=u,t[14]=p;else p=t[14];return p}
function grm(e,t){return Cx.jsx(cS,{children:e},t)}
var MTl,Cx;
var FTl=b(()=>{Rj();BG();eG();je();MTl=x(tt(),1),Cx=x(oe(),1)});
export {NTl,grm,MTl,Cx,FTl};
