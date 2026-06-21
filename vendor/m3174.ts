// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function AS(e){let t=FZi.c(4),{children:n,color:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=Lee.createElement(Box,{width:2,flexShrink:0},Lee.createElement(Text,null,et.bullet)),t[0]=o;else o=t[0];let s;if(t[1]!==n||t[2]!==r)s=Lee.createElement(Box,{flexDirection:"row"},o,Lee.createElement(Box,{flexGrow:1,flexShrink:1},Lee.createElement(Text,{color:r},n))),t[1]=n,t[2]=r,t[3]=s;else s=t[3];return s}
var FZi,Lee;
var Yz=b(()=>{Ai();ze();FZi=M(rt(),1),Lee=M(Te(),1)});
export {AS,FZi,Lee,Yz};
