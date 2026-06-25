// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {KGt,sxo} from "../src/core/5055_variant.ts";
import {T9,NOe} from "./m5310.ts";
import {tZl,nZl} from "./m5472.ts";
import {ZQl,eZl} from "./m5471.ts";
import {zZn,GNo} from "./m5336.ts";
import {YZl,KBo} from "../src/tools/5493_behavior.ts";
import {uec,dec} from "./m5498.ts";
import {aec,lec} from "./m5497.ts";
import {tec,nec} from "../src/tui/5496_behavior.ts";
import {qZl,WZl} from "../src/tui/5490_behavior.ts";
import {gZl,TZl} from "../src/tui/5480_highlight.ts";
import {LZl,MZl} from "../src/permissions/5488_behavior.ts";
import {JXl,vBo} from "../src/tui/5446_type.ts";
import {KZl,zZl} from "./m5491.ts";
import {HZl,IZl} from "../src/tui/5486_children.ts";
import {oec,sec} from "./m5496.ts";
import {DZl,PZl} from "./m5486.ts";
import {b,x,oo} from "../runtime.ts";
import {C$n,Kqe} from "./m3903.ts";
import {A$n,zqe} from "./m3904.ts";
import {muo,G9t} from "./m3905.ts";
import {OQr,UDn} from "./m3223.ts";
import {FIn,$ot} from "../src/core/2809_toInfraSessionId.ts";
import {fuo,V9t} from "./m3906.ts";
import {huo,Lut} from "./m3907.ts";
import {yot,Tge} from "./m2764.ts";
import {R$n,B0e} from "./m3908.ts";
import {Kco,u$n} from "./m3894.ts";
import {ldo,l3t} from "./m3948.ts";
import {n9n,rxe} from "./m3949.ts";
import {cdo,c3t} from "./m3950.ts";
import {z6t,VY} from "./m4392.ts";
import {udo,u3t} from "./m3951.ts";
import {ddo,d3t} from "./m3952.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
import {bec,Sec} from "../src/tui/5501_mapWorkflowSelectionToResult.ts";
import {Tgo,ygo} from "./m4208.ts";
function d3m(e){let t=Rec.c(3),{answer:n}=e,{addNotification:r}=Ci(),o;if(t[0]!==r||t[1]!==n)o=bP.jsx(KGt,{variant:"mid-session",onDone:(s,i)=>{if(i!==void 0)r({kind:"feedback",key:"fable-consent-result",text:i,priority:"high"});n(s==="consent"?"consent":s==="switch"?"switch_default":"cancelled")}}),t[0]=r,t[1]=n,t[2]=o;else o=t[2];return o}
function kec(){return vec.useSyncExternalStore(T9.subscribe,Aec,Aec)}
function Aec(){let e=T9.getState().open.at(-1);return e?JBo[e.kind]??"inline":void 0}
var Rec,vec,bP,Eec=null,Ptr=null,Cec,Otr,X9m=({payload:e,answer:t})=>bP.jsx(tZl,{tmuxAvailable:e.tmuxAvailable,onDone:t}),Q9m=({payload:e,answer:t})=>bP.jsx(ZQl,{request:e,onDone:t}),Z9m=({payload:e,answer:t})=>{let n={serverName:e.serverName,requestId:`dialog-${e.params.elicitationId}`,params:e.params,signal:new AbortController().signal,waitingState:{actionLabel:"Retry now",showCancel:!0},respond:()=>{}};return bP.jsx(zZn,{event:n,onResponse:(r,o)=>{if(r==="accept"&&e.params.mode==="url")return;t({action:r,content:o})},onWaitingDismiss:(r)=>{t({action:r==="retry"?"accept":"cancel"})}})},e3m=({payload:e,answer:t})=>bP.jsx(YZl,{payload:e,answer:t}),t3m=({payload:e,answer:t})=>bP.jsx(uec,{payload:e,answer:t}),n3m=({payload:e,answer:t})=>bP.jsx(aec,{payload:e,answer:t}),r3m=({payload:e,answer:t})=>bP.jsx(tec,{payload:e,answer:t}),o3m=({payload:e,answer:t})=>bP.jsx(qZl,{payload:e,answer:t}),s3m=({payload:e,answer:t})=>bP.jsx(gZl,{payload:e,answer:t}),i3m=({payload:e,answer:t})=>bP.jsx(LZl,{payload:e,answer:t}),a3m=({payload:e,answer:t})=>bP.jsx(JXl,{payload:e,answer:t}),l3m=({payload:e,answer:t})=>bP.jsx(KZl,{payload:e,answer:t}),c3m=({payload:e,answer:t})=>bP.jsx(HZl,{payload:e,answer:t}),u3m=({payload:e,answer:t})=>bP.jsx(oec,{payload:e,answer:t}),p3m=({payload:e,answer:t})=>bP.jsx(DZl,{payload:e,answer:t}),jBo=null,YBo=null,JBo,hde="Claude needs your permission",wec,Hec;
var XBo=b(()=>{sxo();GNo();eZl();fd();nZl();TZl();C$n();IZl();PZl();A$n();muo();OQr();NOe();MZl();vBo();FIn();fuo();huo();WZl();yot();R$n();Kco();zZl();ldo();KBo();nec();n9n();cdo();sec();z6t();lec();udo();dec();ddo();Rec=x(tt(),1),vec=x(et(),1),bP=x(oe(),1),Cec=(bec(),oo(Sec)).WorkflowPermissionDialog,Otr=(Tgo(),oo(ygo)).workflowPermissionDialog;if(Eec){let e=Eec;jBo=({payload:t,answer:n})=>bP.jsx(e,{payload:t,answer:n})}if(Cec){let e=Cec;YBo=({payload:t,answer:n})=>bP.jsx(e,{payload:t,answer:n})}JBo={[Lut.kind]:"modal"},wec={[rxe.kind]:hde,[d3t.kind]:hde,[u3t.kind]:hde,[c3t.kind]:hde,[B0e.kind]:hde,[Kqe.kind]:hde,[V9t.kind]:"Claude Code wants to enter plan mode",[Lut.kind]:"Claude Code needs your approval for the plan",[l3t.kind]:hde,[zqe.kind]:hde,...{[VY.kind]:"Session paused"},[Tge.kind]:"Session paused",[G9t.kind]:hde,...Ptr&&{[Ptr.kind]:"Claude needs your approval for a review artifact"},...Otr&&{[Otr.kind]:hde}};Hec={[u$n.kind]:X9m,[UDn.kind]:Q9m,[$ot.kind]:Z9m,[rxe.kind]:e3m,[d3t.kind]:t3m,[u3t.kind]:n3m,[c3t.kind]:r3m,[B0e.kind]:o3m,[Kqe.kind]:s3m,[V9t.kind]:i3m,[Lut.kind]:a3m,[l3t.kind]:l3m,[zqe.kind]:c3m,...{[VY.kind]:u3m},[Tge.kind]:d3m,[G9t.kind]:p3m,...jBo&&Ptr&&{[Ptr.kind]:jBo},...YBo&&Otr&&{[Otr.kind]:YBo}}});
export {d3m,kec,Aec,Rec,vec,bP,Eec,Ptr,Cec,Otr,X9m,Q9m,Z9m,e3m,t3m,n3m,r3m,o3m,s3m,i3m,a3m,l3m,c3m,u3m,p3m,jBo,YBo,JBo,hde,wec,Hec,XBo};
