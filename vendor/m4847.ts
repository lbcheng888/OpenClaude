// @ts-nocheck
import {isLiteLog,loadFullLog,getSessionIdFromLog,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {dropRetractedMessages,Xle} from "../src/permissions/3885_restoreSkillStateFromMessages.ts";
import {o9,cx} from "../src/artifact/4323_cx.ts";
import {Or,ss} from "./m2553.ts";
import {Hc,OE} from "./m3855.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {bn,Is} from "./m2565.ts";
import {dr,uc} from "./m2558.ts";
import {xWe,oGt} from "../src/tui/4847_current.ts";
import {formatRelativeTimeAgo,Xo} from "./m240.ts";
import {at,Wo} from "./m2557.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function pHl(e){let t=dHl.c(34),{log:n,onExit:r,onSelect:o}=e,[s,i]=mjn.useState(null),a,l;if(t[0]!==n)a=()=>{if(i(null),isLiteLog(n))loadFullLog(n).then(i)},l=[n],t[0]=n,t[1]=a,t[2]=l;else a=t[1],l=t[2];mjn.useEffect(a,l);let c=isLiteLog(n)&&s===null,u=s??n,d;if(t[3]!==u.messages)d=dropRetractedMessages(u.messages),t[3]=u.messages,t[4]=d;else d=t[4];let p=d,m;if(t[5]!==u)m=getSessionIdFromLog(u)||"",t[5]=u,t[6]=m;else m=t[6];let f=m,h;if(t[7]===Symbol.for("react.memo_cache_sentinel"))h=o9(),t[7]=h;else h=t[7];let g=h,_;if(t[8]===Symbol.for("react.memo_cache_sentinel"))_={context:"Confirmation"},t[8]=_;else _=t[8];Or("confirm:no",r,_);let T;if(t[9]!==s||t[10]!==n||t[11]!==o)T=()=>{o(s??n)},t[9]=s,t[10]=n,t[11]=o,t[12]=T;else T=t[12];let y=T,S;if(t[13]===Symbol.for("react.memo_cache_sentinel"))S={context:"Confirmation"},t[13]=S;else S=t[13];if(Or("confirm:yes",y,S),c){let M;if(t[14]===Symbol.for("react.memo_cache_sentinel"))M=f9.jsx(Hc,{message:"Loading session\u2026"}),t[14]=M;else M=t[14];let B;if(t[15]===Symbol.for("react.memo_cache_sentinel"))B=f9.jsxs(Box,{flexDirection:"column",padding:1,children:[M,f9.jsx(Text,{dimColor:!0,children:f9.jsx(bn,{children:f9.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})})})]}),t[15]=B;else B=t[15];return B}let E;if(t[16]===Symbol.for("react.memo_cache_sentinel"))E=[],t[16]=E;else E=t[16];let R;if(t[17]===Symbol.for("react.memo_cache_sentinel"))R=new Set,t[17]=R;else R=t[17];let w;if(t[18]===Symbol.for("react.memo_cache_sentinel"))w=[],t[18]=w;else w=t[18];let H;if(t[19]!==f||t[20]!==p)H=f9.jsx(xWe,{messages:p,tools:g,commands:E,verbose:!0,toolJSX:null,inProgressToolUseIDs:R,isMessageSelectorVisible:!1,conversationId:f,screen:"transcript",latchAnnouncementSlot:!1,streamingToolUses:w,showAllInTranscript:!0,isLoading:!1}),t[19]=f,t[20]=p,t[21]=H;else H=t[21];let k;if(t[22]!==u.modified)k=formatRelativeTimeAgo(u.modified),t[22]=u.modified,t[23]=k;else k=t[23];let I=u.gitBranch?` \xB7 ${u.gitBranch}`:"",D;if(t[24]!==u.messageCount||t[25]!==k||t[26]!==I)D=f9.jsxs(Text,{children:[k," \xB7"," ",u.messageCount," messages",I]}),t[24]=u.messageCount,t[25]=k,t[26]=I,t[27]=D;else D=t[27];let O;if(t[28]===Symbol.for("react.memo_cache_sentinel"))O=f9.jsx(Text,{dimColor:!0,children:f9.jsxs(bn,{children:[f9.jsx(at,{chord:"enter",action:"resume"}),f9.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]})}),t[28]=O;else O=t[28];let L;if(t[29]!==D)L=f9.jsxs(Box,{flexShrink:0,flexDirection:"column",borderTopDimColor:!0,borderBottom:!1,borderLeft:!1,borderRight:!1,borderStyle:"single",paddingLeft:2,children:[D,O]}),t[29]=D,t[30]=L;else L=t[30];let P;if(t[31]!==H||t[32]!==L)P=f9.jsxs(Box,{flexDirection:"column",children:[H,L]}),t[31]=H,t[32]=L,t[33]=P;else P=t[33];return P}
var dHl,mjn,f9;
var mHl=b(()=>{je();ss();cx();Xle();Xo();_a();uc();Is();Wo();OE();oGt();dHl=x(tt(),1),mjn=x(et(),1),f9=x(oe(),1)});
export {pHl,dHl,mjn,f9,mHl};
