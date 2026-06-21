// @ts-nocheck
import {Or,Ts} from "./m2542.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {yue} from "../src/tui/4630_existingApiKey.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function spl(e){let t=opl.c(12),{repoUrl:n,onSubmit:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o={context:"Confirmation"},t[0]=o;else o=t[0];Or("confirm:yes",r,o);let s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s=uD.default.createElement(Box,{flexDirection:"column",marginBottom:1},uD.default.createElement(Text,{bold:!0},"Install the Claude GitHub App")),t[1]=s;else s=t[1];let i;if(t[2]===Symbol.for("react.memo_cache_sentinel"))i=uD.default.createElement(Box,{marginBottom:1},uD.default.createElement(Text,null,"Opening browser to install the Claude GitHub App\u2026")),t[2]=i;else i=t[2];let a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=uD.default.createElement(Box,{marginBottom:1},uD.default.createElement(Text,null,"If your browser doesn't open automatically, visit:")),t[3]=a;else a=t[3];let l;if(t[4]===Symbol.for("react.memo_cache_sentinel"))l=uD.default.createElement(Box,{marginBottom:1},uD.default.createElement(Text,{underline:!0},"https://github.com/apps/claude")),t[4]=l;else l=t[4];let c;if(t[5]!==n)c=uD.default.createElement(Box,{marginBottom:1},uD.default.createElement(Text,null,"Please install the app for repository: ",uD.default.createElement(Text,{bold:!0},n))),t[5]=n,t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u=uD.default.createElement(Box,{marginBottom:1},uD.default.createElement(Text,{dimColor:!0},"Important: Make sure to grant access to this specific repository")),t[7]=u;else u=t[7];let d;if(t[8]===Symbol.for("react.memo_cache_sentinel"))d=uD.default.createElement(Box,null,uD.default.createElement(Text,{bold:!0,color:"permission"},"Press Enter once you've installed the app",et.ellipsis)),t[8]=d;else d=t[8];let p;if(t[9]===Symbol.for("react.memo_cache_sentinel"))p=uD.default.createElement(Box,{marginTop:1},uD.default.createElement(Text,{dimColor:!0},"Having trouble? See manual setup instructions at:"," ",uD.default.createElement(Text,{color:"claude"},yue))),t[9]=p;else p=t[9];let m;if(t[10]!==c)m=uD.default.createElement(Box,{flexDirection:"column",borderStyle:"round",borderDimColor:!0,paddingX:1},s,i,a,l,c,u,d,p),t[10]=c,t[11]=m;else m=t[11];return m}
var opl,uD;
var ipl=b(()=>{Ai();ze();Ts();opl=M(rt(),1),uD=M(Te(),1)});
export {spl,opl,uD,ipl};
