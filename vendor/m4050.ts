// @ts-nocheck
import {YJo} from "./m611.ts";
import {d7,mc} from "../src/config/0645_maxBytes.ts";
import {Ansi} from "./m2431.ts";
import {Text} from "./m2423.ts";
import {Ike,T9e} from "./m3307.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function wUa(e,t,n){let r=YJo(n,t),o=xqe.get(r);if(o!==void 0)return xqe.delete(r),xqe.set(r,o),o;let s=e.highlight(t,{language:n});if(xqe.size>=Jvp){let i=xqe.keys().next().value;if(i!==void 0)xqe.delete(i)}return xqe.set(r,s),s}
function xUa(e){let t=xlo.c(15),{code:n,filePath:r,dim:o,skipColoring:s}=e,i=o===void 0?!1:o,a=s===void 0?!1:s,l;if(t[0]!==n)l=d7(n),t[0]=n,t[1]=l;else l=t[1];let c=l;if(a){let f;if(t[2]!==c)f=Kct.default.createElement(Ansi,null,c),t[2]=c,t[3]=f;else f=t[3];let A;if(t[4]!==i||t[5]!==f)A=Kct.default.createElement(Text,{dimColor:i},f),t[4]=i,t[5]=f,t[6]=A;else A=t[6];return A}let u;if(t[7]!==r)u=RUa.extname(r).slice(1),t[7]=r,t[8]=u;else u=t[8];let d=u,p;if(t[9]!==c||t[10]!==d)p=Kct.default.createElement(Xvp,{codeWithSpaces:c,language:d}),t[9]=c,t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==i||t[13]!==p)m=Kct.default.createElement(Text,{dimColor:i},p),t[12]=i,t[13]=p,t[14]=m;else m=t[14];return m}
function Xvp(e){let t=xlo.c(8),{codeWithSpaces:n,language:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=Ike(),t[0]=o;else o=t[0];let s=o,i;if(t[1]!==n||t[2]!==r){e:{let c="markdown";if(r)if(s.supportsLanguage(r))c=r;else logForDebugging(`Language not supported while highlighting code, falling back to markdown: ${r}`);try{i=wUa(s,n,c)}catch(u){let d=u;if(d instanceof Error&&d.message.includes("Unknown language")){logForDebugging(`Language not supported while highlighting code, falling back to markdown: ${d}`);let p;if(t[4]!==n)p=wUa(s,n,"markdown"),t[4]=n,t[5]=p;else p=t[5];i=p;break e}i=n}}t[1]=n,t[2]=r,t[3]=i}else i=t[3];let a=i,l;if(t[6]!==a)l=Kct.default.createElement(Ansi,null,a),t[6]=a,t[7]=l;else l=t[7];return l}
var xlo,RUa,Kct,Jvp=500,xqe;
var kUa=b(()=>{ze();T9e();qe();mc();xlo=M(rt(),1),RUa=require("path"),Kct=M(Te(),1),xqe=new Map});
export {wUa,xUa,Xvp,xlo,RUa,Kct,Jvp,xqe,kUa};
