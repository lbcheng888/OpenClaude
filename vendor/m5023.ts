// @ts-nocheck
import {bo,configProtoStore} from "./m2458.ts";
import {UP,z_e} from "./m4507.ts";
import {Jse,Om} from "../src/config/2215_level.ts";
import {Text} from "./m2423.ts";
import {ac,e_} from "./m3338.ts";
import {Box} from "./m2422.ts";
import {Kn,Li} from "./m2572.ts";
import {getTotalOutputTokens,lt} from "../src/session/0131_sent.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Cft(e){let t=Kkl.c(23),{kind:n,model:r,effort:o,onConfirm:s,onCancel:i}=e,a=bo(),l=n==="model",c=l?"Switch model?":"Change effort level?",u=l?"model":"effort level",d;if(t[0]!==o||t[1]!==l||t[2]!==r)d=l?UP(r):o!==void 0?Jse(o):"auto",t[0]=o,t[1]=l,t[2]=r,t[3]=d;else d=t[3];let p=d,m;if(t[4]!==s||t[5]!==a)m=function(){a(Jcm),s()},t[4]=s,t[5]=a,t[6]=m;else m=t[6];let f=m,A;if(t[7]!==p)A=Fne.createElement(Text,{bold:!0},p),t[7]=p,t[8]=A;else A=t[8];let h;if(t[9]!==u||t[10]!==A)h=Fne.createElement(Text,null,"This conversation is cached for the current ",u,". Switching to"," ",A," means the full history gets re-read on your next message."),t[9]=u,t[10]=A,t[11]=h;else h=t[11];let g=`Yes, switch to ${p}`,_;if(t[12]!==f||t[13]!==i||t[14]!==g)_=Fne.createElement(ac,{confirmLabel:g,cancelLabel:"No, go back",onConfirm:f,onCancel:i}),t[12]=f,t[13]=i,t[14]=g,t[15]=_;else _=t[15];let y;if(t[16]!==h||t[17]!==_)y=Fne.createElement(Box,{flexDirection:"column",gap:1,marginBottom:1},h,_),t[16]=h,t[17]=_,t[18]=y;else y=t[18];let T;if(t[19]!==i||t[20]!==y||t[21]!==c)T=Fne.createElement(Kn,{title:c,subtitle:"Your next response will be slower and use more tokens",color:"warning",onCancel:i,hideInputGuide:!0},y),t[19]=i,t[20]=y,t[21]=c,t[22]=T;else T=t[22];return T}
function Jcm(e){return{...e,cacheMissAckedAtOutputTokens:getTotalOutputTokens()}}
var Kkl,Fne;
var Kwo=b(()=>{lt();z_e();ze();configProtoStore();Om();e_();Li();Kkl=M(rt(),1),Fne=M(Te(),1)});
export {Cft,Jcm,Kkl,Fne,Kwo};
