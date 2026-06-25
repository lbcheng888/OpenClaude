// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {AppStateProvider,pq} from "./m3370.ts";
import {teleportResumeCodeSession,checkOutTeleportedSessionBranch,processMessagesForTeleportResume,qD} from "../src/permissions/3888_validateSessionRepository.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var HTc={};
ft(HTc,{teleportWithProgress:()=>teleportWithProgress,TeleportProgress:()=>TeleportProgress});
function TeleportProgress(e){let t=vTc.c(16),{currentStep:n,sessionId:r}=e,[o,s]=useAnimationFrame(100),i=Math.floor(s/100)%_9o.length,a;if(t[0]!==n)a=(h)=>h.key===n,t[0]=n,t[1]=a;else a=t[1];let l=RTc.findIndex(a),c=_9o[i],u;if(t[2]!==c)u=w9.jsx(Box,{marginBottom:1,children:w9.jsxs(Text,{bold:!0,color:"claude",children:[c," Teleporting session\u2026"]})}),t[2]=c,t[3]=u;else u=t[3];let d;if(t[4]!==r)d=r&&w9.jsx(Box,{marginBottom:1,children:w9.jsx(Text,{dimColor:!0,children:r})}),t[4]=r,t[5]=d;else d=t[5];let p;if(t[6]!==l||t[7]!==i)p=RTc.map((h,g)=>{let _=g<l,T=g===l,y=g>l,S,E;if(_)S=Xe.tick,E="green";else if(T)S=_9o[i],E="claude";else S=Xe.circle,E=void 0;return w9.jsxs(Box,{flexDirection:"row",children:[w9.jsx(Box,{width:2,children:w9.jsx(Text,{color:E,dimColor:y,children:S})}),w9.jsx(Text,{dimColor:y,bold:T,children:h.label})]},h.key)}),t[6]=l,t[7]=i,t[8]=p;else p=t[8];let m;if(t[9]!==p)m=w9.jsx(Box,{flexDirection:"column",marginLeft:2,children:p}),t[9]=p,t[10]=m;else m=t[10];let f;if(t[11]!==o||t[12]!==u||t[13]!==d||t[14]!==m)f=w9.jsxs(Box,{ref:o,flexDirection:"column",paddingX:1,paddingY:1,children:[u,d,m]}),t[11]=o,t[12]=u,t[13]=d,t[14]=m,t[15]=f;else f=t[15];return f}
async function teleportWithProgress(e,t){let n=()=>{};function r(){let[a,l]=wTc.useState("validating");return n=l,w9.jsx(TeleportProgress,{currentStep:a,sessionId:t})}e.render(w9.jsx(AppStateProvider,{children:w9.jsx(r,{})}));let o=await teleportResumeCodeSession(t,n);n("checking_out");let{branchName:s,branchError:i}=await checkOutTeleportedSessionBranch(o.branch);return{messages:processMessagesForTeleportResume(o.log,i),branchName:s}}
var vTc,wTc,w9,_9o,RTc;
var ITc=b(()=>{Zs();je();pq();qD();vTc=x(tt(),1),wTc=x(et(),1),w9=x(oe(),1),_9o=["\u25D0","\u25D3","\u25D1","\u25D2"],RTc=[{key:"validating",label:"Validating session"},{key:"fetching_logs",label:"Fetching session logs"},{key:"fetching_branch",label:"Getting branch info"},{key:"checking_out",label:"Checking out branch"}]});
export {HTc,TeleportProgress,teleportWithProgress,vTc,wTc,w9,_9o,RTc,ITc};
