// @ts-nocheck
import {lw,a4} from "./m2436.ts";
import {BaseText,u2e} from "./m2398.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Link(e){let t=oxi.c(5),{children:n,url:r,fallback:o,assumeSupport:s}=e,i=n??r;if(s||lw()){let c;if(t[0]!==i||t[1]!==r)c=wAn.jsx(BaseText,{children:wAn.jsx("ink-link",{href:r,children:i})}),t[0]=i,t[1]=r,t[2]=c;else c=t[2];return c}let a=o??i,l;if(t[3]!==a)l=wAn.jsx(BaseText,{children:a}),t[3]=a,t[4]=l;else l=t[4];return l}
var oxi,wAn;
var yie=b(()=>{a4();u2e();oxi=x(tt(),1),wAn=x(oe(),1)});
export {Link,oxi,wAn,yie};
