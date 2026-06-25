// @ts-nocheck
import {_we,fvn} from "./m2556.ts";
import {p4} from "./m2471.ts";
import {BaseText,u2e} from "./m2398.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function at(e){let t=DMi.c(12),{chord:n,action:r,format:o,parens:s,bold:i}=e,a=s===void 0?!1:s,l=i===void 0?!1:i,c;if(t[0]!==n||t[1]!==o)c=_we((typeof n==="string"?[n]:n).map(p4),o),t[0]=n,t[1]=o,t[2]=c;else c=t[2];let u=c;if(!u)return null;let d;if(t[3]!==l||t[4]!==u)d=l?SOt.jsx(BaseText,{bold:!0,children:u}):u,t[3]=l,t[4]=u,t[5]=d;else d=t[5];let p=d;if(a){let f;if(t[6]!==r||t[7]!==p)f=SOt.jsxs(BaseText,{children:["(",p," to ",r,")"]}),t[6]=r,t[7]=p,t[8]=f;else f=t[8];return f}let m;if(t[9]!==r||t[10]!==p)m=SOt.jsxs(BaseText,{children:[p," to ",r]}),t[9]=r,t[10]=p,t[11]=m;else m=t[11];return m}
var DMi,SOt;
var Wo=b(()=>{u2e();fvn();DMi=x(tt(),1),SOt=x(oe(),1)});
export {at,DMi,SOt,Wo};
