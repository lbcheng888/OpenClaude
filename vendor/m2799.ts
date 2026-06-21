// @ts-nocheck
import {cx,iW} from "./m2798.ts";
import {Text} from "./m2423.ts";
import {Cn,dr} from "./m231.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function initModule(e){let t=N9i.c(8),{count:n,unit:r,expandable:o}=e,s=r===void 0?"line":r,i=o===void 0?!1:o;if(n<=0)return null;let a;if(t[0]!==n||t[1]!==s)a=lLt(n,s),t[0]=n,t[1]=s,t[2]=a;else a=t[2];let l;if(t[3]!==i)l=i&&aLt.default.createElement(aLt.default.Fragment,null," ",aLt.default.createElement(cx,null)),t[3]=i,t[4]=l;else l=t[4];let c;if(t[5]!==a||t[6]!==l)c=aLt.default.createElement(Text,{dimColor:!0},a,l),t[5]=a,t[6]=l,t[7]=c;else c=t[7];return c}
function lLt(e,t="line"){if(e<=0)return"";return`\u2026 +${e} ${Cn(e,t)}`}
var N9i,aLt;
var Oz=b(()=>{ze();dr();iW();N9i=M(rt(),1),aLt=M(Te(),1)});
export {initModule,lLt,N9i,aLt,Oz};
