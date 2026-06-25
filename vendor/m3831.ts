// @ts-nocheck
import {iu,Blo} from "./m3830.ts";
import {preInitQueue,di} from "./m2583.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {Box} from "./m2432.ts";
import {Ny,uq} from "./m3355.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function _c(e){let t=HMa.c(14),{title:n,color:r,children:o,subtitle:s,footerText:i}=e,a=r===void 0?"suggestion":r,{currentStepIndex:l,totalSteps:c,title:u,showStepCounter:d,goBack:p}=iu(),m=n||u||"Wizard",f=d!==!1?` (${l+1}/${c})`:"",h=`${m}${f}`,g;if(t[0]!==o||t[1]!==a||t[2]!==p||t[3]!==s||t[4]!==h)g=lY.jsx(preInitQueue,{title:h,subtitle:s,onCancel:p,color:a,hideInputGuide:!0,isCancelActive:!1,children:o}),t[0]=o,t[1]=a,t[2]=p,t[3]=s,t[4]=h,t[5]=g;else g=t[5];let _;if(t[6]!==l||t[7]!==i)_=i??lY.jsxs(bn,{children:[lY.jsx(at,{chord:["up","down"],action:"navigate"}),lY.jsx(at,{chord:"enter",action:"select"}),lY.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:l>0?"go back":"cancel"})]}),t[6]=l,t[7]=i,t[8]=_;else _=t[8];let T;if(t[9]!==_)T=lY.jsx(Box,{marginLeft:2,marginTop:1,children:lY.jsx(Ny,{children:_})}),t[9]=_,t[10]=T;else T=t[10];let y;if(t[11]!==g||t[12]!==T)y=lY.jsxs(lY.Fragment,{children:[g,T]}),t[11]=g,t[12]=T,t[13]=y;else y=t[13];return y}
var HMa,lY;
var PE=b(()=>{je();uc();Is();di();uq();Wo();Blo();HMa=x(tt(),1),lY=x(oe(),1)});
export {_c,HMa,lY,PE};
