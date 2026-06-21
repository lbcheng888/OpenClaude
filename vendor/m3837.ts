// @ts-nocheck
import {tp,_x} from "../src/tui/3835_mode.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Jc(e){let t=lIa.c(10),{message:n,bold:r,dimColor:o,subtitle:s}=e,i=r===void 0?!1:r,a=o===void 0?!1:o,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=tlt.default.createElement(tp,null),t[0]=l;else l=t[0];let c;if(t[1]!==i||t[2]!==a||t[3]!==n)c=tlt.default.createElement(Box,{flexDirection:"row"},l,tlt.default.createElement(Text,{bold:i,dimColor:a}," ",n)),t[1]=i,t[2]=a,t[3]=n,t[4]=c;else c=t[4];let u;if(t[5]!==s)u=s&&tlt.default.createElement(Text,{dimColor:!0},s),t[5]=s,t[6]=u;else u=t[6];let d;if(t[7]!==c||t[8]!==u)d=tlt.default.createElement(Box,{flexDirection:"column"},c,u),t[7]=c,t[8]=u,t[9]=d;else d=t[9];return d}
var lIa,tlt;
var vE=b(()=>{ze();_x();lIa=M(rt(),1),tlt=M(Te(),1)});
export {Jc,lIa,tlt,vE};
