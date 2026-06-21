// @ts-nocheck
import {dg,J4} from "./m2570.ts";
import {sht,bXn} from "./m5441.ts";
import {$ke,CNt} from "./m3340.ts";
import {Box} from "./m2422.ts";
import {GP,ljt} from "./m4675.ts";
import {AS,Yz} from "./m3174.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {QU,oTe} from "./m5411.ts";
import {ac,e_} from "./m3338.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function kGl(e){let t=xGl.c(24),{questions:n,currentQuestionIndex:r,answers:o,allQuestionsAnswered:s,permissionResult:i,onFinalResponse:a}=e,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=bM.default.createElement(dg,{color:"inactive"}),t[0]=l;else l=t[0];let c;if(t[1]!==o||t[2]!==r||t[3]!==n)c=bM.default.createElement(sht,{questions:n,currentQuestionIndex:r,answers:o}),t[1]=o,t[2]=r,t[3]=n,t[4]=c;else c=t[4];let u;if(t[5]===Symbol.for("react.memo_cache_sentinel"))u=bM.default.createElement($ke,{title:"Review your answers",color:"text"}),t[5]=u;else u=t[5];let d;if(t[6]!==s)d=!s&&bM.default.createElement(Box,{marginBottom:1},bM.default.createElement(GP,{status:"warning"},"You have not answered all questions")),t[6]=s,t[7]=d;else d=t[7];let p;if(t[8]!==o||t[9]!==n)p=Object.keys(o).length>0&&bM.default.createElement(Box,{flexDirection:"column",marginBottom:1},n.filter((_)=>_?.question&&o[_.question]).map((_)=>{let y=o[_?.question];return bM.default.createElement(Box,{key:_?.question||"answer",flexDirection:"column",marginLeft:1},bM.default.createElement(AS,null,_?.question||"Question"),bM.default.createElement(Box,{marginLeft:2},bM.default.createElement(Text,{color:"success"},et.arrowRight," ",y)))})),t[8]=o,t[9]=n,t[10]=p;else p=t[10];let m;if(t[11]!==i)m=bM.default.createElement(QU,{permissionResult:i,toolType:"tool"}),t[11]=i,t[12]=m;else m=t[12];let f;if(t[13]===Symbol.for("react.memo_cache_sentinel"))f=bM.default.createElement(Text,{color:"inactive"},"Ready to submit your answers?"),t[13]=f;else f=t[13];let A;if(t[14]!==a)A=bM.default.createElement(Box,{marginTop:1},bM.default.createElement(ac,{confirmLabel:"Submit answers",cancelLabel:"Cancel",onConfirm:()=>a("submit"),onCancel:()=>a("cancel")})),t[14]=a,t[15]=A;else A=t[15];let h;if(t[16]!==d||t[17]!==p||t[18]!==m||t[19]!==A)h=bM.default.createElement(Box,{flexDirection:"column",marginTop:1},d,p,m,f,A),t[16]=d,t[17]=p,t[18]=m,t[19]=A,t[20]=h;else h=t[20];let g;if(t[21]!==c||t[22]!==h)g=bM.default.createElement(Box,{flexDirection:"column",marginTop:1},l,bM.default.createElement(Box,{flexDirection:"column",borderTop:!0,borderColor:"inactive",paddingTop:0},c,u,h)),t[21]=c,t[22]=h,t[23]=g;else g=t[23];return g}
var xGl,bM;
var HGl=b(()=>{Ai();ze();Yz();e_();J4();ljt();CNt();oTe();bXn();xGl=M(rt(),1),bM=M(Te(),1)});
export {kGl,xGl,bM,HGl};
