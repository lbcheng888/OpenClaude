// @ts-nocheck
import {wIe,ZBt} from "../src/agent/3357_title.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function hm(e){let t=d_a.c(15),{title:n,subtitle:r,color:o,titleColor:s,innerPaddingX:i,requestSource:a,titleRight:l,children:c}=e,u=o===void 0?"permission":o,d=i===void 0?1:i,p;if(t[0]!==a||t[1]!==r||t[2]!==n||t[3]!==s)p=z3e.jsx(wIe,{title:n,subtitle:r,color:s,requestSource:a,srPrefix:"Permission Required:"}),t[0]=a,t[1]=r,t[2]=n,t[3]=s,t[4]=p;else p=t[4];let m;if(t[5]!==p||t[6]!==l)m=z3e.jsx(Box,{paddingX:1,flexDirection:"column",children:z3e.jsxs(Box,{justifyContent:"space-between",children:[p,l]})}),t[5]=p,t[6]=l,t[7]=m;else m=t[7];let f;if(t[8]!==c||t[9]!==d)f=z3e.jsx(Box,{flexDirection:"column",paddingX:d,children:c}),t[8]=c,t[9]=d,t[10]=f;else f=t[10];let h;if(t[11]!==u||t[12]!==m||t[13]!==f)h=z3e.jsxs(Box,{flexDirection:"column",borderStyle:"round",borderColor:u,borderLeft:!1,borderRight:!1,borderBottom:!1,marginTop:1,children:[m,f]}),t[11]=u,t[12]=m,t[13]=f,t[14]=h;else h=t[14];return h}
var d_a,z3e;
var DI=b(()=>{je();ZBt();d_a=x(tt(),1),z3e=x(oe(),1)});
export {hm,d_a,z3e,DI};
