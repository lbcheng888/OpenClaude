// @ts-nocheck
import {iu} from "./m3830.ts";
import {at,Wo} from "./m2557.ts";
import {bn,Is} from "./m2565.ts";
import {dr,uc} from "./m2558.ts";
import {_c,PE} from "./m3831.ts";
import {mYn,C0o} from "./m4974.ts";
import {b,x} from "../runtime.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function WOl(e){let t=qOl.c(10),{tools:n}=e,{goNext:r,goBack:o,updateWizardData:s,wizardData:i}=iu(),a;if(t[0]!==r||t[1]!==s)a=(m)=>{s({selectedTools:m}),r()},t[0]=r,t[1]=s,t[2]=a;else a=t[2];let l=a,c=i.selectedTools,u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=eOe.jsx(at,{chord:"enter",action:"toggle selection"}),t[3]=u;else u=t[3];let d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))d=eOe.jsxs(bn,{children:[u,eOe.jsx(at,{chord:["up","down"],action:"navigate"}),eOe.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})]}),t[4]=d;else d=t[4];let p;if(t[5]!==o||t[6]!==l||t[7]!==c||t[8]!==n)p=eOe.jsx(_c,{subtitle:"Select tools",footerText:d,children:eOe.jsx(mYn,{tools:n,initialTools:c,onComplete:l,onCancel:o})}),t[5]=o,t[6]=l,t[7]=c,t[8]=n,t[9]=p;else p=t[9];return p}
var qOl,eOe;
var GOl=b(()=>{uc();Is();Wo();Fy();PE();C0o();qOl=x(tt(),1),eOe=x(oe(),1)});
export {WOl,qOl,eOe,GOl};
