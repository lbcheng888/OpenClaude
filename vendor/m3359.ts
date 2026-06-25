// @ts-nocheck
import {Cat,m_a,lno} from "./m3358.ts";
import {Or,ss} from "./m2553.ts";
import {hm,DI} from "./m3357.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Bl,d_} from "./m3354.ts";
import {Ny,uq} from "./m3355.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function iLn(e){let t=f_a.c(20),{settings:n,onAccept:r,onReject:o}=e,s=Cat(n),i=m_a(s),a;if(t[0]===Symbol.for("react.memo_cache_sentinel"))a={context:"Confirmation"},t[0]=a;else a=t[0];Or("confirm:no",o,a);let l=hm,c="warning",u="warning",d="Managed settings require approval",p=Box,m="column",f=1,h=1,g;if(t[1]===Symbol.for("react.memo_cache_sentinel"))g=x1.jsx(Text,{children:"Your organization has configured managed settings that could allow execution of arbitrary code or interception of your prompts and responses."}),t[1]=g;else g=t[1];let _=Box,T="column",y;if(t[2]===Symbol.for("react.memo_cache_sentinel"))y=x1.jsx(Text,{dimColor:!0,children:"Settings requiring approval:"}),t[2]=y;else y=t[2];let S=i.map(etp),E;if(t[3]!==_||t[4]!==y||t[5]!==S)E=x1.jsxs(_,{flexDirection:T,children:[y,S]}),t[3]=_,t[4]=y,t[5]=S,t[6]=E;else E=t[6];let R;if(t[7]===Symbol.for("react.memo_cache_sentinel"))R=x1.jsx(Text,{children:"Only accept if you trust your organization's IT administration and expect these settings to be configured."}),t[7]=R;else R=t[7];let w;if(t[8]!==r||t[9]!==o)w=x1.jsx(Bl,{confirmLabel:"Yes, I trust these settings",cancelLabel:"No, exit Claude Code",onConfirm:r,onCancel:o}),t[8]=r,t[9]=o,t[10]=w;else w=t[10];let H;if(t[11]===Symbol.for("react.memo_cache_sentinel"))H=x1.jsx(Ny,{children:x1.jsxs(bn,{children:[x1.jsx(at,{chord:"enter",action:"confirm"}),x1.jsx(at,{chord:"escape",action:"exit"})]})}),t[11]=H;else H=t[11];let k;if(t[12]!==p||t[13]!==E||t[14]!==w||t[15]!==g)k=x1.jsxs(p,{flexDirection:m,gap:f,paddingTop:h,children:[g,E,R,w,H]}),t[12]=p,t[13]=E,t[14]=w,t[15]=g,t[16]=k;else k=t[16];let I;if(t[17]!==l||t[18]!==k)I=x1.jsx(l,{color:c,titleColor:u,title:d,children:k}),t[17]=l,t[18]=k,t[19]=I;else I=t[19];return I}
function etp(e,t){return x1.jsx(Box,{paddingLeft:2,children:x1.jsxs(Text,{children:[x1.jsx(Text,{dimColor:!0,children:"\xB7 "}),x1.jsx(Text,{children:e})]})},t)}
var f_a,x1;
var cno=b(()=>{je();ss();Is();d_();uq();Wo();DI();lno();f_a=x(tt(),1),x1=x(oe(),1)});
export {iLn,etp,f_a,x1,cno};
