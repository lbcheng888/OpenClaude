// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {Oo,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {qE,BG} from "./m4563.ts";
import {Text} from "./m2433.ts";
import {ga,rh} from "./m2550.ts";
import {at,Wo} from "./m2557.ts";
import {bn,Is} from "./m2565.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function xTl(e){let t=ITl.c(52),{currentRepo:n,useCurrentRepo:r,repoUrl:o,onRepoUrlChange:s,onSubmit:i,onToggleUseCurrentRepo:a}=e,[l,c]=vvo.useState(0),[u,d]=vvo.useState(!1),m=_r().columns,f;if(t[0]!==n||t[1]!==i||t[2]!==o||t[3]!==r)f=()=>{if(!(r?n:o)?.trim()){d(!0);return}i()},t[0]=n,t[1]=i,t[2]=o,t[3]=r,t[4]=f;else f=t[4];let h=f,g=!r||!n,_;if(t[5]!==a)_=()=>{a(!0),d(!1)},t[5]=a,t[6]=_;else _=t[6];let T=_,y;if(t[7]!==a)y=()=>{a(!1),d(!1)},t[7]=a,t[8]=y;else y=t[8];let S=y,E;if(t[9]!==S||t[10]!==T||t[11]!==h)E={"confirm:previous":T,"confirm:next":S,"confirm:yes":h},t[9]=S,t[10]=T,t[11]=h,t[12]=E;else E=t[12];let R=!g,w;if(t[13]!==R)w={context:"Confirmation",isActive:R},t[13]=R,t[14]=w;else w=t[14];Oo(E,w);let H;if(t[15]!==S||t[16]!==T)H={"confirm:previous":T,"confirm:next":S},t[15]=S,t[16]=T,t[17]=H;else H=t[17];let k;if(t[18]!==g)k={context:"Confirmation",isActive:g},t[18]=g,t[19]=k;else k=t[19];Oo(H,k);let I;if(t[20]===Symbol.for("react.memo_cache_sentinel"))I=zI.jsx(Box,{marginBottom:1,children:zI.jsx(qE,{subtitle:"Select GitHub repository",children:"Install GitHub App"})}),t[20]=I;else I=t[20];let D;if(t[21]!==n||t[22]!==r)D=n&&zI.jsx(Box,{marginBottom:1,children:zI.jsxs(Text,{bold:r,color:r?"permission":void 0,children:[r?"> ":"  ","Use current repository: ",n]})}),t[21]=n,t[22]=r,t[23]=D;else D=t[23];let O=!r||!n,L=!r||!n?"permission":void 0,P=!r||!n?"> ":"  ",M=n?"Enter a different repository":"Enter repository",B;if(t[24]!==O||t[25]!==L||t[26]!==P||t[27]!==M)B=zI.jsx(Box,{marginBottom:1,children:zI.jsxs(Text,{bold:O,color:L,children:[P,M]})}),t[24]=O,t[25]=L,t[26]=P,t[27]=M,t[28]=B;else B=t[28];let N;if(t[29]!==n||t[30]!==l||t[31]!==h||t[32]!==s||t[33]!==o||t[34]!==m||t[35]!==r)N=(!r||!n)&&zI.jsx(Box,{marginLeft:2,marginBottom:1,children:zI.jsx(ga,{value:o,onChange:(j)=>{s(j),d(!1)},onSubmit:h,focus:!0,placeholder:"Enter a repo as owner/repo or https://github.com/owner/repo\u2026",columns:m,cursorOffset:l,onChangeCursorOffset:c,showCursor:!0})}),t[29]=n,t[30]=l,t[31]=h,t[32]=s,t[33]=o,t[34]=m,t[35]=r,t[36]=N;else N=t[36];let F;if(t[37]!==D||t[38]!==B||t[39]!==N)F=zI.jsxs(Box,{flexDirection:"column",borderStyle:"round",paddingX:1,children:[I,D,B,N]}),t[37]=D,t[38]=B,t[39]=N,t[40]=F;else F=t[40];let V;if(t[41]!==u)V=u&&zI.jsx(Box,{marginLeft:3,marginBottom:1,children:zI.jsx(Text,{color:"error",children:"Please enter a repository name to continue"})}),t[41]=u,t[42]=V;else V=t[42];let G;if(t[43]!==n)G=n?zI.jsx(at,{chord:["up","down"],action:"select"}):null,t[43]=n,t[44]=G;else G=t[44];let z;if(t[45]===Symbol.for("react.memo_cache_sentinel"))z=zI.jsx(at,{chord:"enter",action:"continue"}),t[45]=z;else z=t[45];let J;if(t[46]!==G)J=zI.jsx(Box,{marginLeft:3,children:zI.jsx(Text,{dimColor:!0,children:zI.jsxs(bn,{children:[G,z]})})}),t[46]=G,t[47]=J;else J=t[47];let K;if(t[48]!==F||t[49]!==V||t[50]!==J)K=zI.jsxs(zI.Fragment,{children:[F,V,J]}),t[48]=F,t[49]=V,t[50]=J,t[51]=K;else K=t[51];return K}
var ITl,vvo,zI;
var DTl=b(()=>{Is();BG();Wo();rh();ui();je();ss();ITl=x(tt(),1),vvo=x(et(),1),zI=x(oe(),1)});
export {xTl,ITl,vvo,zI,DTl};
