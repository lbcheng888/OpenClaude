// @ts-nocheck
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function RawAnsi(e){let t=vxi.c(6),{lines:n,width:r}=e;if(n.length===0)return null;let o;if(t[0]!==n)o=n.join(`
`),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==n.length||t[3]!==o||t[4]!==r)s=wxi.jsx("ink-raw-ansi",{rawText:o,rawWidth:r,rawHeight:n.length}),t[2]=n.length,t[3]=o,t[4]=r,t[5]=s;else s=t[5];return s}
var vxi,wxi;
var kxi=b(()=>{vxi=x(tt(),1),wxi=x(oe(),1)});
export {RawAnsi,vxi,wxi,kxi};
