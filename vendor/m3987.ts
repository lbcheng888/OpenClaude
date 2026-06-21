// @ts-nocheck
import {c0n} from "../src/tui/3282_result.tsx";
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Sq,a$e} from "./m2803.ts";
import {at,rs} from "./m2546.ts";
import {p9e,d0n} from "./m3283.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function xEp(e){if(!e.match(/<sandbox_violations>([\s\S]*?)<\/sandbox_violations>/))return{cleanedStderr:e};return{cleanedStderr:c0n(e).trim()}}
function kEp(e){let t=e.match(lNa);if(!t)return{cleanedStderr:e,cwdResetWarning:null};let n=t[1]??null;return{cleanedStderr:e.replace(lNa,"").trim(),cwdResetWarning:n}}
function uqe(e){let t=cNa.c(34),{content:n,verbose:r,timeoutMs:o}=e,{stdout:s,stderr:i,isImage:a,returnCodeInterpretation:l,noOutputExpected:c,backgroundTaskId:u}=n,d=s===void 0?"":s,p=i===void 0?"":i,m,f,A,h,g,_,y;if(t[0]!==a||t[1]!==p||t[2]!==d||t[3]!==r){y=Symbol.for("react.early_return_sentinel");e:{let{cleanedStderr:k}=xEp(p);if({cleanedStderr:A,cwdResetWarning:f}=kEp(k),a){let x;if(t[11]===Symbol.for("react.memo_cache_sentinel"))x=C9.default.createElement(Gn,{height:1},C9.default.createElement(Text,{dimColor:!0},"[Image data detected and sent to Claude]")),t[11]=x;else x=t[11];y=x;break e}if(m=Box,h="column",t[12]!==d||t[13]!==r)g=d!==""?C9.default.createElement(Sq,{content:d,verbose:r}):null,t[12]=d,t[13]=r,t[14]=g;else g=t[14];_=A.trim()!==""?C9.default.createElement(Sq,{content:A,verbose:r,isError:!0}):null}t[0]=a,t[1]=p,t[2]=d,t[3]=r,t[4]=m,t[5]=f,t[6]=A,t[7]=h,t[8]=g,t[9]=_,t[10]=y}else m=t[4],f=t[5],A=t[6],h=t[7],g=t[8],_=t[9],y=t[10];if(y!==Symbol.for("react.early_return_sentinel"))return y;let T;if(t[15]!==f)T=f?C9.default.createElement(Gn,null,C9.default.createElement(Text,{dimColor:!0},f)):null,t[15]=f,t[16]=T;else T=t[16];let S;if(t[17]!==u||t[18]!==f||t[19]!==c||t[20]!==l||t[21]!==A||t[22]!==d)S=d===""&&A.trim()===""&&!f?C9.default.createElement(Gn,{height:1},C9.default.createElement(Text,{dimColor:!0},u?C9.default.createElement(C9.default.Fragment,null,"Running in the background"," ",C9.default.createElement(at,{chord:"down",action:"manage",parens:!0})):l||(c?"Done":"(No output)"))):null,t[17]=u,t[18]=f,t[19]=c,t[20]=l,t[21]=A,t[22]=d,t[23]=S;else S=t[23];let v;if(t[24]!==o)v=o&&C9.default.createElement(Gn,null,C9.default.createElement(p9e,{timeoutMs:o})),t[24]=o,t[25]=v;else v=t[25];let R;if(t[26]!==m||t[27]!==v||t[28]!==h||t[29]!==g||t[30]!==_||t[31]!==T||t[32]!==S)R=C9.default.createElement(m,{flexDirection:h},g,_,T,S,v),t[26]=m,t[27]=v,t[28]=h,t[29]=g,t[30]=_,t[31]=T,t[32]=S,t[33]=R;else R=t[33];return R}
var cNa,C9,lNa;
var KUn=b(()=>{rs();sc();a$e();d0n();ze();cNa=M(rt(),1),C9=M(Te(),1),lNa=/(?:^|\n)(Shell cwd was reset to .+)$/});
export {xEp,kEp,uqe,cNa,C9,lNa,KUn};
