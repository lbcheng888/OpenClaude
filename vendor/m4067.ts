// @ts-nocheck
import {Text} from "./m2423.ts";
import {Pt,Go} from "./m632.ts";
import {Box} from "./m2422.ts";
import {mU,kIe} from "./m4051.ts";
import {Gn,sc} from "./m2455.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function y2a(e){let t=g2a.c(20),{notebook_path:n,cell_id:r,new_source:o,cell_type:s,edit_mode:i,verbose:a}=e,l=i===void 0?"replace":i,c=l==="delete"?"delete":`${l} cell in`,u;if(t[0]!==c)u=IN.createElement(Text,{color:"subtle"},"User rejected ",c," "),t[0]=c,t[1]=u;else u=t[1];let d;if(t[2]!==n||t[3]!==a)d=a?n:_2a.relative(Pt(),n),t[2]=n,t[3]=a,t[4]=d;else d=t[4];let p;if(t[5]!==d)p=IN.createElement(Text,{bold:!0,color:"subtle"},d),t[5]=d,t[6]=p;else p=t[6];let m;if(t[7]!==r)m=IN.createElement(Text,{color:"subtle"}," at cell ",r),t[7]=r,t[8]=m;else m=t[8];let f;if(t[9]!==u||t[10]!==p||t[11]!==m)f=IN.createElement(Box,{flexDirection:"row"},u,p,m),t[9]=u,t[10]=p,t[11]=m,t[12]=f;else f=t[12];let A;if(t[13]!==s||t[14]!==l||t[15]!==o)A=l!=="delete"&&IN.createElement(Box,{marginTop:1,flexDirection:"column"},IN.createElement(mU,{code:o,filePath:s==="markdown"?"file.md":"file.py",dim:!0})),t[13]=s,t[14]=l,t[15]=o,t[16]=A;else A=t[16];let h;if(t[17]!==f||t[18]!==A)h=IN.createElement(Gn,null,IN.createElement(Box,{flexDirection:"column"},f,A)),t[17]=f,t[18]=A,t[19]=h;else h=t[19];return h}
var g2a,_2a,IN;
var T2a=b(()=>{Go();ze();kIe();sc();g2a=M(rt(),1),_2a=require("path"),IN=M(Te(),1)});
export {y2a,g2a,_2a,IN,T2a};
