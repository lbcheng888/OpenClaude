// @ts-nocheck
import {BIi,jH} from "./m2566.ts";
import {H$,pE} from "./m2548.ts";
import {measureElement,JSn} from "./m2451.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {qIi,jIi} from "./m2568.ts";
import {VIi,KIi} from "./m2569.ts";
import {Wu,lS} from "./m2571.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {readRoster,lr} from "./m2547.ts";
import {zs,Tn} from "./m2554.ts";
import {rs,at} from "./m2546.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Kn(e){let t=XIi.c(43),{title:n,titleEnd:r,subtitle:o,children:s,onCancel:i,color:a,hideInputGuide:l,hideBorder:c,inputGuide:u,isCancelActive:d}=e,p=a===void 0?"permission":a,m=d===void 0?!0:d,f=cS.useRef(null),{entries:A,exitState:h}=BIi(void 0,void 0,m),g;if(t[0]!==m||t[1]!==i)g=m?[{action:"confirm:no",run:i,hint:"cancel"}]:[],t[0]=m,t[1]=i,t[2]=g;else g=t[2];let _=g,y;if(t[3]!==_||t[4]!==A)y=[..._,...A],t[3]=_,t[4]=A,t[5]=y;else y=t[5];let T=y,S=cS.useContext(H$),v=cS.useRef(null),[R,k]=cS.useState(o?2:1),x;if(t[6]!==S||t[7]!==R)x=()=>{if(!S||!v.current)return;let te=measureElement(v.current).height;if(te!==R)k(te)},t[6]=S,t[7]=R,t[8]=x;else x=t[8];cS.useLayoutEffect(x);let H=R+1+(l?0:2),I;if(t[9]!==S||t[10]!==H)I=S?{...S,rows:Math.max(0,S.rows-H)}:null,t[9]=S,t[10]=H,t[11]=I;else I=t[11];let P=I,L;if(t[12]!==h||t[13]!==u)L=typeof u==="function"?u(h):h.pending?cS.default.createElement(Text,null,"Press ",h.keyName," again to exit"):u!=null?u:void 0,t[12]=h,t[13]=u,t[14]=L;else L=t[14];let D=L,N=typeof u==="function"||h.pending||u!=null,O;if(t[15]!==D||t[16]!==l||t[17]!==m||t[18]!==N)O=!l&&cS.default.createElement(Box,{marginTop:1},N?cS.default.createElement(Text,{dimColor:!0,italic:!0},D):!m?cS.default.createElement(Text,{dimColor:!0,italic:!0},JIi):cS.default.createElement(qIi,{boundary:f,fallback:cS.default.createElement(Text,{dimColor:!0,italic:!0},JIi)})),t[15]=D,t[16]=l,t[17]=m,t[18]=N,t[19]=O;else O=t[19];let $=O,U=c?0:1,W;if(t[20]!==p||t[21]!==n||t[22]!==r)W=r?cS.default.createElement(Box,{justifyContent:"space-between",gap:2},cS.default.createElement(Text,{bold:!0,color:p},n),cS.default.createElement(Text,{dimColor:!0,wrap:"truncate-start"},r)):cS.default.createElement(Text,{bold:!0,color:p},n),t[20]=p,t[21]=n,t[22]=r,t[23]=W;else W=t[23];let G;if(t[24]!==o)G=o&&cS.default.createElement(Text,{dimColor:!0},o),t[24]=o,t[25]=G;else G=t[25];let V;if(t[26]!==W||t[27]!==G)V=cS.default.createElement(Box,{ref:v,flexDirection:"column"},W,G),t[26]=W,t[27]=G,t[28]=V;else V=t[28];let Q;if(t[29]!==P||t[30]!==s)Q=cS.default.createElement(H$,{value:P},s),t[29]=P,t[30]=s,t[31]=Q;else Q=t[31];let K;if(t[32]!==V||t[33]!==Q)K=cS.default.createElement(Box,{flexDirection:"column",gap:1},V,Q),t[32]=V,t[33]=Q,t[34]=K;else K=t[34];let Y;if(t[35]!==T||t[36]!==$||t[37]!==K||t[38]!==U)Y=cS.default.createElement(VIi,{ref:f,scope:"Confirmation",claimFocus:!0,flexGrow:U,flexDirection:"column",bindings:T},K,$),t[35]=T,t[36]=$,t[37]=K,t[38]=U,t[39]=Y;else Y=t[39];let J=Y;if(c)return J;let ee;if(t[40]!==p||t[41]!==J)ee=cS.default.createElement(Wu,{color:p},J),t[40]=p,t[41]=J,t[42]=ee;else ee=t[42];return ee}
var XIi,cS,JIi;
var Li=b(()=>{pE();jH();JSn();ze();jIi();KIi();readRoster();zs();rs();lS();XIi=M(rt(),1),cS=M(Te(),1),JIi=cS.default.createElement(Tn,null,cS.default.createElement(at,{chord:"enter",action:"confirm"}),cS.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"}))});
export {Kn,XIi,cS,JIi,Li};
