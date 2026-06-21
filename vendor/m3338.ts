// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {_Ii,IEn} from "./m2552.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function zca(e){CXr=e}
async function pDn(){if(CXr)await CXr()}
var CXr=null;
function ac(e){let t=Yca.c(21),{onConfirm:n,onCancel:r,confirmLabel:o,cancelLabel:s,cancelFirst:i,focus:a}=e,l=o===void 0?"Yes":o,c=s===void 0?"No":s,u=i===void 0?!1:i,d=a===void 0?"confirm":a;if(useIsScreenReaderEnabled()){let T;if(t[0]!==c||t[1]!==l||t[2]!==r||t[3]!==n)T=ENt.createElement(_Ii,{confirmLabel:l,cancelLabel:c,onConfirm:n,onCancel:r}),t[0]=c,t[1]=l,t[2]=r,t[3]=n,t[4]=T;else T=t[4];return T}let m;if(t[5]!==l)m={label:l,value:"confirm"},t[5]=l,t[6]=m;else m=t[6];let f=m,A;if(t[7]!==c)A={label:c,value:"cancel"},t[7]=c,t[8]=A;else A=t[8];let h=A,g;if(t[9]!==h||t[10]!==u||t[11]!==f)g=u?[h,f]:[f,h],t[9]=h,t[10]=u,t[11]=f,t[12]=g;else g=t[12];let _;if(t[13]!==r||t[14]!==n)_=(T)=>T==="confirm"?n():r(),t[13]=r,t[14]=n,t[15]=_;else _=t[15];let y;if(t[16]!==d||t[17]!==r||t[18]!==g||t[19]!==_)y=ENt.createElement(pr,{options:g,defaultFocusValue:d,onChange:_,onCancel:r}),t[16]=d,t[17]=r,t[18]=g,t[19]=_,t[20]=y;else y=t[20];return y}
var Yca,ENt;
var e_=b(()=>{ze();IEn();Yl();Yca=M(rt(),1),ENt=M(Te(),1)});
export {zca,pDn,CXr,ac,Yca,ENt,e_};
