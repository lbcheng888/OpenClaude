// @ts-nocheck
import {yg,_4} from "./m2581.ts";
import {Cyt,Ctr} from "./m5474.ts";
import {wIe,ZBt} from "../src/agent/3357_title.ts";
import {Box} from "./m2432.ts";
import {YI,yht} from "./m4692.ts";
import {cS,Rj} from "./m3188.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {gU,MSe} from "./m5444.ts";
import {Bl,d_} from "./m3354.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function pZl(e){let t=dZl.c(24),{questions:n,currentQuestionIndex:r,answers:o,allQuestionsAnswered:s,permissionResult:i,onFinalResponse:a}=e,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=yP.jsx(yg,{color:"inactive"}),t[0]=l;else l=t[0];let c;if(t[1]!==o||t[2]!==r||t[3]!==n)c=yP.jsx(Cyt,{questions:n,currentQuestionIndex:r,answers:o}),t[1]=o,t[2]=r,t[3]=n,t[4]=c;else c=t[4];let u;if(t[5]===Symbol.for("react.memo_cache_sentinel"))u=yP.jsx(wIe,{title:"Review your answers",color:"text"}),t[5]=u;else u=t[5];let d;if(t[6]!==s)d=!s&&yP.jsx(Box,{marginBottom:1,children:yP.jsx(YI,{status:"warning",children:"You have not answered all questions"})}),t[6]=s,t[7]=d;else d=t[7];let p;if(t[8]!==o||t[9]!==n)p=Object.keys(o).length>0&&yP.jsx(Box,{flexDirection:"column",marginBottom:1,children:n.filter((T)=>T?.question&&o[T.question]).map((T)=>{let y=o[T?.question];return yP.jsxs(Box,{flexDirection:"column",marginLeft:1,children:[yP.jsx(cS,{children:T?.question||"Question"}),yP.jsx(Box,{marginLeft:2,children:yP.jsxs(Text,{color:"success",children:[Xe.arrowRight," ",y]})})]},T?.question||"answer")})}),t[8]=o,t[9]=n,t[10]=p;else p=t[10];let m;if(t[11]!==i)m=yP.jsx(gU,{permissionResult:i,toolType:"tool"}),t[11]=i,t[12]=m;else m=t[12];let f;if(t[13]===Symbol.for("react.memo_cache_sentinel"))f=yP.jsx(Text,{color:"inactive",children:"Ready to submit your answers?"}),t[13]=f;else f=t[13];let h;if(t[14]!==a)h=yP.jsx(Box,{marginTop:1,children:yP.jsx(Bl,{confirmLabel:"Submit answers",cancelLabel:"Cancel",onConfirm:()=>a("submit"),onCancel:()=>a("cancel")})}),t[14]=a,t[15]=h;else h=t[15];let g;if(t[16]!==d||t[17]!==p||t[18]!==m||t[19]!==h)g=yP.jsxs(Box,{flexDirection:"column",marginTop:1,children:[d,p,m,f,h]}),t[16]=d,t[17]=p,t[18]=m,t[19]=h,t[20]=g;else g=t[20];let _;if(t[21]!==c||t[22]!==g)_=yP.jsxs(Box,{flexDirection:"column",marginTop:1,children:[l,yP.jsxs(Box,{flexDirection:"column",borderTop:!0,borderColor:"inactive",paddingTop:0,children:[c,u,g]})]}),t[21]=c,t[22]=g,t[23]=_;else _=t[23];return _}
var dZl,yP;
var mZl=b(()=>{Zs();je();Rj();d_();_4();yht();ZBt();MSe();Ctr();dZl=x(tt(),1),yP=x(oe(),1)});
export {pZl,dZl,yP,mZl};
