// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function K$(e){let t=PBa.c(6),{children:n,paddingX:r,marginTop:o,marginBottom:s}=e,i=r===void 0?1:r,l=useIsScreenReaderEnabled()?void 0:"dashed",c;if(t[0]!==n||t[1]!==s||t[2]!==o||t[3]!==i||t[4]!==l)c=OBa.jsx(Box,{borderStyle:l,borderColor:"subtle",borderLeft:!1,borderRight:!1,flexDirection:"column",overflow:"hidden",paddingX:i,marginTop:o,marginBottom:s,children:n}),t[0]=n,t[1]=s,t[2]=o,t[3]=i,t[4]=l,t[5]=c;else c=t[5];return c}
var PBa,OBa;
var Jqe=b(()=>{je();PBa=x(tt(),1),OBa=x(oe(),1)});
export {K$,PBa,OBa,Jqe};
