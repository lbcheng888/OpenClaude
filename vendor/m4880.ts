// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Mc,configProtoStore} from "./m2458.ts";
import {TeleportResumeWrapper,bvo} from "../src/tui/4880_TeleportResumeWrapper.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var GEl={};
isFullscreenWithTTY(GEl,{call:()=>Rsm,Teleport:()=>Teleport});
function Teleport(e){let t=jEl.c(16),{onExit:n,context:r}=e,o=Mc(),s;if(t[0]!==o)s=()=>Boolean(o.getState().replBridgeSessionId),t[0]=o,t[1]=s;else s=t[1];let[i]=l8t.useState(s),a;if(t[6]!==r||t[7]!==n)a=(d)=>{r.applyMessageOp({type:"replace-all",messages:d.log}),n("Session resumed successfully",{display:"system"})},t[6]=r,t[7]=n,t[8]=a;else a=t[8];let l,c;if(t[9]!==n)l=()=>{n("Teleport cancelled",{display:"system"})},c=(d,p)=>{n(d,{display:"system"})},t[9]=n,t[10]=l,t[11]=c;else l=t[10],c=t[11];let u;if(t[12]!==a||t[13]!==l||t[14]!==c)u=l8t.default.createElement(TeleportResumeWrapper,{onComplete:a,onCancel:l,onError:c,isEmbedded:!0,source:"localCommand"}),t[12]=a,t[13]=l,t[14]=c,t[15]=u;else u=t[15];return u}
var jEl,l8t,Rsm=async(e,t)=>l8t.default.createElement(Teleport,{onExit:e,context:t});
var VEl=b(()=>{bvo();configProtoStore();jEl=M(rt(),1),l8t=M(Te(),1)});
export {GEl,Teleport,jEl,l8t,Rsm,VEl};
