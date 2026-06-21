// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function b9(e){let t=B1a.c(6),{children:n,paddingX:r,marginTop:o,marginBottom:s}=e,i=r===void 0?1:r,l=useIsScreenReaderEnabled()?void 0:"dashed",c;if(t[0]!==n||t[1]!==s||t[2]!==o||t[3]!==i||t[4]!==l)c=F1a.default.createElement(Box,{borderStyle:l,borderColor:"subtle",borderLeft:!1,borderRight:!1,flexDirection:"column",overflow:"hidden",paddingX:i,marginTop:o,marginBottom:s},n),t[0]=n,t[1]=s,t[2]=o,t[3]=i,t[4]=l,t[5]=c;else c=t[5];return c}
var B1a,F1a;
var lqe=b(()=>{ze();B1a=M(rt(),1),F1a=M(Te(),1)});
export {b9,B1a,F1a,lqe};
