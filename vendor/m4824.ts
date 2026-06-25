// @ts-nocheck
import {Box} from "./m2432.ts";
import {bs,ff} from "./m2561.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Cwl(e){let t=Ewl.c(4),{messages:n}=e;if(n.length===0)return null;let r;if(t[0]!==n)r=n.map(hum),t[0]=n,t[1]=r;else r=t[1];let o;if(t[2]!==r)o=wWe.jsx(Box,{flexDirection:"column",children:r}),t[2]=r,t[3]=o;else o=t[3];return o}
function hum(e){return wWe.jsxs(Box,{flexDirection:"row",children:[wWe.jsx(bs,{status:"warning",withSpace:!0}),wWe.jsxs(Text,{color:"warning",children:[e,wWe.jsx(Text,{dimColor:!0,children:" \xB7 run claude install to repair"})]})]},e)}
var Ewl,wWe;
var Awl=b(()=>{je();ff();Ewl=x(tt(),1),wWe=x(oe(),1)});
export {Cwl,hum,Ewl,wWe,Awl};
