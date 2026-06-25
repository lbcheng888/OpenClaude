// @ts-nocheck
import {getTeamName,getAgentName,getTeammateColor,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {Box} from "./m2432.ts";
import {gd,xw} from "../src/tui/3853_mode.ts";
import {Text} from "./m2433.ts";
import {gKl,_Kl} from "./m5313.ts";
import {pb,eG} from "./m3827.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function CNo(e){let t=yKl.c(15),{toolName:n,description:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=getTeamName(),t[0]=o;else o=t[0];let s=o,i;if(t[1]===Symbol.for("react.memo_cache_sentinel"))i=getAgentName(),t[1]=i;else i=t[1];let a=i,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=getTeammateColor(),t[2]=l;else l=t[2];let c=l,u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=SN.jsxs(Box,{children:[SN.jsx(gd,{}),SN.jsxs(Text,{bold:!0,color:"warning",children:[" ","Waiting for team lead approval"]})]}),t[3]=u;else u=t[3];let d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))d=a&&c&&SN.jsx(Box,{marginBottom:1,children:SN.jsx(gKl,{name:a,color:c})}),t[4]=d;else d=t[4];let p;if(t[5]===Symbol.for("react.memo_cache_sentinel"))p=SN.jsx(Text,{dimColor:!0,children:"Tool: "}),t[5]=p;else p=t[5];let m;if(t[6]!==n)m=SN.jsxs(Box,{children:[p,SN.jsx(Text,{children:n})]}),t[6]=n,t[7]=m;else m=t[7];let f;if(t[8]===Symbol.for("react.memo_cache_sentinel"))f=SN.jsx(Text,{dimColor:!0,children:"Action: "}),t[8]=f;else f=t[8];let h;if(t[9]!==r)h=SN.jsxs(Box,{children:[f,SN.jsx(Text,{children:r})]}),t[9]=r,t[10]=h;else h=t[10];let g;if(t[11]===Symbol.for("react.memo_cache_sentinel"))g=s&&SN.jsx(Box,{marginTop:1,children:SN.jsxs(Text,{dimColor:!0,children:["Permission request sent to team ",'"',s,'"'," leader"]})}),t[11]=g;else g=t[11];let _;if(t[12]!==m||t[13]!==h)_=SN.jsxs(pb,{color:"warning",children:[u,SN.jsxs(Box,{flexDirection:"column",marginTop:1,children:[d,m,h,g]})]}),t[12]=m,t[13]=h,t[14]=_;else _=t[14];return _}
var yKl,SN;
var TKl=b(()=>{je();Op();eG();xw();_Kl();yKl=x(tt(),1),SN=x(oe(),1)});
export {CNo,yKl,SN,TKl};
