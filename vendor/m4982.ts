// @ts-nocheck
import {iu} from "./m3830.ts";
import {Or,ss} from "./m2553.ts";
import {AL,d9} from "./m4632.ts";
import {bn,Is} from "./m2565.ts";
import {Text} from "./m2433.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {Box} from "./m2432.ts";
import {ga,rh} from "./m2550.ts";
import {Ba,I_} from "./m2584.ts";
import {_c,PE} from "./m3831.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function SOl(){let e=TOl.c(18),{goNext:t,goBack:n,updateWizardData:r,wizardData:o}=iu(),[s,i]=hYn.useState(o.whenToUse||""),[a,l]=hYn.useState(s.length),[c,u]=hYn.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",n,d);let p;if(e[1]!==s)p=async()=>{let R=await AL(s);if(R.content!==null)i(R.content),l(R.content.length)},e[1]=s,e[2]=p;else p=e[2];let m=p,f;if(e[3]===Symbol.for("react.memo_cache_sentinel"))f={context:"Chat"},e[3]=f;else f=e[3];Or("chat:externalEditor",m,f);let h;if(e[4]!==t||e[5]!==r)h=(R)=>{let w=R.trim();if(!w){u("Description is required");return}u(null),r({whenToUse:w}),t()},e[4]=t,e[5]=r,e[6]=h;else h=e[6];let g=h,_;if(e[7]===Symbol.for("react.memo_cache_sentinel"))_=x6.jsxs(bn,{children:[x6.jsx(Text,{children:"Type to enter text"}),x6.jsx(at,{chord:"enter",action:"continue"}),x6.jsx(dr,{action:"chat:externalEditor",context:"Chat",fallback:"ctrl+g",description:"open in editor"}),x6.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})]}),e[7]=_;else _=e[7];let T;if(e[8]===Symbol.for("react.memo_cache_sentinel"))T=x6.jsx(Text,{children:"When should Claude use this agent?"}),e[8]=T;else T=e[8];let y;if(e[9]!==a||e[10]!==g||e[11]!==s)y=x6.jsx(Box,{marginTop:1,children:x6.jsx(ga,{value:s,onChange:i,onSubmit:g,placeholder:"e.g., use this agent after you're done writing code...",columns:80,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})}),e[9]=a,e[10]=g,e[11]=s,e[12]=y;else y=e[12];let S;if(e[13]!==c)S=c&&x6.jsx(Box,{marginTop:1,children:x6.jsx(Ba,{error:c})}),e[13]=c,e[14]=S;else S=e[14];let E;if(e[15]!==y||e[16]!==S)E=x6.jsx(_c,{subtitle:"Description (tell Claude when to use this agent)",footerText:_,children:x6.jsxs(Box,{flexDirection:"column",children:[T,y,S]})}),e[15]=y,e[16]=S,e[17]=E;else E=e[17];return E}
var TOl,hYn,x6;
var bOl=b(()=>{je();ss();d9();uc();Is();I_();Wo();rh();Fy();PE();TOl=x(tt(),1),hYn=x(et(),1),x6=x(oe(),1)});
export {SOl,TOl,hYn,x6,bOl};
