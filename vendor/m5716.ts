// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {AppStateProvider,Jq} from "./m3354.ts";
import {teleportResumeCodeSession,checkOutTeleportedSessionBranch,processMessagesForTeleportResume,RP} from "../src/tui/3870_validateSessionRepository.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var bcc={};
isFullscreenWithTTY(bcc,{teleportWithProgress:()=>teleportWithProgress,TeleportProgress:()=>TeleportProgress});
function TeleportProgress(e){let t=ycc.c(16),{currentStep:n,sessionId:r}=e,[o,s]=useAnimationFrame(100),i=Math.floor(s/100)%vNo.length,a;if(t[0]!==n)a=(A)=>A.key===n,t[0]=n,t[1]=a;else a=t[1];let l=_cc.findIndex(a),c=vNo[i],u;if(t[2]!==c)u=GE.createElement(Box,{marginBottom:1},GE.createElement(Text,{bold:!0,color:"claude"},c," Teleporting session\u2026")),t[2]=c,t[3]=u;else u=t[3];let d;if(t[4]!==r)d=r&&GE.createElement(Box,{marginBottom:1},GE.createElement(Text,{dimColor:!0},r)),t[4]=r,t[5]=d;else d=t[5];let p;if(t[6]!==l||t[7]!==i)p=_cc.map((A,h)=>{let g=h<l,_=h===l,y=h>l,T,S;if(g)T=et.tick,S="green";else if(_)T=vNo[i],S="claude";else T=et.circle,S=void 0;return GE.createElement(Box,{key:A.key,flexDirection:"row"},GE.createElement(Box,{width:2},GE.createElement(Text,{color:S,dimColor:y},T)),GE.createElement(Text,{dimColor:y,bold:_},A.label))}),t[6]=l,t[7]=i,t[8]=p;else p=t[8];let m;if(t[9]!==p)m=GE.createElement(Box,{flexDirection:"column",marginLeft:2},p),t[9]=p,t[10]=m;else m=t[10];let f;if(t[11]!==o||t[12]!==u||t[13]!==d||t[14]!==m)f=GE.createElement(Box,{ref:o,flexDirection:"column",paddingX:1,paddingY:1},u,d,m),t[11]=o,t[12]=u,t[13]=d,t[14]=m,t[15]=f;else f=t[15];return f}
async function teleportWithProgress(e,t){let n=()=>{};function r(){let[a,l]=Tcc.useState("validating");return n=l,GE.createElement(TeleportProgress,{currentStep:a,sessionId:t})}e.render(GE.createElement(AppStateProvider,null,GE.createElement(r,null)));let o=await teleportResumeCodeSession(t,n);n("checking_out");let{branchName:s,branchError:i}=await checkOutTeleportedSessionBranch(o.branch);return{messages:processMessagesForTeleportResume(o.log,i),branchName:s}}
var ycc,GE,Tcc,vNo,_cc;
var Ecc=b(()=>{Ai();ze();Jq();RP();ycc=M(rt(),1),GE=M(Te(),1),Tcc=M(Te(),1),vNo=["\u25D0","\u25D3","\u25D1","\u25D2"],_cc=[{key:"validating",label:"Validating session"},{key:"fetching_logs",label:"Fetching session logs"},{key:"fetching_branch",label:"Getting branch info"},{key:"checking_out",label:"Checking out branch"}]});
export {bcc,TeleportProgress,teleportWithProgress,ycc,GE,Tcc,vNo,_cc,Ecc};
