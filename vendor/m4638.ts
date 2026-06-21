// @ts-nocheck
import {Box} from "./m2422.ts";
import {cR,gJ} from "./m4537.ts";
import {Text} from "./m2423.ts";
import {Bs,rA} from "./m2550.ts";
import {HE,JW} from "./m3976.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function ppl(e){let t=dpl.c(21),{secretExists:n,useExistingSecret:r,secretName:o,skipWorkflow:s}=e,i=s===void 0?!1:s,a;if(t[0]===Symbol.for("react.memo_cache_sentinel"))a=Sb.default.createElement(Box,{marginBottom:1},Sb.default.createElement(cR,{subtitle:"Success"},"Install GitHub App")),t[0]=a;else a=t[0];let l;if(t[1]!==i)l=!i&&Sb.default.createElement(Text,{color:"success"},Sb.default.createElement(Bs,{status:"success",withSpace:!0}),"GitHub Actions workflow created!"),t[1]=i,t[2]=l;else l=t[2];let c;if(t[3]!==n||t[4]!==r)c=n&&r&&Sb.default.createElement(Box,{marginTop:1},Sb.default.createElement(Text,{color:"success"},Sb.default.createElement(Bs,{status:"success",withSpace:!0}),"Using existing ANTHROPIC_API_KEY secret")),t[3]=n,t[4]=r,t[5]=c;else c=t[5];let u;if(t[6]!==n||t[7]!==o||t[8]!==r)u=(!n||!r)&&Sb.default.createElement(Box,{marginTop:1},Sb.default.createElement(Text,{color:"success"},Sb.default.createElement(Bs,{status:"success",withSpace:!0}),"API key saved as ",o," secret")),t[6]=n,t[7]=o,t[8]=r,t[9]=u;else u=t[9];let d;if(t[10]===Symbol.for("react.memo_cache_sentinel"))d=Sb.default.createElement(Box,{marginTop:1},Sb.default.createElement(Text,null,"Next steps:")),t[10]=d;else d=t[10];let p;if(t[11]!==i)p=i?Sb.default.createElement(Sb.default.Fragment,null,Sb.default.createElement(Text,null,"1. Install the Claude GitHub App if you haven't already"),Sb.default.createElement(Text,null,"2. Your workflow file was kept unchanged"),Sb.default.createElement(Text,null,"3. API key is configured and ready to use")):Sb.default.createElement(Sb.default.Fragment,null,Sb.default.createElement(Text,null,"1. A pre-filled PR page has been created"),Sb.default.createElement(Text,null,"2. Install the Claude GitHub App if you haven't already"),Sb.default.createElement(Text,null,"3. Merge the PR to enable Claude PR assistance")),t[11]=i,t[12]=p;else p=t[12];let m;if(t[13]!==l||t[14]!==c||t[15]!==u||t[16]!==p)m=Sb.default.createElement(HE,null,a,l,c,u,d,p),t[13]=l,t[14]=c,t[15]=u,t[16]=p,t[17]=m;else m=t[17];let f;if(t[18]===Symbol.for("react.memo_cache_sentinel"))f=Sb.default.createElement(Box,{marginLeft:3},Sb.default.createElement(Text,{dimColor:!0},"Press any key to exit")),t[18]=f;else f=t[18];let A;if(t[19]!==m)A=Sb.default.createElement(Sb.default.Fragment,null,m,f),t[19]=m,t[20]=A;else A=t[20];return A}
var dpl,Sb;
var mpl=b(()=>{gJ();JW();rA();ze();dpl=M(rt(),1),Sb=M(Te(),1)});
export {ppl,dpl,Sb,mpl};
