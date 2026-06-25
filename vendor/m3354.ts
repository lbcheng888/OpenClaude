// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {WMi,Tvn} from "./m2563.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function i_a(e){ino=e}
async function Eat(){if(ino)await ino()}
var ino=null;
function Bl(e){let t=a_a.c(21),{onConfirm:n,onCancel:r,confirmLabel:o,cancelLabel:s,cancelFirst:i,focus:a}=e,l=o===void 0?"Yes":o,c=s===void 0?"No":s,u=i===void 0?!1:i,d=a===void 0?"confirm":a;if(useIsScreenReaderEnabled()){let S;if(t[0]!==c||t[1]!==l||t[2]!==r||t[3]!==n)S=ano.jsx(WMi,{confirmLabel:l,cancelLabel:c,onConfirm:n,onCancel:r}),t[0]=c,t[1]=l,t[2]=r,t[3]=n,t[4]=S;else S=t[4];return S}let m;if(t[5]!==l)m={label:l,value:"confirm"},t[5]=l,t[6]=m;else m=t[6];let f=m,h;if(t[7]!==c)h={label:c,value:"cancel"},t[7]=c,t[8]=h;else h=t[8];let g=h,_;if(t[9]!==g||t[10]!==u||t[11]!==f)_=u?[g,f]:[f,g],t[9]=g,t[10]=u,t[11]=f,t[12]=_;else _=t[12];let T;if(t[13]!==r||t[14]!==n)T=(S)=>S==="confirm"?n():r(),t[13]=r,t[14]=n,t[15]=T;else T=t[15];let y;if(t[16]!==d||t[17]!==r||t[18]!==_||t[19]!==T)y=ano.jsx(hr,{options:_,defaultFocusValue:d,onChange:T,onCancel:r}),t[16]=d,t[17]=r,t[18]=_,t[19]=T,t[20]=y;else y=t[20];return y}
var a_a,ano;
var d_=b(()=>{je();Tvn();Ol();a_a=x(tt(),1),ano=x(oe(),1)});
export {i_a,Eat,ino,Bl,a_a,ano,d_};
