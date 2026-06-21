// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {R5n,aSo} from "./m4611.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function qul(){let e=$ul.c(8),{rows:t}=mr(),n=t<NKp,r=n?0:1,o=n?0:1,s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s=SI.createElement(Box,{flexShrink:0},SI.createElement(Text,null,"Claude understands your codebase, makes edits with your permission, and executes commands \u2014 right from your terminal.")),e[0]=s;else s=e[0];let i;if(e[1]!==n)i=!n&&SI.createElement(Box,null,SI.createElement(Text,{dimColor:!0},"New here? Run ",SI.createElement(Text,{color:"suggestion"},"/powerup")," to learn the features most people miss.")),e[1]=n,e[2]=i;else i=e[2];let a;if(e[3]===Symbol.for("react.memo_cache_sentinel"))a=SI.createElement(Box,{flexDirection:"column"},SI.createElement(Box,{flexShrink:0},SI.createElement(Text,{bold:!0},"Shortcuts")),SI.createElement(R5n,{gap:2,fixedWidth:!0})),e[3]=a;else a=e[3];let l;if(e[4]!==r||e[5]!==o||e[6]!==i)l=SI.createElement(Box,{flexDirection:"column",paddingY:r,gap:o},s,i,a),e[4]=r,e[5]=o,e[6]=i,e[7]=l;else l=e[7];return l}
var $ul,SI,NKp=44;
var jul=b(()=>{ki();ze();aSo();$ul=M(rt(),1),SI=M(Te(),1)});
export {qul,$ul,SI,NKp,jul};
