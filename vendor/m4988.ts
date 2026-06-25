// @ts-nocheck
import {iu} from "./m3830.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {_c,PE} from "./m3831.ts";
import {dYn,E0o} from "./m4973.ts";
import {b,x} from "../runtime.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function NOl(){let e=MOl.c(8),{goNext:t,goBack:n,updateWizardData:r,wizardData:o}=iu(),s;if(e[0]!==t||e[1]!==r)s=(c)=>{r({selectedModel:c}),t()},e[0]=t,e[1]=r,e[2]=s;else s=e[2];let i=s,a;if(e[3]===Symbol.for("react.memo_cache_sentinel"))a=ZPe.jsxs(bn,{children:[ZPe.jsx(at,{chord:["up","down"],action:"navigate"}),ZPe.jsx(at,{chord:"enter",action:"select"}),ZPe.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})]}),e[3]=a;else a=e[3];let l;if(e[4]!==n||e[5]!==i||e[6]!==o.selectedModel)l=ZPe.jsx(_c,{subtitle:"Select model",footerText:a,children:ZPe.jsx(dYn,{initialModel:o.selectedModel,onComplete:i,onCancel:n})}),e[4]=n,e[5]=i,e[6]=o.selectedModel,e[7]=l;else l=e[7];return l}
var MOl,ZPe;
var FOl=b(()=>{uc();Is();Wo();Fy();PE();E0o();MOl=x(tt(),1),ZPe=x(oe(),1)});
export {NOl,MOl,ZPe,FOl};
