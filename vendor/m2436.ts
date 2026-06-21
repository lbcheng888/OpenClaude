// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Newline(e){let t=rwi.c(4),{count:n}=e,r=n===void 0?1:n,o;if(t[0]!==r)o=`
`.repeat(r),t[0]=r,t[1]=o;else o=t[1];let s;if(t[2]!==o)s=owi.default.createElement("ink-text",null,o),t[2]=o,t[3]=s;else s=t[3];return s}
var rwi,owi;
var swi=b(()=>{rwi=M(rt(),1),owi=M(Te(),1)});
export {Newline,rwi,owi,swi};
