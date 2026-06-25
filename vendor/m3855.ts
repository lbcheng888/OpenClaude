// @ts-nocheck
import {gd,xw} from "../src/tui/3853_mode.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Hc(e){let t=D1a.c(10),{message:n,bold:r,dimColor:o,subtitle:s}=e,i=r===void 0?!1:r,a=o===void 0?!1:o,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=Tqe.jsx(gd,{}),t[0]=l;else l=t[0];let c;if(t[1]!==i||t[2]!==a||t[3]!==n)c=Tqe.jsxs(Box,{flexDirection:"row",children:[l,Tqe.jsxs(Text,{bold:i,dimColor:a,children:[" ",n]})]}),t[1]=i,t[2]=a,t[3]=n,t[4]=c;else c=t[4];let u;if(t[5]!==s)u=s&&Tqe.jsx(Text,{dimColor:!0,children:s}),t[5]=s,t[6]=u;else u=t[6];let d;if(t[7]!==c||t[8]!==u)d=Tqe.jsxs(Box,{flexDirection:"column",children:[c,u]}),t[7]=c,t[8]=u,t[9]=d;else d=t[9];return d}
var D1a,Tqe;
var OE=b(()=>{je();xw();D1a=x(tt(),1),Tqe=x(oe(),1)});
export {Hc,D1a,Tqe,OE};
