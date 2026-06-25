// @ts-nocheck
import {i_,Sw} from "./m2789.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Bl,d_} from "./m3354.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function nDl(e){let t=tDl.c(15),{directoryPath:n,onRemove:r,onCancel:o,permissionContext:s,setPermissionContext:i}=e,a;if(t[0]!==n||t[1]!==r||t[2]!==s||t[3]!==i)a=()=>{let m=i_(s,{type:"removeDirectories",directories:[n],destination:"session"});i(m),r()},t[0]=n,t[1]=r,t[2]=s,t[3]=i,t[4]=a;else a=t[4];let l=a,c;if(t[5]!==n)c=UWe.jsx(Box,{marginX:2,flexDirection:"column",children:UWe.jsx(Text,{bold:!0,children:n})}),t[5]=n,t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u=UWe.jsx(Text,{children:"Claude Code will no longer have access to files in this directory."}),t[7]=u;else u=t[7];let d;if(t[8]!==l||t[9]!==o)d=UWe.jsx(Bl,{onConfirm:l,onCancel:o}),t[8]=l,t[9]=o,t[10]=d;else d=t[10];let p;if(t[11]!==o||t[12]!==c||t[13]!==d)p=UWe.jsxs(preInitQueue,{title:"Remove directory from workspace?",onCancel:o,color:"error",children:[c,u,d]}),t[11]=o,t[12]=c,t[13]=d,t[14]=p;else p=t[14];return p}
var tDl,UWe;
var rDl=b(()=>{je();Sw();d_();di();tDl=x(tt(),1),UWe=x(oe(),1)});
export {nDl,tDl,UWe,rDl};
