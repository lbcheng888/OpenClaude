// @ts-nocheck
import {Or,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {hr} from "./m2573.ts";
import {Ny,uq} from "./m3355.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {ku,rS} from "./m2582.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {TS} from "./m4541.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function yjl(e){let t=gjl.c(25),{currentValue:n,onSelect:r,onCancel:o,isMidConversation:s}=e,[i,a]=_jl.useState(null),l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=[{value:"true",label:"Enabled",description:"Claude will think before responding"},{value:"false",label:"Disabled",description:"Claude will respond without extended thinking"}],t[0]=l;else l=t[0];let c=l,u;if(t[1]!==i||t[2]!==o)u=()=>{if(i!==null)a(null);else o()},t[1]=i,t[2]=o,t[3]=u;else u=t[3];let d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))d={context:"Confirmation"},t[4]=d;else d=t[4];Or("confirm:no",u,d);let p;if(t[5]!==i||t[6]!==r)p=()=>{if(i!==null)r(i)},t[5]=i,t[6]=r,t[7]=p;else p=t[7];let m=i!==null,f;if(t[8]!==m)f={context:"Confirmation",isActive:m},t[8]=m,t[9]=f;else f=t[9];Or("confirm:yes",p,f);let h;if(t[10]!==n||t[11]!==s||t[12]!==r)h=function(R){let w=R==="true";if(s&&w!==n)a(w);else r(w)},t[10]=n,t[11]=s,t[12]=r,t[13]=h;else h=t[13];let g=h,_;if(t[14]===Symbol.for("react.memo_cache_sentinel"))_=_P.jsxs(Box,{marginBottom:1,flexDirection:"column",children:[_P.jsx(Text,{color:"remember",bold:!0,children:"Toggle thinking mode"}),_P.jsx(Text,{dimColor:!0,children:"Enable or disable thinking for this session."})]}),t[14]=_;else _=t[14];let T;if(t[15]!==i||t[16]!==n||t[17]!==g||t[18]!==o)T=_P.jsxs(Box,{flexDirection:"column",children:[_,i!==null?_P.jsxs(Box,{flexDirection:"column",marginBottom:1,gap:1,children:[_P.jsx(Text,{color:"warning",children:"Changing thinking mode mid-conversation will increase latency and may reduce quality. For best results, set this at the start of a session."}),_P.jsx(Text,{color:"warning",children:"Do you want to proceed?"})]}):_P.jsx(Box,{flexDirection:"column",marginBottom:1,children:_P.jsx(hr,{defaultValue:n?"true":"false",defaultFocusValue:n?"true":"false",options:c,onChange:g,onCancel:o,visibleOptionCount:2})})]}),t[15]=i,t[16]=n,t[17]=g,t[18]=o,t[19]=T;else T=t[19];let y;if(t[20]!==i)y=_P.jsx(Ny,{children:i!==null?_P.jsxs(bn,{children:[_P.jsx(at,{chord:"enter",action:"confirm"}),_P.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]}):_P.jsxs(bn,{children:[_P.jsx(at,{chord:"enter",action:"confirm"}),_P.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]})}),t[20]=i,t[21]=y;else y=t[21];let S;if(t[22]!==y||t[23]!==T)S=_P.jsxs(ku,{color:"permission",children:[T,y]}),t[22]=y,t[23]=T,t[24]=S;else S=t[24];return S}
var gjl,_jl,_P;
var Tjl=b(()=>{uq();je();ss();uc();TS();Is();Wo();rS();gjl=x(tt(),1),_jl=x(et(),1),_P=x(oe(),1)});
export {yjl,gjl,_jl,_P,Tjl};
