// @ts-nocheck
import {Yg,lx} from "./m2777.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {ac,e_} from "./m3338.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function GCl(e){let t=WCl.c(15),{directoryPath:n,onRemove:r,onCancel:o,permissionContext:s,setPermissionContext:i}=e,a;if(t[0]!==n||t[1]!==r||t[2]!==s||t[3]!==i)a=()=>{let m=Yg(s,{type:"removeDirectories",directories:[n],destination:"session"});i(m),r()},t[0]=n,t[1]=r,t[2]=s,t[3]=i,t[4]=a;else a=t[4];let l=a,c;if(t[5]!==n)c=Pne.createElement(Box,{marginX:2,flexDirection:"column"},Pne.createElement(Text,{bold:!0},n)),t[5]=n,t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u=Pne.createElement(Text,null,"Claude Code will no longer have access to files in this directory."),t[7]=u;else u=t[7];let d;if(t[8]!==l||t[9]!==o)d=Pne.createElement(ac,{onConfirm:l,onCancel:o}),t[8]=l,t[9]=o,t[10]=d;else d=t[10];let p;if(t[11]!==o||t[12]!==c||t[13]!==d)p=Pne.createElement(Kn,{title:"Remove directory from workspace?",onCancel:o,color:"error"},c,u,d),t[11]=o,t[12]=c,t[13]=d,t[14]=p;else p=t[14];return p}
var WCl,Pne;
var VCl=b(()=>{ze();lx();e_();Li();WCl=M(rt(),1),Pne=M(Te(),1)});
export {GCl,WCl,Pne,VCl};
