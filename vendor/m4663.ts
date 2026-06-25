// @ts-nocheck
import {Or,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {_ue} from "../src/tui/4657_existingApiKey.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function WTl(e){let t=qTl.c(12),{repoUrl:n,onSubmit:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o={context:"Confirmation"},t[0]=o;else o=t[0];Or("confirm:yes",r,o);let s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s=jI.jsx(Box,{flexDirection:"column",marginBottom:1,children:jI.jsx(Text,{bold:!0,children:"Install the Claude GitHub App"})}),t[1]=s;else s=t[1];let i;if(t[2]===Symbol.for("react.memo_cache_sentinel"))i=jI.jsx(Box,{marginBottom:1,children:jI.jsx(Text,{children:"Opening browser to install the Claude GitHub App\u2026"})}),t[2]=i;else i=t[2];let a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=jI.jsx(Box,{marginBottom:1,children:jI.jsx(Text,{children:"If your browser doesn't open automatically, visit:"})}),t[3]=a;else a=t[3];let l;if(t[4]===Symbol.for("react.memo_cache_sentinel"))l=jI.jsx(Box,{marginBottom:1,children:jI.jsx(Text,{underline:!0,children:"https://github.com/apps/claude"})}),t[4]=l;else l=t[4];let c;if(t[5]!==n)c=jI.jsx(Box,{marginBottom:1,children:jI.jsxs(Text,{children:["Please install the app for repository: ",jI.jsx(Text,{bold:!0,children:n})]})}),t[5]=n,t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u=jI.jsx(Box,{marginBottom:1,children:jI.jsx(Text,{dimColor:!0,children:"Important: Make sure to grant access to this specific repository"})}),t[7]=u;else u=t[7];let d;if(t[8]===Symbol.for("react.memo_cache_sentinel"))d=jI.jsx(Box,{children:jI.jsxs(Text,{bold:!0,color:"permission",children:["Press Enter once you've installed the app",Xe.ellipsis]})}),t[8]=d;else d=t[8];let p;if(t[9]===Symbol.for("react.memo_cache_sentinel"))p=jI.jsx(Box,{marginTop:1,children:jI.jsxs(Text,{dimColor:!0,children:["Having trouble? See manual setup instructions at:"," ",jI.jsx(Text,{color:"claude",children:_ue})]})}),t[9]=p;else p=t[9];let m;if(t[10]!==c)m=jI.jsxs(Box,{flexDirection:"column",borderStyle:"round",borderDimColor:!0,paddingX:1,children:[s,i,a,l,c,u,d,p]}),t[10]=c,t[11]=m;else m=t[11];return m}
var qTl,jI;
var GTl=b(()=>{Zs();je();ss();qTl=x(tt(),1),jI=x(oe(),1)});
export {WTl,qTl,jI,GTl};
