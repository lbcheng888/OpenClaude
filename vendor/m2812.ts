// @ts-nocheck
import {bw,EW} from "./m2811.ts";
import {Text} from "./m2433.ts";
import {Sn,lr} from "./m233.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function FO(e){let t=HWi.c(8),{count:n,unit:r,expandable:o}=e,s=r===void 0?"line":r,i=o===void 0?!1:o;if(n<=0)return null;let a;if(t[0]!==n||t[1]!==s)a=N1t(n,s),t[0]=n,t[1]=s,t[2]=a;else a=t[2];let l;if(t[3]!==i)l=i&&p9e.jsxs(p9e.Fragment,{children:[" ",p9e.jsx(bw,{})]}),t[3]=i,t[4]=l;else l=t[4];let c;if(t[5]!==a||t[6]!==l)c=p9e.jsxs(Text,{dimColor:!0,children:[a,l]}),t[5]=a,t[6]=l,t[7]=c;else c=t[7];return c}
function N1t(e,t="line"){if(e<=0)return"";return`\u2026 +${e} ${Sn(e,t)}`}
var HWi,p9e;
var uj=b(()=>{je();lr();EW();HWi=x(tt(),1),p9e=x(oe(),1)});
export {FO,N1t,HWi,p9e,uj};
