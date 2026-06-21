// @ts-nocheck
import {JR,U4} from "./m2426.ts";
import {BaseText,mUe} from "./m2388.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Link(e){let t=qvi.c(5),{children:n,url:r,fallback:o,assumeSupport:s}=e,i=n??r;if(s||JR()){let c;if(t[0]!==i||t[1]!==r)c=USn.default.createElement(BaseText,null,USn.default.createElement("ink-link",{href:r},i)),t[0]=i,t[1]=r,t[2]=c;else c=t[2];return c}let a=o??i,l;if(t[3]!==a)l=USn.default.createElement(BaseText,null,a),t[3]=a,t[4]=l;else l=t[4];return l}
var qvi,USn;
var Tie=b(()=>{U4();mUe();qvi=M(rt(),1),USn=M(Te(),1)});
export {Link,qvi,USn,Tie};
