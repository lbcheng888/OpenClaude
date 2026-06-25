// @ts-nocheck
import {iu} from "./m3830.ts";
import {Or,ss} from "./m2553.ts";
import {R0o,v0o} from "../src/agent/4980_isValid.ts";
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
function KOl(e){let t=VOl.c(15),{goNext:n,goBack:r,updateWizardData:o,wizardData:s}=iu(),[i,a]=_Yn.useState(s.agentType||""),[l,c]=_Yn.useState(null),[u,d]=_Yn.useState(i.length),p;if(t[0]===Symbol.for("react.memo_cache_sentinel"))p={context:"Settings"},t[0]=p;else p=t[0];Or("confirm:no",r,p);let m;if(t[1]!==n||t[2]!==o)m=(S)=>{let E=S.trim(),R=R0o(E);if(R){c(R);return}c(null),o({agentType:E}),n()},t[1]=n,t[2]=o,t[3]=m;else m=t[3];let f=m,h;if(t[4]===Symbol.for("react.memo_cache_sentinel"))h=ZG.jsxs(bn,{children:[ZG.jsx(Text,{children:"Type to enter text"}),ZG.jsx(at,{chord:"enter",action:"continue"}),ZG.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})]}),t[4]=h;else h=t[4];let g;if(t[5]===Symbol.for("react.memo_cache_sentinel"))g=ZG.jsx(Text,{children:"Enter a unique identifier for your agent:"}),t[5]=g;else g=t[5];let _;if(t[6]!==i||t[7]!==u||t[8]!==f)_=ZG.jsx(Box,{marginTop:1,children:ZG.jsx(ga,{value:i,onChange:a,onSubmit:f,placeholder:"e.g., test-runner, tech-lead, etc",columns:60,cursorOffset:u,onChangeCursorOffset:d,focus:!0,showCursor:!0})}),t[6]=i,t[7]=u,t[8]=f,t[9]=_;else _=t[9];let T;if(t[10]!==l)T=l&&ZG.jsx(Box,{marginTop:1,children:ZG.jsx(Ba,{error:l})}),t[10]=l,t[11]=T;else T=t[11];let y;if(t[12]!==_||t[13]!==T)y=ZG.jsx(_c,{subtitle:"Agent type (identifier)",footerText:h,children:ZG.jsxs(Box,{flexDirection:"column",children:[g,_,T]})}),t[12]=_,t[13]=T,t[14]=y;else y=t[14];return y}
var VOl,_Yn,ZG;
var zOl=b(()=>{je();ss();uc();Is();I_();Wo();rh();Fy();PE();v0o();VOl=x(tt(),1),_Yn=x(et(),1),ZG=x(oe(),1)});
export {KOl,VOl,_Yn,ZG,zOl};
