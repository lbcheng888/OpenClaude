// @ts-nocheck
import {Ec} from "./m2449.ts";
import {Text} from "./m2423.ts";
import {Gn,sc} from "./m2455.ts";
import {bP,Vhe} from "./m3282.ts";
import {p9e,d0n} from "./m3283.ts";
import {Box} from "./m2422.ts";
import {formatFileSize,ps} from "./m238.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Got(e){let t=Via.c(30),{output:n,fullOutput:r,elapsedTimeSeconds:o,totalLines:s,totalBytes:i,timeoutMs:a,verbose:l}=e,c;if(t[0]!==r)c=Ec(r.trim()),t[0]=r,t[1]=c;else c=t[1];let u=c,d,p;if(t[2]!==n||t[3]!==u||t[4]!==l)d=Ec(n.trim()).split(`
`).filter(d8d),p=l?u:d.slice(-5).join(`
`),t[2]=n,t[3]=u,t[4]=l,t[5]=d,t[6]=p;else d=t[5],p=t[6];let m=p;if(!d.length){let k;if(t[7]===Symbol.for("react.memo_cache_sentinel"))k=Wq.default.createElement(Text,{dimColor:!0},"Running\u2026 "),t[7]=k;else k=t[7];let x;if(t[8]!==o||t[9]!==a)x=Wq.default.createElement(Gn,null,Wq.default.createElement(bP,null,k,Wq.default.createElement(p9e,{elapsedTimeSeconds:o,timeoutMs:a}))),t[8]=o,t[9]=a,t[10]=x;else x=t[10];return x}let f=s?Math.max(0,s-5):0,A="";if(!l&&i&&s)A=`~${s} lines`;else if(!l&&f>0)A=`+${f} lines`;let h=l?void 0:Math.min(5,d.length),g;if(t[11]!==m)g=Wq.default.createElement(Text,{dimColor:!0},m),t[11]=m,t[12]=g;else g=t[12];let _;if(t[13]!==h||t[14]!==g)_=Wq.default.createElement(Box,{height:h,flexDirection:"column",overflow:"hidden"},g),t[13]=h,t[14]=g,t[15]=_;else _=t[15];let y;if(t[16]!==A)y=A?Wq.default.createElement(Text,{dimColor:!0},A):null,t[16]=A,t[17]=y;else y=t[17];let T;if(t[18]!==o||t[19]!==a)T=Wq.default.createElement(p9e,{elapsedTimeSeconds:o,timeoutMs:a}),t[18]=o,t[19]=a,t[20]=T;else T=t[20];let S;if(t[21]!==i)S=i?Wq.default.createElement(Text,{dimColor:!0},formatFileSize(i)):null,t[21]=i,t[22]=S;else S=t[22];let v;if(t[23]!==y||t[24]!==T||t[25]!==S)v=Wq.default.createElement(Box,{flexDirection:"row",gap:1},y,T,S),t[23]=y,t[24]=T,t[25]=S,t[26]=v;else v=t[26];let R;if(t[27]!==_||t[28]!==v)R=Wq.default.createElement(Gn,null,Wq.default.createElement(bP,null,Wq.default.createElement(Box,{flexDirection:"column"},_,v))),t[27]=_,t[28]=v,t[29]=R;else R=t[29];return R}
function d8d(e){return e}
var Via,Wq;
var p0n=b(()=>{ze();ps();sc();Vhe();d0n();Via=M(rt(),1),Wq=M(Te(),1)});
export {Got,d8d,Via,Wq,p0n};
