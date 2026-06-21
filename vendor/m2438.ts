// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function RawAnsi(e){let t=lwi.c(6),{lines:n,width:r}=e;if(n.length===0)return null;let o;if(t[0]!==n)o=n.join(`
`),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==n.length||t[3]!==o||t[4]!==r)s=cwi.default.createElement("ink-raw-ansi",{rawText:o,rawWidth:r,rawHeight:n.length}),t[2]=n.length,t[3]=o,t[4]=r,t[5]=s;else s=t[5];return s}
var lwi,cwi;
var uwi=b(()=>{lwi=M(rt(),1),cwi=M(Te(),1)});
export {RawAnsi,lwi,cwi,uwi};
