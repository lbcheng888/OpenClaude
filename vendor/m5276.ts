// @ts-nocheck
import {zW,aqe} from "./m3972.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {fc,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function l3l(e){let t=a3l.c(8),{name:n,color:r}=e,o;if(t[0]!==r)o=zW(r),t[0]=r,t[1]=o;else o=t[1];let s=o,i=`@${n}`,a;if(t[2]!==n)a=q8e.createElement(Text,{bold:!0},"@",n),t[2]=n,t[3]=a;else a=t[3];let l;if(t[4]!==s||t[5]!==i||t[6]!==a)l=q8e.createElement(Box,{flexDirection:"row",gap:1},q8e.createElement(Text,{"aria-label":i,color:s},fc," ",a)),t[4]=s,t[5]=i,t[6]=a,t[7]=l;else l=t[7];return l}
var a3l,q8e;
var c3l=b(()=>{sl();ze();aqe();a3l=M(rt(),1),q8e=M(Te(),1)});
export {l3l,a3l,q8e,c3l};
