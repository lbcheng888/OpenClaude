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
function kOl(){let e=wOl.c(11),{goNext:t,updateWizardData:n,cancel:r}=iu(),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o={label:"Project (.claude/agents/)",value:"projectSettings"},e[0]=o;else o=e[0];let s;if(e[1]===Symbol.for("react.memo_cache_sentinel"))s=[o,{label:"Personal (~/.claude/agents/)",value:"userSettings"}],e[1]=s;else s=e[1];let i=s,a;if(e[2]===Symbol.for("react.memo_cache_sentinel"))a=XTe.jsxs(bn,{children:[XTe.jsx(at,{chord:["up","down"],action:"navigate"}),XTe.jsx(at,{chord:"enter",action:"select"}),XTe.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]}),e[2]=a;else a=e[2];let l;if(e[3]!==t||e[4]!==n)l=(d)=>{n({location:d}),t()},e[3]=t,e[4]=n,e[5]=l;else l=e[5];let c;if(e[6]!==r)c=()=>r(),e[6]=r,e[7]=c;else c=e[7];let u;if(e[8]!==l||e[9]!==c)u=XTe.jsx(_c,{subtitle:"Choose location",footerText:a,children:XTe.jsx(Box,{children:XTe.jsx(hr,{options:i,onChange:l,onCancel:c},"location-select")})}),e[8]=l,e[9]=c,e[10]=u;else u=e[10];return u}
var wOl,XTe;
var HOl=b(()=>{je();uc();Ol();Is();Wo();Fy();PE();wOl=x(tt(),1),XTe=x(oe(),1)});
export {kOl,wOl,XTe,HOl};
