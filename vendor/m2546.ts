// @ts-nocheck
import {Dwe,wEn} from "./m2545.ts";
import {W4} from "./m2461.ts";
import {BaseText,mUe} from "./m2388.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function at(e){let t=lIi.c(12),{chord:n,action:r,format:o,parens:s,bold:i}=e,a=s===void 0?!1:s,l=i===void 0?!1:i,c;if(t[0]!==n||t[1]!==o)c=Dwe((typeof n==="string"?[n]:n).map(W4),o),t[0]=n,t[1]=o,t[2]=c;else c=t[2];let u=c;if(!u)return null;let d;if(t[3]!==l||t[4]!==u)d=l?REn.default.createElement(BaseText,{bold:!0},u):u,t[3]=l,t[4]=u,t[5]=d;else d=t[5];let p=d;if(a){let f;if(t[6]!==r||t[7]!==p)f=REn.default.createElement(BaseText,null,"(",p," to ",r,")"),t[6]=r,t[7]=p,t[8]=f;else f=t[8];return f}let m;if(t[9]!==r||t[10]!==p)m=REn.default.createElement(BaseText,null,p," to ",r),t[9]=r,t[10]=p,t[11]=m;else m=t[11];return m}
var lIi,REn;
var rs=b(()=>{mUe();wEn();lIi=M(rt(),1),REn=M(Te(),1)});
export {at,lIi,REn,rs};
