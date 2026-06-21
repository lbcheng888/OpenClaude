// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {C8t,zwo} from "./m5024.ts";
import {Q9,FPe} from "./m5273.ts";
import {_Gl,yGl} from "./m5439.ts";
import {hGl,gGl} from "./m5438.ts";
import {$Yn,gPo} from "./m5299.ts";
import {pVl,CLo} from "../src/tui/5460_behavior.ts";
import {RVl,xVl} from "./m5465.ts";
import {CVl,vVl} from "./m5464.ts";
import {_Vl,yVl} from "../src/tui/5463_behavior.ts";
import {sVl,iVl} from "../src/tui/5457_behavior.ts";
import {PGl,MGl} from "../src/tui/5447_highlight.ts";
import {QGl,ZGl} from "../src/tui/5455_behavior.ts";
import {fWl,sLo} from "../src/tui/5413_type.ts";
import {cVl,uVl} from "./m5458.ts";
import {VGl,KGl} from "../src/tui/5453_key.ts";
import {SVl,bVl} from "./m5463.ts";
import {YGl,JGl} from "./m5453.ts";
import {b,M,ro} from "../runtime.ts";
import {d$n,Iqe} from "./m4074.ts";
import {O2n,Rqe} from "./m4042.ts";
import {Ylo,K$t} from "./m4075.ts";
import {QKr,YHn} from "./m3207.ts";
import {ZRn,Mnt} from "../src/core/2797_toInfraSessionId.ts";
import {Jlo,z$t} from "./m4076.ts";
import {Xlo,sut} from "./m4077.ts";
import {mnt,ihe} from "./m2752.ts";
import {L2n,bIe} from "./m4043.ts";
import {eso,uFn} from "./m3876.ts";
import {Qlo,Y$t} from "./m4078.ts";
import {u$n,NIe} from "./m4073.ts";
import {Zlo,J$t} from "./m4079.ts";
import {S4t,cJ} from "./m4370.ts";
import {eco,X$t} from "./m4080.ts";
import {tco,Q$t} from "./m4081.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
import {NVl,MVl} from "../src/tui/5468_mapWorkflowSelectionToResult.ts";
import {Rdo,wdo} from "./m4193.ts";
function nMm(e){let t=$Vl.c(3),{answer:n}=e,{addNotification:r}=Ui(),o;if(t[0]!==r||t[1]!==n)o=Th.createElement(C8t,{variant:"mid-session",onDone:(s,i)=>{if(i!==void 0)r({kind:"feedback",key:"fable-consent-result",text:i,priority:"high"});n(s==="consent"?"consent":s==="switch"?"switch_default":"cancelled")}}),t[0]=r,t[1]=n,t[2]=o;else o=t[2];return o}
function WVl(){return qVl.useSyncExternalStore(Q9.subscribe,UVl,UVl)}
function UVl(){let e=Q9.getState().open.at(-1);return e?xLo[e.kind]??"inline":void 0}
var $Vl,Th,qVl,BVl=null,DXn=null,FVl,PXn,qLm=({payload:e,answer:t})=>Th.createElement(_Gl,{tmuxAvailable:e.tmuxAvailable,onDone:t}),jLm=({payload:e,answer:t})=>Th.createElement(hGl,{request:e,onDone:t}),WLm=({payload:e,answer:t})=>{let n={serverName:e.serverName,requestId:`dialog-${e.params.elicitationId}`,params:e.params,signal:new AbortController().signal,waitingState:{actionLabel:"Retry now",showCancel:!0},respond:()=>{}};return Th.createElement($Yn,{event:n,onResponse:(r,o)=>{if(r==="accept"&&e.params.mode==="url")return;t({action:r,content:o})},onWaitingDismiss:(r)=>{t({action:r==="retry"?"accept":"cancel"})}})},GLm=({payload:e,answer:t})=>Th.createElement(pVl,{payload:e,answer:t}),VLm=({payload:e,answer:t})=>Th.createElement(RVl,{payload:e,answer:t}),KLm=({payload:e,answer:t})=>Th.createElement(CVl,{payload:e,answer:t}),zLm=({payload:e,answer:t})=>Th.createElement(_Vl,{payload:e,answer:t}),YLm=({payload:e,answer:t})=>Th.createElement(sVl,{payload:e,answer:t}),JLm=({payload:e,answer:t})=>Th.createElement(PGl,{payload:e,answer:t}),XLm=({payload:e,answer:t})=>Th.createElement(QGl,{payload:e,answer:t}),QLm=({payload:e,answer:t})=>Th.createElement(fWl,{payload:e,answer:t}),ZLm=({payload:e,answer:t})=>Th.createElement(cVl,{payload:e,answer:t}),eMm=({payload:e,answer:t})=>Th.createElement(VGl,{payload:e,answer:t}),tMm=({payload:e,answer:t})=>Th.createElement(SVl,{payload:e,answer:t}),rMm=({payload:e,answer:t})=>Th.createElement(YGl,{payload:e,answer:t}),wLo=null,RLo=null,xLo,lde="Claude needs your permission",jVl,GVl;
var kLo=b(()=>{zwo();gPo();gGl();Ld();yGl();MGl();d$n();KGl();JGl();O2n();Ylo();QKr();FPe();ZGl();sLo();ZRn();Jlo();Xlo();iVl();mnt();L2n();eso();uVl();Qlo();CLo();yVl();u$n();Zlo();bVl();S4t();vVl();eco();xVl();tco();$Vl=M(rt(),1),Th=M(Te(),1),qVl=M(Te(),1),FVl=(NVl(),ro(MVl)).WorkflowPermissionDialog,PXn=(Rdo(),ro(wdo)).workflowPermissionDialog;if(BVl){let e=BVl;wLo=({payload:t,answer:n})=>Th.createElement(e,{payload:t,answer:n})}if(FVl){let e=FVl;RLo=({payload:t,answer:n})=>Th.createElement(e,{payload:t,answer:n})}xLo={[sut.kind]:"modal"},jVl={[NIe.kind]:lde,[Q$t.kind]:lde,[X$t.kind]:lde,[J$t.kind]:lde,[bIe.kind]:lde,[Iqe.kind]:lde,[z$t.kind]:"Claude Code wants to enter plan mode",[sut.kind]:"Claude Code needs your approval for the plan",[Y$t.kind]:lde,[Rqe.kind]:lde,...{[cJ.kind]:"Session paused"},[ihe.kind]:"Session paused",[K$t.kind]:lde,...DXn&&{[DXn.kind]:"Claude needs your approval for a review artifact"},...PXn&&{[PXn.kind]:lde}};GVl={[uFn.kind]:qLm,[YHn.kind]:jLm,[Mnt.kind]:WLm,[NIe.kind]:GLm,[Q$t.kind]:VLm,[X$t.kind]:KLm,[J$t.kind]:zLm,[bIe.kind]:YLm,[Iqe.kind]:JLm,[z$t.kind]:XLm,[sut.kind]:QLm,[Y$t.kind]:ZLm,[Rqe.kind]:eMm,...{[cJ.kind]:tMm},[ihe.kind]:nMm,[K$t.kind]:rMm,...wLo&&DXn&&{[DXn.kind]:wLo},...RLo&&PXn&&{[PXn.kind]:RLo}}});
export {nMm,WVl,UVl,$Vl,Th,qVl,BVl,DXn,FVl,PXn,qLm,jLm,WLm,GLm,VLm,KLm,zLm,YLm,JLm,XLm,QLm,ZLm,eMm,tMm,rMm,wLo,RLo,xLo,lde,jVl,GVl,kLo};
