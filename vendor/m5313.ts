// @ts-nocheck
import {_G,U6e} from "./m4040.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Ql,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function gKl(e){let t=hKl.c(8),{name:n,color:r}=e,o;if(t[0]!==r)o=_G(r),t[0]=r,t[1]=o;else o=t[1];let s=o,i=`@${n}`,a;if(t[2]!==n)a=l7t.jsxs(Text,{bold:!0,children:["@",n]}),t[2]=n,t[3]=a;else a=t[3];let l;if(t[4]!==s||t[5]!==i||t[6]!==a)l=l7t.jsx(Box,{flexDirection:"row",gap:1,children:l7t.jsxs(Text,{"aria-label":i,color:s,children:[Ql," ",a]})}),t[4]=s,t[5]=i,t[6]=a,t[7]=l;else l=t[7];return l}
var hKl,l7t;
var _Kl=b(()=>{Pa();je();U6e();hKl=x(tt(),1),l7t=x(oe(),1)});
export {gKl,hKl,l7t,_Kl};
