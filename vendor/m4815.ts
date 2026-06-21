// @ts-nocheck
import {isLiteLog,loadFullLog,getSessionIdFromLog,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {dropRetractedMessages,tce} from "../src/permissions/3867_restoreSkillStateFromMessages.ts";
import {O6,Y0} from "../src/artifact/4303_Y0.ts";
import {Or,Ts} from "./m2542.ts";
import {Jc,vE} from "./m3837.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Tn,zs} from "./m2554.ts";
import {lr,readRoster} from "./m2547.ts";
import {Qje,Ujt} from "../src/tui/4815_current.ts";
import {formatRelativeTimeAgo,ps} from "./m238.ts";
import {at,rs} from "./m2546.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function sSl(e){let t=oSl.c(34),{log:n,onExit:r,onSelect:o}=e,[s,i]=pM.useState(null),a,l;if(t[0]!==n)a=()=>{if(i(null),isLiteLog(n))loadFullLog(n).then(i)},l=[n],t[0]=n,t[1]=a,t[2]=l;else a=t[1],l=t[2];pM.useEffect(a,l);let c=isLiteLog(n)&&s===null,u=s??n,d;if(t[3]!==u.messages)d=dropRetractedMessages(u.messages),t[3]=u.messages,t[4]=d;else d=t[4];let p=d,m;if(t[5]!==u)m=getSessionIdFromLog(u)||"",t[5]=u,t[6]=m;else m=t[6];let f=m,A;if(t[7]===Symbol.for("react.memo_cache_sentinel"))A=O6(),t[7]=A;else A=t[7];let h=A,g;if(t[8]===Symbol.for("react.memo_cache_sentinel"))g={context:"Confirmation"},t[8]=g;else g=t[8];Or("confirm:no",r,g);let _;if(t[9]!==s||t[10]!==n||t[11]!==o)_=()=>{o(s??n)},t[9]=s,t[10]=n,t[11]=o,t[12]=_;else _=t[12];let y=_,T;if(t[13]===Symbol.for("react.memo_cache_sentinel"))T={context:"Confirmation"},t[13]=T;else T=t[13];if(Or("confirm:yes",y,T),c){let N;if(t[14]===Symbol.for("react.memo_cache_sentinel"))N=pM.default.createElement(Jc,{message:"Loading session\u2026"}),t[14]=N;else N=t[14];let O;if(t[15]===Symbol.for("react.memo_cache_sentinel"))O=pM.default.createElement(Box,{flexDirection:"column",padding:1},N,pM.default.createElement(Text,{dimColor:!0},pM.default.createElement(Tn,null,pM.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})))),t[15]=O;else O=t[15];return O}let S;if(t[16]===Symbol.for("react.memo_cache_sentinel"))S=[],t[16]=S;else S=t[16];let v;if(t[17]===Symbol.for("react.memo_cache_sentinel"))v=new Set,t[17]=v;else v=t[17];let R;if(t[18]===Symbol.for("react.memo_cache_sentinel"))R=[],t[18]=R;else R=t[18];let k;if(t[19]!==f||t[20]!==p)k=pM.default.createElement(Qje,{messages:p,tools:h,commands:S,verbose:!0,toolJSX:null,inProgressToolUseIDs:v,isMessageSelectorVisible:!1,conversationId:f,screen:"transcript",latchAnnouncementSlot:!1,streamingToolUses:R,showAllInTranscript:!0,isLoading:!1}),t[19]=f,t[20]=p,t[21]=k;else k=t[21];let x;if(t[22]!==u.modified)x=formatRelativeTimeAgo(u.modified),t[22]=u.modified,t[23]=x;else x=t[23];let H=u.gitBranch?` \xB7 ${u.gitBranch}`:"",I;if(t[24]!==u.messageCount||t[25]!==x||t[26]!==H)I=pM.default.createElement(Text,null,x," \xB7"," ",u.messageCount," messages",H),t[24]=u.messageCount,t[25]=x,t[26]=H,t[27]=I;else I=t[27];let P;if(t[28]===Symbol.for("react.memo_cache_sentinel"))P=pM.default.createElement(Text,{dimColor:!0},pM.default.createElement(Tn,null,pM.default.createElement(at,{chord:"enter",action:"resume"}),pM.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"}))),t[28]=P;else P=t[28];let L;if(t[29]!==I)L=pM.default.createElement(Box,{flexShrink:0,flexDirection:"column",borderTopDimColor:!0,borderBottom:!1,borderLeft:!1,borderRight:!1,borderStyle:"single",paddingLeft:2},I,P),t[29]=I,t[30]=L;else L=t[30];let D;if(t[31]!==k||t[32]!==L)D=pM.default.createElement(Box,{flexDirection:"column"},k,L),t[31]=k,t[32]=L,t[33]=D;else D=t[33];return D}
var oSl,pM;
var iSl=b(()=>{ze();Ts();Y0();tce();ps();ja();readRoster();zs();rs();vE();Ujt();oSl=M(rt(),1),pM=M(Te(),1)});
export {sSl,oSl,pM,iSl};
