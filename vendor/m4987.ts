// @ts-nocheck
import {iu} from "./m3830.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {_c,PE} from "./m3831.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function OOl(){let e=POl.c(11),{goNext:t,goBack:n,updateWizardData:r,goToStep:o}=iu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s=[{label:"Generate with Claude (recommended)",value:"generate"},{label:"Manual configuration",value:"manual"}],e[0]=s;else s=e[0];let i=s,a;if(e[1]===Symbol.for("react.memo_cache_sentinel"))a=ZTe.jsxs(bn,{children:[ZTe.jsx(at,{chord:["up","down"],action:"navigate"}),ZTe.jsx(at,{chord:"enter",action:"select"}),ZTe.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})]}),e[1]=a;else a=e[1];let l;if(e[2]!==t||e[3]!==o||e[4]!==r)l=(d)=>{let p=d;if(r({method:p,wasGenerated:p==="generate"}),p==="generate")t();else o(3)},e[2]=t,e[3]=o,e[4]=r,e[5]=l;else l=e[5];let c;if(e[6]!==n)c=()=>n(),e[6]=n,e[7]=c;else c=e[7];let u;if(e[8]!==l||e[9]!==c)u=ZTe.jsx(_c,{subtitle:"Creation method",footerText:a,children:ZTe.jsx(Box,{children:ZTe.jsx(hr,{options:i,onChange:l,onCancel:c},"method-select")})}),e[8]=l,e[9]=c,e[10]=u;else u=e[10];return u}
var POl,ZTe;
var LOl=b(()=>{je();uc();Ol();Is();Wo();Fy();PE();POl=x(tt(),1),ZTe=x(oe(),1)});
export {OOl,POl,ZTe,LOl};
