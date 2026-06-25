// @ts-nocheck
import {d1i,TI} from "./m2577.ts";
import {Z2,SE} from "./m2559.ts";
import {measureElement,NAn} from "./m2461.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {h1i,_1i} from "./m2579.ts";
import {S1i,E1i} from "./m2580.ts";
import {ku,rS} from "./m2582.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {uc,dr} from "./m2558.ts";
import {Is,bn} from "./m2565.ts";
import {Wo,at} from "./m2557.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function preInitQueue(e){let t=v1i.c(43),{title:n,titleEnd:r,subtitle:o,children:s,onCancel:i,color:a,hideInputGuide:l,hideBorder:c,inputGuide:u,isCancelActive:d}=e,p=a===void 0?"permission":a,m=d===void 0?!0:d,f=Lhe.useRef(null),{entries:h,exitState:g}=d1i(void 0,void 0,m),_;if(t[0]!==m||t[1]!==i)_=m?[{action:"confirm:no",run:i,hint:"cancel"}]:[],t[0]=m,t[1]=i,t[2]=_;else _=t[2];let T=_,y;if(t[3]!==T||t[4]!==h)y=[...T,...h],t[3]=T,t[4]=h,t[5]=y;else y=t[5];let S=y,E=Lhe.useContext(Z2),R=Lhe.useRef(null),[w,H]=Lhe.useState(o?2:1),k;if(t[6]!==E||t[7]!==w)k=()=>{if(!E||!R.current)return;let te=measureElement(R.current).height;if(te!==w)H(te)},t[6]=E,t[7]=w,t[8]=k;else k=t[8];Lhe.useLayoutEffect(k);let I=w+1+(l?0:2),D;if(t[9]!==E||t[10]!==I)D=E?{...E,rows:Math.max(0,E.rows-I)}:null,t[9]=E,t[10]=I,t[11]=D;else D=t[11];let O=D,L;if(t[12]!==g||t[13]!==u)L=typeof u==="function"?u(g):g.pending?SI.jsxs(Text,{children:["Press ",g.keyName," again to exit"]}):u!=null?u:void 0,t[12]=g,t[13]=u,t[14]=L;else L=t[14];let P=L,M=typeof u==="function"||g.pending||u!=null,B;if(t[15]!==P||t[16]!==l||t[17]!==m||t[18]!==M)B=!l&&SI.jsx(Box,{marginTop:1,children:M?SI.jsx(Text,{dimColor:!0,italic:!0,children:P}):!m?SI.jsx(Text,{dimColor:!0,italic:!0,children:R1i}):SI.jsx(h1i,{boundary:f,fallback:SI.jsx(Text,{dimColor:!0,italic:!0,children:R1i})})}),t[15]=P,t[16]=l,t[17]=m,t[18]=M,t[19]=B;else B=t[19];let N=B,F=c?0:1,V;if(t[20]!==p||t[21]!==n||t[22]!==r)V=r?SI.jsxs(Box,{justifyContent:"space-between",gap:2,children:[SI.jsx(Text,{bold:!0,color:p,children:n}),SI.jsx(Text,{dimColor:!0,wrap:"truncate-start",children:r})]}):SI.jsx(Text,{bold:!0,color:p,children:n}),t[20]=p,t[21]=n,t[22]=r,t[23]=V;else V=t[23];let G;if(t[24]!==o)G=o&&SI.jsx(Text,{dimColor:!0,children:o}),t[24]=o,t[25]=G;else G=t[25];let z;if(t[26]!==V||t[27]!==G)z=SI.jsxs(Box,{ref:R,flexDirection:"column",children:[V,G]}),t[26]=V,t[27]=G,t[28]=z;else z=t[28];let J;if(t[29]!==O||t[30]!==s)J=SI.jsx(Z2,{value:O,children:s}),t[29]=O,t[30]=s,t[31]=J;else J=t[31];let K;if(t[32]!==z||t[33]!==J)K=SI.jsxs(Box,{flexDirection:"column",gap:1,children:[z,J]}),t[32]=z,t[33]=J,t[34]=K;else K=t[34];let j;if(t[35]!==S||t[36]!==N||t[37]!==K||t[38]!==F)j=SI.jsxs(S1i,{ref:f,scope:"Confirmation",claimFocus:!0,flexGrow:F,flexDirection:"column",bindings:S,children:[K,N]}),t[35]=S,t[36]=N,t[37]=K,t[38]=F,t[39]=j;else j=t[39];let X=j;if(c)return X;let ee;if(t[40]!==p||t[41]!==X)ee=SI.jsx(ku,{color:p,children:X}),t[40]=p,t[41]=X,t[42]=ee;else ee=t[42];return ee}
var v1i,Lhe,SI,R1i;
var di=b(()=>{SE();TI();NAn();je();_1i();E1i();uc();Is();Wo();rS();v1i=x(tt(),1),Lhe=x(et(),1),SI=x(oe(),1),R1i=SI.jsxs(bn,{children:[SI.jsx(at,{chord:"enter",action:"confirm"}),SI.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]})});
export {preInitQueue,v1i,Lhe,SI,R1i,di};
