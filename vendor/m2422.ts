// @ts-nocheck
import {useResolvedTheme,SZ} from "./m2274.ts";
import {BaseBox,LZ} from "./m2387.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function OZe(e,t){if(!e)return;if(e.startsWith("rgb(")||e.startsWith("#")||e.startsWith("ansi256(")||e.startsWith("ansi:"))return e;return t[e]}
function nld(e){let t=kvi.c(26),n=useResolvedTheme(),r;if(t[0]!==e.borderColor||t[1]!==n)r=OZe(e.borderColor,n),t[0]=e.borderColor,t[1]=n,t[2]=r;else r=t[2];let o;if(t[3]!==e.borderTopColor||t[4]!==n)o=OZe(e.borderTopColor,n),t[3]=e.borderTopColor,t[4]=n,t[5]=o;else o=t[5];let s;if(t[6]!==e.borderBottomColor||t[7]!==n)s=OZe(e.borderBottomColor,n),t[6]=e.borderBottomColor,t[7]=n,t[8]=s;else s=t[8];let i;if(t[9]!==e.borderLeftColor||t[10]!==n)i=OZe(e.borderLeftColor,n),t[9]=e.borderLeftColor,t[10]=n,t[11]=i;else i=t[11];let a;if(t[12]!==e.borderRightColor||t[13]!==n)a=OZe(e.borderRightColor,n),t[12]=e.borderRightColor,t[13]=n,t[14]=a;else a=t[14];let l;if(t[15]!==e.backgroundColor||t[16]!==n)l=OZe(e.backgroundColor,n),t[15]=e.backgroundColor,t[16]=n,t[17]=l;else l=t[17];let c;if(t[18]!==e||t[19]!==r||t[20]!==o||t[21]!==s||t[22]!==i||t[23]!==a||t[24]!==l)c=Hvi.default.createElement(BaseBox,{...e,borderColor:r,borderTopColor:o,borderBottomColor:s,borderLeftColor:i,borderRightColor:a,backgroundColor:l}),t[18]=e,t[19]=r,t[20]=o,t[21]=s,t[22]=i,t[23]=a,t[24]=l,t[25]=c;else c=t[25];return c}
var kvi,Hvi,Box;
var BSn=b(()=>{LZ();SZ();kvi=M(rt(),1),Hvi=M(Te(),1);Box=nld});
export {OZe,nld,kvi,Hvi,Box,BSn};
