// @ts-nocheck
import {bo,uo} from "./m2468.ts";
import {oP,gTe} from "./m4528.ts";
import {Jse,Cp} from "../src/config/2223_level.ts";
import {Text} from "./m2433.ts";
import {Bl,d_} from "./m3354.ts";
import {Box} from "./m2432.ts";
import {preInitQueue,di} from "./m2583.ts";
import {getTotalOutputTokens,lt} from "../src/session/0132_sent.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function $gt(e){let t=f1l.c(23),{kind:n,model:r,effort:o,onConfirm:s,onCancel:i}=e,a=bo(),l=n==="model",c=l?"Switch model?":"Change effort level?",u=l?"model":"effort level",d;if(t[0]!==o||t[1]!==l||t[2]!==r)d=l?oP(r):o!==void 0?Jse(o):"auto",t[0]=o,t[1]=l,t[2]=r,t[3]=d;else d=t[3];let p=d,m;if(t[4]!==s||t[5]!==a)m=function(){a(lTm),s()},t[4]=s,t[5]=a,t[6]=m;else m=t[6];let f=m,h;if(t[7]!==p)h=zWe.jsx(Text,{bold:!0,children:p}),t[7]=p,t[8]=h;else h=t[8];let g;if(t[9]!==u||t[10]!==h)g=zWe.jsxs(Text,{children:["This conversation is cached for the current ",u,". Switching to"," ",h," means the full history gets re-read on your next message."]}),t[9]=u,t[10]=h,t[11]=g;else g=t[11];let _=`Yes, switch to ${p}`,T;if(t[12]!==f||t[13]!==i||t[14]!==_)T=zWe.jsx(Bl,{confirmLabel:_,cancelLabel:"No, go back",onConfirm:f,onCancel:i}),t[12]=f,t[13]=i,t[14]=_,t[15]=T;else T=t[15];let y;if(t[16]!==g||t[17]!==T)y=zWe.jsxs(Box,{flexDirection:"column",gap:1,marginBottom:1,children:[g,T]}),t[16]=g,t[17]=T,t[18]=y;else y=t[18];let S;if(t[19]!==i||t[20]!==y||t[21]!==c)S=zWe.jsx(preInitQueue,{title:c,subtitle:"Your next response will be slower and use more tokens",color:"warning",onCancel:i,hideInputGuide:!0,children:y}),t[19]=i,t[20]=y,t[21]=c,t[22]=S;else S=t[22];return S}
function lTm(e){return{...e,cacheMissAckedAtOutputTokens:getTotalOutputTokens()}}
var f1l,zWe;
var oxo=b(()=>{lt();gTe();je();uo();Cp();d_();di();f1l=x(tt(),1),zWe=x(oe(),1)});
export {$gt,lTm,f1l,zWe,oxo};
