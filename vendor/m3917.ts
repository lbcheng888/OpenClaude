// @ts-nocheck
import {Kns} from "./m617.ts";
import {FK,Xl} from "../src/config/0651_maxBytes.ts";
import {Ansi} from "./m2441.ts";
import {Text} from "./m2433.ts";
import {yIe,x3e} from "./m3323.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function MBa(e,t,n){let r=Kns(n,t),o=Qqe.get(r);if(o!==void 0)return Qqe.delete(r),Qqe.set(r,o),o;let s=e.highlight(t,{language:n});if(Qqe.size>=lkp){let i=Qqe.keys().next().value;if(i!==void 0)Qqe.delete(i)}return Qqe.set(r,s),s}
function FBa(e){let t=Muo.c(15),{code:n,filePath:r,dim:o,skipColoring:s}=e,i=o===void 0?!1:o,a=s===void 0?!1:s,l;if(t[0]!==n)l=FK(n),t[0]=n,t[1]=l;else l=t[1];let c=l;if(a){let f;if(t[2]!==c)f=$ut.jsx(Ansi,{children:c}),t[2]=c,t[3]=f;else f=t[3];let h;if(t[4]!==i||t[5]!==f)h=$ut.jsx(Text,{dimColor:i,children:f}),t[4]=i,t[5]=f,t[6]=h;else h=t[6];return h}let u;if(t[7]!==r)u=NBa.extname(r).slice(1),t[7]=r,t[8]=u;else u=t[8];let d=u,p;if(t[9]!==c||t[10]!==d)p=$ut.jsx(ckp,{codeWithSpaces:c,language:d}),t[9]=c,t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==i||t[13]!==p)m=$ut.jsx(Text,{dimColor:i,children:p}),t[12]=i,t[13]=p,t[14]=m;else m=t[14];return m}
function ckp(e){let t=Muo.c(8),{codeWithSpaces:n,language:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=yIe(),t[0]=o;else o=t[0];let s=o,i;if(t[1]!==n||t[2]!==r){e:{let c="markdown";if(r)if(s.supportsLanguage(r))c=r;else logForDebugging(`Language not supported while highlighting code, falling back to markdown: ${r}`);try{i=MBa(s,n,c)}catch(u){let d=u;if(d instanceof Error&&d.message.includes("Unknown language")){logForDebugging(`Language not supported while highlighting code, falling back to markdown: ${d}`);let p;if(t[4]!==n)p=MBa(s,n,"markdown"),t[4]=n,t[5]=p;else p=t[5];i=p;break e}i=n}}t[1]=n,t[2]=r,t[3]=i}else i=t[3];let a=i,l;if(t[6]!==a)l=$ut.jsx(Ansi,{children:a}),t[6]=a,t[7]=l;else l=t[7];return l}
var Muo,NBa,$ut,lkp=500,Qqe;
var BBa=b(()=>{je();x3e();qe();Xl();Muo=x(tt(),1),NBa=require("path"),$ut=x(oe(),1),Qqe=new Map});
export {MBa,FBa,ckp,Muo,NBa,$ut,lkp,Qqe,BBa};
