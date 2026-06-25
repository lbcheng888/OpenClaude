// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {$as,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function T3n(e){let t=X3a.c(7),{content:n,addMargin:r}=e,o=r?1:0,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=gxe.jsx(Box,{minWidth:2,children:gxe.jsx(Text,{dimColor:!0,children:$as})}),t[0]=s;else s=t[0];let i;if(t[1]===Symbol.for("react.memo_cache_sentinel"))i=gxe.jsxs(Text,{dimColor:!0,bold:!0,children:["recap:"," "]}),t[1]=i;else i=t[1];let a;if(t[2]!==n)a=gxe.jsxs(Text,{children:[i,gxe.jsx(Text,{dimColor:!0,italic:!0,children:n})]}),t[2]=n,t[3]=a;else a=t[3];let l;if(t[4]!==o||t[5]!==a)l=gxe.jsxs(Box,{flexDirection:"row",marginTop:o,width:"100%",children:[s,a]}),t[4]=o,t[5]=a,t[6]=l;else l=t[6];return l}
var X3a,gxe;
var jpo=b(()=>{Pa();je();X3a=x(tt(),1),gxe=x(oe(),1)});
export {T3n,X3a,gxe,jpo};
