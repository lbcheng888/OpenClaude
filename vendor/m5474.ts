// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {Xe,Zs} from "./m2216.ts";
import {sn,mc} from "./m237.ts";
import {truncateToWidth} from "./m239.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {gS,vte} from "./m3991.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Cyt(e){let t=sZl.c(39),{questions:n,currentQuestionIndex:r,answers:o,hideSubmitTab:s}=e,i=s===void 0?!1:s,{columns:a}=_r(),l;if(t[0]!==a||t[1]!==r||t[2]!==i||t[3]!==n){e:{let g=i?"":` ${Xe.tick} Submit `,_=sn("\u2190 ")+sn(" \u2192")+sn(g),T=a-_;if(T<=0){let L;if(t[5]!==r||t[6]!==n){let P;if(t[8]!==r)P=(M,B)=>{let N=M?.header||`Q${B+1}`;return B===r?N.slice(0,3):""},t[8]=r,t[9]=P;else P=t[9];L=n.map(P),t[5]=r,t[6]=n,t[7]=L}else L=t[7];l=L;break e}let y=n.map(B$m);if(y.map(F$m).reduce(N$m,0)<=T){l=y;break e}let R=y[r]||"",w=4+sn(R),H=Math.min(w,T/2),k=T-H,I=n.length-1,D=Math.max(6,Math.floor(k/Math.max(I,1))),O;if(t[10]!==r||t[11]!==H||t[12]!==D)O=(L,P)=>{if(P===r){let M=H-2-2;return truncateToWidth(L,M)}else{let M=D-2-2;return truncateToWidth(L,M)}},t[10]=r,t[11]=H,t[12]=D,t[13]=O;else O=t[13];l=y.map(O)}t[0]=a,t[1]=r,t[2]=i,t[3]=n,t[4]=l}else l=t[4];let c=l,u=n.length===1&&i,d;if(t[14]!==r||t[15]!==u)d=!u&&BSe.jsxs(Text,{color:r===0?"inactive":void 0,children:["\u2190"," "]}),t[14]=r,t[15]=u,t[16]=d;else d=t[16];let p;if(t[17]!==o||t[18]!==r||t[19]!==n||t[20]!==c){let g;if(t[22]!==o||t[23]!==r||t[24]!==c)g=(_,T)=>{let y=T===r,E=_?.question&&!!o[_.question]?Xe.checkboxOn:Xe.checkboxOff,R=c[T]||_?.header||`Q${T+1}`;return BSe.jsx(Box,{children:BSe.jsxs(gS,{color:y?"permission":void 0,padded:!0,children:[E," ",R]})},_?.question||`question-${T}`)},t[22]=o,t[23]=r,t[24]=c,t[25]=g;else g=t[25];p=n.map(g),t[17]=o,t[18]=r,t[19]=n,t[20]=c,t[21]=p}else p=t[21];let m;if(t[26]!==r||t[27]!==i||t[28]!==n.length)m=!i&&BSe.jsx(Box,{children:BSe.jsxs(gS,{color:r===n.length?"permission":void 0,padded:!0,children:[Xe.tick," Submit"]})},"submit"),t[26]=r,t[27]=i,t[28]=n.length,t[29]=m;else m=t[29];let f;if(t[30]!==r||t[31]!==u||t[32]!==n.length)f=!u&&BSe.jsxs(Text,{color:r===n.length?"inactive":void 0,children:[" ","\u2192"]}),t[30]=r,t[31]=u,t[32]=n.length,t[33]=f;else f=t[33];let h;if(t[34]!==d||t[35]!==p||t[36]!==m||t[37]!==f)h=BSe.jsxs(Box,{flexDirection:"row",marginBottom:1,children:[d,p,m,f]}),t[34]=d,t[35]=p,t[36]=m,t[37]=f,t[38]=h;else h=t[38];return h}
function N$m(e,t){return e+t}
function F$m(e){return 4+sn(e)}
function B$m(e,t){return e?.header||`Q${t+1}`}
var sZl,BSe;
var Ctr=b(()=>{Zs();ui();mc();je();Xo();vte();sZl=x(tt(),1),BSe=x(oe(),1)});
export {Cyt,N$m,F$m,B$m,sZl,BSe,Ctr};
