// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {gc,uo} from "./m2468.ts";
import {TeleportResumeWrapper,BIo} from "../src/tui/4910_TeleportResumeWrapper.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var exl={};
ft(exl,{call:()=>Bfm,Teleport:()=>Teleport});
function Teleport(e){let t=X0l.c(16),{onExit:n,context:r}=e,o=gc(),s;if(t[0]!==o)s=()=>Boolean(o.getState().replBridgeSessionId),t[0]=o,t[1]=s;else s=t[1];let[i]=Q0l.useState(s),a;if(t[6]!==r||t[7]!==n)a=(d)=>{r.applyMessageOp({type:"replace-all",messages:d.log}),n("Session resumed successfully",{display:"system"})},t[6]=r,t[7]=n,t[8]=a;else a=t[8];let l,c;if(t[9]!==n)l=()=>{n("Teleport cancelled",{display:"system"})},c=(d,p)=>{n(d,{display:"system"})},t[9]=n,t[10]=l,t[11]=c;else l=t[10],c=t[11];let u;if(t[12]!==a||t[13]!==l||t[14]!==c)u=UIo.jsx(TeleportResumeWrapper,{onComplete:a,onCancel:l,onError:c,isEmbedded:!0,source:"localCommand"}),t[12]=a,t[13]=l,t[14]=c,t[15]=u;else u=t[15];return u}
var X0l,Q0l,UIo,Bfm=async(e,t)=>UIo.jsx(Teleport,{onExit:e,context:t});
var txl=b(()=>{BIo();uo();X0l=x(tt(),1),Q0l=x(et(),1),UIo=x(oe(),1)});
export {exl,Teleport,X0l,Q0l,UIo,Bfm,txl};
