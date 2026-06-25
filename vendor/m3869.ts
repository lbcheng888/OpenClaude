// @ts-nocheck
import {iu} from "./m3830.ts";
import {Or,ss} from "./m2553.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {Text} from "./m2433.ts";
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
function mNa(){let e=pNa.c(17),{goBack:t,goNext:n,updateWizardData:r,wizardData:o}=iu(),[s,i]=D2n.useState(o.region??"global"),[a,l]=D2n.useState(s.length),[c,u]=D2n.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",t,d);let p;if(e[1]!==n||e[2]!==r||e[3]!==s)p=()=>{let S=s.trim();if(!S){u("Region is required");return}u(null),r({region:S}),n()},e[1]=n,e[2]=r,e[3]=s,e[4]=p;else p=e[4];let m=p,f;if(e[5]===Symbol.for("react.memo_cache_sentinel"))f=oG.jsxs(bn,{children:[oG.jsx(at,{chord:"enter",action:"continue"}),oG.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})]}),e[5]=f;else f=e[5];let h,g;if(e[6]===Symbol.for("react.memo_cache_sentinel"))h=oG.jsx(Text,{children:"Where Claude models are served from."}),g=oG.jsx(Text,{dimColor:!0,children:"Use 'global', 'us', or 'eu' for a multi-region endpoint (recommended), or a specific location like us-east5 if you have regional quota."}),e[6]=h,e[7]=g;else h=e[6],g=e[7];let _;if(e[8]!==a||e[9]!==m||e[10]!==s)_=oG.jsx(Box,{marginTop:1,children:oG.jsx(ga,{value:s,onChange:i,onSubmit:m,placeholder:"global",columns:40,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})}),e[8]=a,e[9]=m,e[10]=s,e[11]=_;else _=e[11];let T;if(e[12]!==c)T=c&&oG.jsx(Box,{marginTop:1,children:oG.jsx(Ba,{error:c})}),e[12]=c,e[13]=T;else T=e[13];let y;if(e[14]!==_||e[15]!==T)y=oG.jsx(_c,{subtitle:"Vertex AI region",footerText:f,children:oG.jsxs(Box,{flexDirection:"column",children:[h,g,_,T]})}),e[14]=_,e[15]=T,e[16]=y;else y=e[16];return y}
var pNa,D2n,oG;
var fNa=b(()=>{je();ss();uc();Is();I_();Wo();rh();Fy();PE();pNa=x(tt(),1),D2n=x(et(),1),oG=x(oe(),1)});
export {mNa,pNa,D2n,oG,fNa};
