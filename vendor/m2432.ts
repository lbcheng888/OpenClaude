// @ts-nocheck
import {useResolvedTheme,gZ} from "./m2285.ts";
import {BaseBox,xZ} from "./m2397.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ltt(e,t){if(!e)return;if(e.startsWith("rgb(")||e.startsWith("#")||e.startsWith("ansi256(")||e.startsWith("ansi:"))return e;return t[e]}
function wyd(e){let t=q0i.c(26),n=useResolvedTheme(),r;if(t[0]!==e.borderColor||t[1]!==n)r=Ltt(e.borderColor,n),t[0]=e.borderColor,t[1]=n,t[2]=r;else r=t[2];let o;if(t[3]!==e.borderTopColor||t[4]!==n)o=Ltt(e.borderTopColor,n),t[3]=e.borderTopColor,t[4]=n,t[5]=o;else o=t[5];let s;if(t[6]!==e.borderBottomColor||t[7]!==n)s=Ltt(e.borderBottomColor,n),t[6]=e.borderBottomColor,t[7]=n,t[8]=s;else s=t[8];let i;if(t[9]!==e.borderLeftColor||t[10]!==n)i=Ltt(e.borderLeftColor,n),t[9]=e.borderLeftColor,t[10]=n,t[11]=i;else i=t[11];let a;if(t[12]!==e.borderRightColor||t[13]!==n)a=Ltt(e.borderRightColor,n),t[12]=e.borderRightColor,t[13]=n,t[14]=a;else a=t[14];let l;if(t[15]!==e.backgroundColor||t[16]!==n)l=Ltt(e.backgroundColor,n),t[15]=e.backgroundColor,t[16]=n,t[17]=l;else l=t[17];let c;if(t[18]!==e||t[19]!==r||t[20]!==o||t[21]!==s||t[22]!==i||t[23]!==a||t[24]!==l)c=W0i.jsx(BaseBox,{...e,borderColor:r,borderTopColor:o,borderBottomColor:s,borderLeftColor:i,borderRightColor:a,backgroundColor:l}),t[18]=e,t[19]=r,t[20]=o,t[21]=s,t[22]=i,t[23]=a,t[24]=l,t[25]=c;else c=t[25];return c}
var q0i,W0i,Box;
var RAn=b(()=>{xZ();gZ();q0i=x(tt(),1),W0i=x(oe(),1);Box=wyd});
export {Ltt,wyd,q0i,W0i,Box,RAn};
