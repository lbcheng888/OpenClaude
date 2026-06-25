// @ts-nocheck
import {_r,ui} from "../../vendor/m2463.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {Sdt,V1} from "../../vendor/m4006.ts";
import {parseUserSpecifiedModel,renderModelSetting,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Jht,wvl,NPe,nGt} from "./4808_leftWidth.ts";
import {Ne} from "../../vendor/m583.ts";
import {truncate} from "../../vendor/m239.ts";
import {yet,Cp} from "./2223_level.ts";
import {getProTrialState,formatTrialBadge,Zht} from "../../vendor/m4811.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {Text} from "../../vendor/m2433.ts";
import {Cs,tp} from "./2284_loggedTmuxCcDisable.ts";
import {N6e,vpo} from "../../vendor/m4017.ts";
import {yY,G3t} from "../../vendor/m4016.ts";
import {Box} from "../../vendor/m2432.ts";
import {Gvl,Gzn} from "./4813_children.ts";
import {ND,s_e} from "../../vendor/m3298.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {Xo} from "../../vendor/m240.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
function Kvl(){let e=Vvl.c(40),{columns:t}=_r(),n=_t(Jcm),r=_t(Ycm),o=Sdt(),s,i,a,l,c,u,d,p;if(e[0]!==n||e[1]!==t||e[2]!==r||e[3]!==o){let k=parseUserSpecifiedModel(o),I=renderModelSetting(o),{version:D,cwd:O,billingType:L,agentName:P}=Jht();s=n??P,p=Ne.CLAUDE_CODE_TUI_JUST_SWITCHED!==void 0;let M=Math.max(t-15,20);d=truncate(D,Math.max(M-13,6));let B=yet(k,r);l=null;let N=0;{let V,G;if(e[12]===Symbol.for("react.memo_cache_sentinel"))G=getProTrialState(),V=formatTrialBadge(G),e[12]=V,e[13]=G;else V=e[12],G=e[13];let z=V;if(z){let J;if(e[14]===Symbol.for("react.memo_cache_sentinel"))J=sn(` \xB7 ${z}`),e[14]=J;else J=e[14];N=J;let K;if(e[15]===Symbol.for("react.memo_cache_sentinel"))K=bS.jsx(Text,{dimColor:!0,children:" \xB7 "}),e[15]=K;else K=e[15];let j;if(e[16]===Symbol.for("react.memo_cache_sentinel"))j=bS.jsxs(Text,{children:[K,bS.jsx(Text,{color:G.status==="expired"?"suggestion":"warning",children:z})]}),e[16]=j;else j=e[16];l=j}}({shouldSplit:i,truncatedModel:u,truncatedBilling:c}=wvl(I+B,L,M-N));let F=s?M-1-sn(s)-3:M;a=NPe(O,Math.max(F,10)),e[0]=n,e[1]=t,e[2]=r,e[3]=o,e[4]=s,e[5]=i,e[6]=a,e[7]=l,e[8]=c,e[9]=u,e[10]=d,e[11]=p}else s=e[4],i=e[5],a=e[6],l=e[7],c=e[8],u=e[9],d=e[10],p=e[11];let m=a,f=s&&`@${s}`,h;if(e[17]!==f||e[18]!==m)h=[f,m].filter(Boolean),e[17]=f,e[18]=m,e[19]=h;else h=e[19];let g=h.join(" \xB7 "),_;if(e[20]===Symbol.for("react.memo_cache_sentinel"))_=Vzn?bS.jsx(Vzn.Mascot,{fallback:Cs()?bS.jsx(N6e,{}):bS.jsx(yY,{})}):Cs()?bS.jsx(N6e,{}):bS.jsx(yY,{}),e[20]=_;else _=e[20];let T;if(e[21]===Symbol.for("react.memo_cache_sentinel"))T=Vzn?bS.jsx(Vzn.Title,{}):bS.jsx(Text,{bold:!0,children:"Claude Code"}),e[21]=T;else T=e[21];let y;if(e[22]!==d)y=bS.jsxs(Text,{children:[T," ",bS.jsxs(Text,{dimColor:!0,children:["v",d]})]}),e[22]=d,e[23]=y;else y=e[23];let S;if(e[24]!==i||e[25]!==l||e[26]!==c||e[27]!==u)S=i?bS.jsxs(bS.Fragment,{children:[bS.jsx(Text,{dimColor:!0,children:u}),bS.jsxs(Text,{children:[bS.jsx(Text,{dimColor:!0,children:c}),l]})]}):bS.jsxs(Text,{children:[bS.jsxs(Text,{dimColor:!0,children:[u," \xB7 ",c]}),l]}),e[24]=i,e[25]=l,e[26]=c,e[27]=u,e[28]=S;else S=e[28];let E;if(e[29]!==g)E=g&&bS.jsx(Text,{dimColor:!0,children:g}),e[29]=g,e[30]=E;else E=e[30];let R;if(e[31]!==y||e[32]!==S||e[33]!==E)R=bS.jsxs(Box,{flexDirection:"row",gap:2,alignItems:"center",children:[_,bS.jsxs(Box,{flexDirection:"column",children:[y,S,E]})]}),e[31]=y,e[32]=S,e[33]=E,e[34]=R;else R=e[34];let w;if(e[35]!==p)w=p&&bS.jsx(Box,{paddingLeft:2,flexDirection:"column",marginTop:1,children:bS.jsx(Gvl,{})}),e[35]=p,e[36]=w;else w=e[36];let H;if(e[37]!==R||e[38]!==w)H=bS.jsx(ND,{children:bS.jsxs(Box,{flexDirection:"column",children:[R,w]})}),e[37]=R,e[38]=w,e[39]=H;else H=e[39];return H}
function Ycm(e){return e.effortValue}
function Jcm(e){return e.agent}
var Vvl,bS,Vzn=null;
var zvl=b(()=>{V1();ui();mc();je();Zht();uo();Cp();Ir();Xo();tp();nGt();Ro();s_e();vpo();G3t();Gzn();Vvl=x(tt(),1),bS=x(oe(),1)});
export {Kvl,Ycm,Jcm,Vvl,bS,Vzn,zvl};
