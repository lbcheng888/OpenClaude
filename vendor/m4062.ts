// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {Text} from "./m2423.ts";
import {Pt,Go} from "./m632.ts";
import {Box} from "./m2422.ts";
import {Gn,sc} from "./m2455.ts";
import {mU,kIe} from "./m4051.ts";
import {initModule,Oz} from "./m2799.ts";
import {p$e,TLt} from "./m3009.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function IIe(e){let t=n2a.c(38),{file_path:n,operation:r,patch:o,firstLine:s,fileContent:i,content:a,style:l,verbose:c}=e,{columns:u}=mr(),d;if(t[0]!==r)d=zv.createElement(Text,{color:"subtle"},"User rejected ",r," to "),t[0]=r,t[1]=d;else d=t[1];let p;if(t[2]!==n||t[3]!==c)p=c?n:r2a.relative(Pt(),n),t[2]=n,t[3]=c,t[4]=p;else p=t[4];let m;if(t[5]!==p)m=zv.createElement(Text,{bold:!0,color:"subtle"},p),t[5]=p,t[6]=m;else m=t[6];let f;if(t[7]!==d||t[8]!==m)f=zv.createElement(Box,{flexDirection:"row"},d,m),t[7]=d,t[8]=m,t[9]=f;else f=t[9];let A=f;if(l==="condensed"&&!c){let y;if(t[10]!==A)y=zv.createElement(Gn,null,A),t[10]=A,t[11]=y;else y=t[11];return y}if(r==="write"&&a!==void 0){let y,T;if(t[12]!==a||t[13]!==c){let I=a.split(`
`);y=I.length-t2a,T=c?a:I.slice(0,t2a).join(`
`),t[12]=a,t[13]=c,t[14]=y,t[15]=T}else y=t[14],T=t[15];let v=T||"(No content)",R=u-12,k;if(t[16]!==n||t[17]!==v||t[18]!==R)k=zv.createElement(mU,{code:v,filePath:n,width:R,dim:!0}),t[16]=n,t[17]=v,t[18]=R,t[19]=k;else k=t[19];let x;if(t[20]!==y||t[21]!==c)x=!c&&zv.createElement(initModule,{count:y}),t[20]=y,t[21]=c,t[22]=x;else x=t[22];let H;if(t[23]!==k||t[24]!==x||t[25]!==A)H=zv.createElement(Gn,null,zv.createElement(Box,{flexDirection:"column"},A,k,x)),t[23]=k,t[24]=x,t[25]=A,t[26]=H;else H=t[26];return H}if(!o||o.length===0){let y;if(t[27]!==A)y=zv.createElement(Gn,null,A),t[27]=A,t[28]=y;else y=t[28];return y}let h=u-12,g;if(t[29]!==i||t[30]!==n||t[31]!==s||t[32]!==o||t[33]!==h)g=zv.createElement(p$e,{hunks:o,dim:!0,width:h,filePath:n,firstLine:s,fileContent:i}),t[29]=i,t[30]=n,t[31]=s,t[32]=o,t[33]=h,t[34]=g;else g=t[34];let _;if(t[35]!==g||t[36]!==A)_=zv.createElement(Gn,null,zv.createElement(Box,{flexDirection:"column"},A,g)),t[35]=g,t[36]=A,t[37]=_;else _=t[37];return _}
var n2a,r2a,zv,t2a=10;
var qlo=b(()=>{ki();Go();ze();Oz();kIe();sc();TLt();n2a=M(rt(),1),r2a=require("path"),zv=M(Te(),1)});
export {IIe,n2a,r2a,zv,t2a,qlo};
