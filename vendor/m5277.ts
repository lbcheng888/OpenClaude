// @ts-nocheck
import {getTeamName,getAgentName,getTeammateColor,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Box} from "./m2422.ts";
import {tp,_x} from "../src/tui/3835_mode.ts";
import {Text} from "./m2423.ts";
import {l3l,c3l} from "./m5276.ts";
import {HE,JW} from "./m3976.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function JDo(e){let t=u3l.c(15),{toolName:n,description:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=getTeamName(),t[0]=o;else o=t[0];let s=o,i;if(t[1]===Symbol.for("react.memo_cache_sentinel"))i=getAgentName(),t[1]=i;else i=t[1];let a=i,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=getTeammateColor(),t[2]=l;else l=t[2];let c=l,u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=zy.createElement(Box,null,zy.createElement(tp,null),zy.createElement(Text,{bold:!0,color:"warning"}," ","Waiting for team lead approval")),t[3]=u;else u=t[3];let d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))d=a&&c&&zy.createElement(Box,{marginBottom:1},zy.createElement(l3l,{name:a,color:c})),t[4]=d;else d=t[4];let p;if(t[5]===Symbol.for("react.memo_cache_sentinel"))p=zy.createElement(Text,{dimColor:!0},"Tool: "),t[5]=p;else p=t[5];let m;if(t[6]!==n)m=zy.createElement(Box,null,p,zy.createElement(Text,null,n)),t[6]=n,t[7]=m;else m=t[7];let f;if(t[8]===Symbol.for("react.memo_cache_sentinel"))f=zy.createElement(Text,{dimColor:!0},"Action: "),t[8]=f;else f=t[8];let A;if(t[9]!==r)A=zy.createElement(Box,null,f,zy.createElement(Text,null,r)),t[9]=r,t[10]=A;else A=t[10];let h;if(t[11]===Symbol.for("react.memo_cache_sentinel"))h=s&&zy.createElement(Box,{marginTop:1},zy.createElement(Text,{dimColor:!0},"Permission request sent to team ",'"',s,'"'," leader")),t[11]=h;else h=t[11];let g;if(t[12]!==m||t[13]!==A)g=zy.createElement(HE,{color:"warning"},u,zy.createElement(Box,{flexDirection:"column",marginTop:1},d,m,A,h)),t[12]=m,t[13]=A,t[14]=g;else g=t[14];return g}
var u3l,zy;
var d3l=b(()=>{ze();Am();JW();_x();c3l();u3l=M(rt(),1),zy=M(Te(),1)});
export {JDo,u3l,zy,d3l};
