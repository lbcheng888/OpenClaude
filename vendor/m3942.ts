// @ts-nocheck
import {Text} from "./m2433.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Box} from "./m2432.ts";
import {xB,j0e} from "./m3918.ts";
import {Yn,Pl} from "./m2465.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function jUa(e){let t=KUa.c(20),{notebook_path:n,cell_id:r,new_source:o,cell_type:s,edit_mode:i,verbose:a}=e,l=i===void 0?"replace":i,c=l==="delete"?"delete":`${l} cell in`,u;if(t[0]!==c)u=ice.jsxs(Text,{color:"subtle",children:["User rejected ",c," "]}),t[0]=c,t[1]=u;else u=t[1];let d;if(t[2]!==n||t[3]!==a)d=a?n:zUa.relative(isTmuxControlMode(),n),t[2]=n,t[3]=a,t[4]=d;else d=t[4];let p;if(t[5]!==d)p=ice.jsx(Text,{bold:!0,color:"subtle",children:d}),t[5]=d,t[6]=p;else p=t[6];let m;if(t[7]!==r)m=ice.jsxs(Text,{color:"subtle",children:[" at cell ",r]}),t[7]=r,t[8]=m;else m=t[8];let f;if(t[9]!==u||t[10]!==p||t[11]!==m)f=ice.jsxs(Box,{flexDirection:"row",children:[u,p,m]}),t[9]=u,t[10]=p,t[11]=m,t[12]=f;else f=t[12];let h;if(t[13]!==s||t[14]!==l||t[15]!==o)h=l!=="delete"&&ice.jsx(Box,{marginTop:1,flexDirection:"column",children:ice.jsx(xB,{code:o,filePath:s==="markdown"?"file.md":"file.py",dim:!0})}),t[13]=s,t[14]=l,t[15]=o,t[16]=h;else h=t[16];let g;if(t[17]!==f||t[18]!==h)g=ice.jsx(Yn,{children:ice.jsxs(Box,{flexDirection:"column",children:[f,h]})}),t[17]=f,t[18]=h,t[19]=g;else g=t[19];return g}
var KUa,zUa,ice;
var YUa=b(()=>{Po();je();j0e();Pl();KUa=x(tt(),1),zUa=require("path"),ice=x(oe(),1)});
export {jUa,KUa,zUa,ice,YUa};
