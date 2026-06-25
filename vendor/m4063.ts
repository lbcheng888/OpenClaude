// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {ZQ,TUe,mDt} from "./m2215.ts";
import {v1e,Ud,R1e} from "./m615.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Zke,Yk} from "./m2796.ts";
import {truncateToWidth} from "./m239.ts";
import {Uas,Pa} from "./m720.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var mqa={};
ft(mqa,{UserChannelMessage:()=>UserChannelMessage});
function qDp(e){let t=e.lastIndexOf(":");return t===-1?e:e.slice(t+1)}
function UserChannelMessage(e){let t=pqa.c(36),{addMargin:n,param:r}=e,{text:o}=r,s,i,a,l,c,u,d,p,m,f,h;if(t[0]!==n||t[1]!==o){f=Symbol.for("react.early_return_sentinel");e:{let y=o,S="";if(y.startsWith(ZQ)){let B=y.indexOf(`
`);if(B!==-1&&y.startsWith(v1e,B+1))S=y.slice(0,B),y=y.slice(B+1)}let E=y.lastIndexOf(N3n)+N3n.length;if(E>N3n.length-1){let B=y.slice(E);if($Dp.includes(B))y=y.slice(0,E)}let R=BDp.exec(y);if(!R){let B=n?1:0,N;if(t[13]!==o)N=o.trim(),t[13]=o,t[14]=N;else N=t[14];let F;if(t[15]!==N)F=Txe.jsx(Text,{children:N}),t[15]=N,t[16]=F;else F=t[16];let V;if(t[17]!==F||t[18]!==B)V=Txe.jsx(Box,{marginTop:B,children:F}),t[17]=F,t[18]=B,t[19]=V;else V=t[19];f=V;break e}let[w,H,k]=R,I=H===void 0?"":H,D=UDp.exec(k??"")?.[1],O=Zke(I);if(S===`${ZQ}${O} while you were working:`||S===`${ZQ}${O}:`)S="";let L=y.slice(w.length),P=L.trimEnd();if(P.endsWith(dqa))L=P.slice(0,-dqa.length);let M=`${S?`${S} `:""}${L}`.trim().replace(/\s+/g," ");if(h=truncateToWidth(M,WDp),a=Box,m=n?1:0,i=Text,t[20]===Symbol.for("react.memo_cache_sentinel"))d=Txe.jsx(Text,{color:"suggestion",children:Uas}),t[20]=d;else d=t[20];p=" ",s=Text,l=!0,c=qDp(Zke(I)),u=D?` \xB7 ${Zke(D)}`:""}t[0]=n,t[1]=o,t[2]=s,t[3]=i,t[4]=a,t[5]=l,t[6]=c,t[7]=u,t[8]=d,t[9]=p,t[10]=m,t[11]=f,t[12]=h}else s=t[2],i=t[3],a=t[4],l=t[5],c=t[6],u=t[7],d=t[8],p=t[9],m=t[10],f=t[11],h=t[12];if(f!==Symbol.for("react.early_return_sentinel"))return f;let g;if(t[21]!==s||t[22]!==l||t[23]!==c||t[24]!==u)g=Txe.jsxs(s,{dimColor:l,children:[c,u,":"]}),t[21]=s,t[22]=l,t[23]=c,t[24]=u,t[25]=g;else g=t[25];let _;if(t[26]!==i||t[27]!==d||t[28]!==p||t[29]!==g||t[30]!==h)_=Txe.jsxs(i,{children:[d,p,g," ",h]}),t[26]=i,t[27]=d,t[28]=p,t[29]=g,t[30]=h,t[31]=_;else _=t[31];let T;if(t[32]!==a||t[33]!==_||t[34]!==m)T=Txe.jsx(a,{marginTop:m,children:_}),t[32]=a,t[33]=_,t[34]=m,t[35]=T;else T=t[35];return T}
var pqa,Txe,BDp,N3n,dqa,UDp,$Dp,WDp=60;
var fqa=b(()=>{Pa();Ud();je();Xo();Yk();pqa=x(tt(),1),Txe=x(oe(),1),BDp=new RegExp(`^<${R1e}\\s+source="([^"]*)"([^>]*)>\\n?`),N3n=`</${R1e}>`,dqa=`
${N3n}`,UDp=/\buser="([^"]+)"/,$Dp=[`

${TUe(!1)}${mDt}`,`

${TUe(!1)}`,`

${TUe(!0)}${mDt}`,`

${TUe(!0)}`]});
export {mqa,qDp,UserChannelMessage,pqa,Txe,BDp,N3n,dqa,UDp,$Dp,WDp,fqa};
