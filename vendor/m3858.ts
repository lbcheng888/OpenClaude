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
function $1a(){let e=U1a.c(17),{goBack:t,goNext:n,updateWizardData:r,wizardData:o}=iu(),[s,i]=w2n.useState(o.region??"us-east-1"),[a,l]=w2n.useState(s.length),[c,u]=w2n.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",t,d);let p;if(e[1]!==n||e[2]!==r||e[3]!==s)p=()=>{let S=s.trim();if(!S){u("Region is required");return}u(null),r({region:S}),n()},e[1]=n,e[2]=r,e[3]=s,e[4]=p;else p=e[4];let m=p,f;if(e[5]===Symbol.for("react.memo_cache_sentinel"))f=rG.jsxs(bn,{children:[rG.jsx(at,{chord:"enter",action:"continue"}),rG.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})]}),e[5]=f;else f=e[5];let h,g;if(e[6]===Symbol.for("react.memo_cache_sentinel"))h=rG.jsx(Text,{children:"Where your Bedrock models are enabled."}),g=rG.jsx(Text,{dimColor:!0,children:"Claude Code reads this from AWS_REGION, not ~/.aws/config \u2014 set it explicitly even if your profile has a region."}),e[6]=h,e[7]=g;else h=e[6],g=e[7];let _;if(e[8]!==a||e[9]!==m||e[10]!==s)_=rG.jsx(Box,{marginTop:1,children:rG.jsx(ga,{value:s,onChange:i,onSubmit:m,placeholder:"us-east-1",columns:40,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})}),e[8]=a,e[9]=m,e[10]=s,e[11]=_;else _=e[11];let T;if(e[12]!==c)T=c&&rG.jsx(Box,{marginTop:1,children:rG.jsx(Ba,{error:c})}),e[12]=c,e[13]=T;else T=e[13];let y;if(e[14]!==_||e[15]!==T)y=rG.jsx(_c,{subtitle:"AWS region",footerText:f,children:rG.jsxs(Box,{flexDirection:"column",children:[h,g,_,T]})}),e[14]=_,e[15]=T,e[16]=y;else y=e[16];return y}
var U1a,w2n,rG;
var q1a=b(()=>{je();ss();uc();Is();I_();Wo();rh();Fy();PE();U1a=x(tt(),1),w2n=x(et(),1),rG=x(oe(),1)});
export {$1a,U1a,w2n,rG,q1a};
