// @ts-nocheck
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {Zs,Xe} from "./m2216.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function bs(e){let t=NMi.c(8),{status:n,withSpace:r}=e,o=r===void 0?!1:r,s=W5r[n],i=!s.color,a;if(t[0]!==s.ariaLabel||t[1]!==s.icon)a=_vn.jsx(Text,{"aria-label":s.ariaLabel,children:s.icon}),t[0]=s.ariaLabel,t[1]=s.icon,t[2]=a;else a=t[2];let l=o&&" ",c;if(t[3]!==s.color||t[4]!==i||t[5]!==a||t[6]!==l)c=_vn.jsxs(Text,{color:s.color,dimColor:i,children:[a,l]}),t[3]=s.color,t[4]=i,t[5]=a,t[6]=l,t[7]=c;else c=t[7];return c}
var NMi,_vn,W5r;
var ff=b(()=>{Zs();je();NMi=x(tt(),1),_vn=x(oe(),1),W5r={success:{icon:Xe.tick,color:"success",ariaLabel:"done:"},error:{icon:Xe.cross,color:"error",ariaLabel:"failed:"},warning:{icon:Xe.warning,color:"warning",ariaLabel:"warning:"},info:{icon:Xe.info,color:"suggestion",ariaLabel:"note:"},pending:{icon:Xe.circle,color:void 0,ariaLabel:"pending:"},loading:{icon:"\u2026",color:void 0,ariaLabel:"loading:"}}});
export {bs,NMi,_vn,W5r,ff};
