// @ts-nocheck
import {Box} from "./m2422.ts";
import {cR,gJ} from "./m4537.ts";
import {Text} from "./m2423.ts";
import {yue} from "../src/tui/4630_existingApiKey.ts";
import {HE,JW} from "./m3976.ts";
import {AS,Yz} from "./m3174.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Zdl(e){let t=Qdl.c(15),{error:n,errorReason:r,errorInstructions:o}=e,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=lM.default.createElement(Box,{marginBottom:1},lM.default.createElement(cR,null,"Install GitHub App")),t[0]=s;else s=t[0];let i;if(t[1]!==n)i=lM.default.createElement(Text,{color:"error"},"Error: ",n),t[1]=n,t[2]=i;else i=t[2];let a;if(t[3]!==r)a=r&&lM.default.createElement(Box,{marginTop:1},lM.default.createElement(Text,{dimColor:!0},"Reason: ",r)),t[3]=r,t[4]=a;else a=t[4];let l;if(t[5]!==o)l=o.length>0&&lM.default.createElement(Box,{flexDirection:"column",marginTop:1},lM.default.createElement(Text,{dimColor:!0},"How to fix:"),lM.default.createElement(Box,{flexDirection:"column",marginLeft:2},o.map(fzp))),t[5]=o,t[6]=l;else l=t[6];let c;if(t[7]===Symbol.for("react.memo_cache_sentinel"))c=lM.default.createElement(Box,{marginTop:1},lM.default.createElement(Text,{dimColor:!0},"For manual setup instructions, see:"," ",lM.default.createElement(Text,{color:"claude"},yue))),t[7]=c;else c=t[7];let u;if(t[8]!==i||t[9]!==a||t[10]!==l)u=lM.default.createElement(HE,null,s,i,a,l,c),t[8]=i,t[9]=a,t[10]=l,t[11]=u;else u=t[11];let d;if(t[12]===Symbol.for("react.memo_cache_sentinel"))d=lM.default.createElement(Box,{marginLeft:3},lM.default.createElement(Text,{dimColor:!0},"Press any key to exit")),t[12]=d;else d=t[12];let p;if(t[13]!==u)p=lM.default.createElement(lM.default.Fragment,null,u,d),t[13]=u,t[14]=p;else p=t[14];return p}
function fzp(e,t){return lM.default.createElement(AS,{key:t},e)}
var Qdl,lM;
var epl=b(()=>{Yz();gJ();JW();ze();Qdl=M(rt(),1),lM=M(Te(),1)});
export {Zdl,fzp,Qdl,lM,epl};
