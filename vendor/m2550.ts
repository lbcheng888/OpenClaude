// @ts-nocheck
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {Ai,et} from "./m2208.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bs(e){let t=pIi.c(8),{status:n,withSpace:r}=e,o=r===void 0?!1:r,s=f3r[n],i=!s.color,a;if(t[0]!==s.ariaLabel||t[1]!==s.icon)a=m3r.default.createElement(Text,{"aria-label":s.ariaLabel},s.icon),t[0]=s.ariaLabel,t[1]=s.icon,t[2]=a;else a=t[2];let l=o&&" ",c;if(t[3]!==s.color||t[4]!==i||t[5]!==a||t[6]!==l)c=m3r.default.createElement(Text,{color:s.color,dimColor:i},a,l),t[3]=s.color,t[4]=i,t[5]=a,t[6]=l,t[7]=c;else c=t[7];return c}
var pIi,m3r,f3r;
var rA=b(()=>{Ai();ze();pIi=M(rt(),1),m3r=M(Te(),1),f3r={success:{icon:et.tick,color:"success",ariaLabel:"done:"},error:{icon:et.cross,color:"error",ariaLabel:"failed:"},warning:{icon:et.warning,color:"warning",ariaLabel:"warning:"},info:{icon:et.info,color:"suggestion",ariaLabel:"note:"},pending:{icon:et.circle,color:void 0,ariaLabel:"pending:"},loading:{icon:"\u2026",color:void 0,ariaLabel:"loading:"}}});
export {Bs,pIi,m3r,f3r,rA};
