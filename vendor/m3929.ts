// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {Text} from "./m2433.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Box} from "./m2432.ts";
import {Yn,Pl} from "./m2465.ts";
import {xB,j0e} from "./m3918.ts";
import {FO,uj} from "./m2812.ts";
import {h9e,j1t} from "./m3022.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function J0e(e){let t=pUa.c(38),{file_path:n,operation:r,patch:o,firstLine:s,fileContent:i,content:a,style:l,verbose:c}=e,{columns:u}=_r(),d;if(t[0]!==r)d=Uq.jsxs(Text,{color:"subtle",children:["User rejected ",r," to "]}),t[0]=r,t[1]=d;else d=t[1];let p;if(t[2]!==n||t[3]!==c)p=c?n:mUa.relative(isTmuxControlMode(),n),t[2]=n,t[3]=c,t[4]=p;else p=t[4];let m;if(t[5]!==p)m=Uq.jsx(Text,{bold:!0,color:"subtle",children:p}),t[5]=p,t[6]=m;else m=t[6];let f;if(t[7]!==d||t[8]!==m)f=Uq.jsxs(Box,{flexDirection:"row",children:[d,m]}),t[7]=d,t[8]=m,t[9]=f;else f=t[9];let h=f;if(l==="condensed"&&!c){let y;if(t[10]!==h)y=Uq.jsx(Yn,{children:h}),t[10]=h,t[11]=y;else y=t[11];return y}if(r==="write"&&a!==void 0){let y,S;if(t[12]!==a||t[13]!==c){let D=a.split(`
`);y=D.length-dUa,S=c?a:D.slice(0,dUa).join(`
`),t[12]=a,t[13]=c,t[14]=y,t[15]=S}else y=t[14],S=t[15];let R=S||"(No content)",w=u-12,H;if(t[16]!==n||t[17]!==R||t[18]!==w)H=Uq.jsx(xB,{code:R,filePath:n,width:w,dim:!0}),t[16]=n,t[17]=R,t[18]=w,t[19]=H;else H=t[19];let k;if(t[20]!==y||t[21]!==c)k=!c&&Uq.jsx(FO,{count:y}),t[20]=y,t[21]=c,t[22]=k;else k=t[22];let I;if(t[23]!==H||t[24]!==k||t[25]!==h)I=Uq.jsx(Yn,{children:Uq.jsxs(Box,{flexDirection:"column",children:[h,H,k]})}),t[23]=H,t[24]=k,t[25]=h,t[26]=I;else I=t[26];return I}if(!o||o.length===0){let y;if(t[27]!==h)y=Uq.jsx(Yn,{children:h}),t[27]=h,t[28]=y;else y=t[28];return y}let g=u-12,_;if(t[29]!==i||t[30]!==n||t[31]!==s||t[32]!==o||t[33]!==g)_=Uq.jsx(h9e,{hunks:o,dim:!0,width:g,filePath:n,firstLine:s,fileContent:i}),t[29]=i,t[30]=n,t[31]=s,t[32]=o,t[33]=g,t[34]=_;else _=t[34];let T;if(t[35]!==_||t[36]!==h)T=Uq.jsx(Yn,{children:Uq.jsxs(Box,{flexDirection:"column",children:[h,_]})}),t[35]=_,t[36]=h,t[37]=T;else T=t[37];return T}
var pUa,mUa,Uq,dUa=10;
var Juo=b(()=>{ui();Po();je();uj();j0e();Pl();j1t();pUa=x(tt(),1),mUa=require("path"),Uq=x(oe(),1)});
export {J0e,pUa,mUa,Uq,dUa,Juo};
