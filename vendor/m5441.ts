// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {et,Ai} from "./m2208.ts";
import {tn,Hc} from "./m235.ts";
import {truncateToWidth} from "./m237.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Ab,Rte} from "./m3925.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function sht(e){let t=bGl.c(39),{questions:n,currentQuestionIndex:r,answers:o,hideSubmitTab:s}=e,i=s===void 0?!1:s,{columns:a}=mr(),l;if(t[0]!==a||t[1]!==r||t[2]!==i||t[3]!==n){e:{let h=i?"":` ${et.tick} Submit `,g=tn("\u2190 ")+tn(" \u2192")+tn(h),_=a-g;if(_<=0){let L;if(t[5]!==r||t[6]!==n){let D;if(t[8]!==r)D=(N,O)=>{let $=N?.header||`Q${O+1}`;return O===r?$.slice(0,3):""},t[8]=r,t[9]=D;else D=t[9];L=n.map(D),t[5]=r,t[6]=n,t[7]=L}else L=t[7];l=L;break e}let y=n.map(HOm);if(y.map(kOm).reduce(xOm,0)<=_){l=y;break e}let v=y[r]||"",R=4+tn(v),k=Math.min(R,_/2),x=_-k,H=n.length-1,I=Math.max(6,Math.floor(x/Math.max(H,1))),P;if(t[10]!==r||t[11]!==k||t[12]!==I)P=(L,D)=>{if(D===r){let N=k-2-2;return truncateToWidth(L,N)}else{let N=I-2-2;return truncateToWidth(L,N)}},t[10]=r,t[11]=k,t[12]=I,t[13]=P;else P=t[13];l=y.map(P)}t[0]=a,t[1]=r,t[2]=i,t[3]=n,t[4]=l}else l=t[4];let c=l,u=n.length===1&&i,d;if(t[14]!==r||t[15]!==u)d=!u&&JPe.default.createElement(Text,{color:r===0?"inactive":void 0},"\u2190"," "),t[14]=r,t[15]=u,t[16]=d;else d=t[16];let p;if(t[17]!==o||t[18]!==r||t[19]!==n||t[20]!==c){let h;if(t[22]!==o||t[23]!==r||t[24]!==c)h=(g,_)=>{let y=_===r,S=g?.question&&!!o[g.question]?et.checkboxOn:et.checkboxOff,v=c[_]||g?.header||`Q${_+1}`;return JPe.default.createElement(Box,{key:g?.question||`question-${_}`},JPe.default.createElement(Ab,{color:y?"permission":void 0,padded:!0},S," ",v))},t[22]=o,t[23]=r,t[24]=c,t[25]=h;else h=t[25];p=n.map(h),t[17]=o,t[18]=r,t[19]=n,t[20]=c,t[21]=p}else p=t[21];let m;if(t[26]!==r||t[27]!==i||t[28]!==n.length)m=!i&&JPe.default.createElement(Box,{key:"submit"},JPe.default.createElement(Ab,{color:r===n.length?"permission":void 0,padded:!0},et.tick," Submit")),t[26]=r,t[27]=i,t[28]=n.length,t[29]=m;else m=t[29];let f;if(t[30]!==r||t[31]!==u||t[32]!==n.length)f=!u&&JPe.default.createElement(Text,{color:r===n.length?"inactive":void 0}," ","\u2192"),t[30]=r,t[31]=u,t[32]=n.length,t[33]=f;else f=t[33];let A;if(t[34]!==d||t[35]!==p||t[36]!==m||t[37]!==f)A=JPe.default.createElement(Box,{flexDirection:"row",marginBottom:1},d,p,m,f),t[34]=d,t[35]=p,t[36]=m,t[37]=f,t[38]=A;else A=t[38];return A}
function xOm(e,t){return e+t}
function kOm(e){return 4+tn(e)}
function HOm(e,t){return e?.header||`Q${t+1}`}
var bGl,JPe;
var bXn=b(()=>{Ai();ki();Hc();ze();ps();Rte();bGl=M(rt(),1),JPe=M(Te(),1)});
export {sht,xOm,kOm,HOm,bGl,JPe,bXn};
