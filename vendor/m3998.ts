// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {nZ,bFe,FHt} from "./m2207.ts";
import {PMe,initKp,DMe} from "./m609.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {mxe,QH} from "./m2784.ts";
import {truncateToWidth} from "./m237.ts";
import {Vts,sl} from "./m715.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var $Na={};
isFullscreenWithTTY($Na,{UserChannelMessage:()=>UserChannelMessage});
function zEp(e){let t=e.lastIndexOf(":");return t===-1?e:e.slice(t+1)}
function UserChannelMessage(e){let t=UNa.c(36),{addMargin:n,param:r}=e,{text:o}=r,s,i,a,l,c,u,d,p,m,f,A;if(t[0]!==n||t[1]!==o){f=Symbol.for("react.early_return_sentinel");e:{let y=o,T="";if(y.startsWith(nZ)){let O=y.indexOf(`
`);if(O!==-1&&y.startsWith(PMe,O+1))T=y.slice(0,O),y=y.slice(O+1)}let S=y.lastIndexOf(QUn)+QUn.length;if(S>QUn.length-1){let O=y.slice(S);if(KEp.includes(O))y=y.slice(0,S)}let v=GEp.exec(y);if(!v){let O=n?1:0,$;if(t[13]!==o)$=o.trim(),t[13]=o,t[14]=$;else $=t[14];let U;if(t[15]!==$)U=ZW.createElement(Text,null,$),t[15]=$,t[16]=U;else U=t[16];let W;if(t[17]!==U||t[18]!==O)W=ZW.createElement(Box,{marginTop:O},U),t[17]=U,t[18]=O,t[19]=W;else W=t[19];f=W;break e}let[R,k,x]=v,H=k===void 0?"":k,I=VEp.exec(x??"")?.[1],P=mxe(H);if(T===`${nZ}${P} while you were working:`||T===`${nZ}${P}:`)T="";let L=y.slice(R.length),D=L.trimEnd();if(D.endsWith(FNa))L=D.slice(0,-FNa.length);let N=`${T?`${T} `:""}${L}`.trim().replace(/\s+/g," ");if(A=truncateToWidth(N,YEp),a=Box,m=n?1:0,i=Text,t[20]===Symbol.for("react.memo_cache_sentinel"))d=ZW.createElement(Text,{color:"suggestion"},Vts),t[20]=d;else d=t[20];p=" ",s=Text,l=!0,c=zEp(mxe(H)),u=I?` \xB7 ${mxe(I)}`:""}t[0]=n,t[1]=o,t[2]=s,t[3]=i,t[4]=a,t[5]=l,t[6]=c,t[7]=u,t[8]=d,t[9]=p,t[10]=m,t[11]=f,t[12]=A}else s=t[2],i=t[3],a=t[4],l=t[5],c=t[6],u=t[7],d=t[8],p=t[9],m=t[10],f=t[11],A=t[12];if(f!==Symbol.for("react.early_return_sentinel"))return f;let h;if(t[21]!==s||t[22]!==l||t[23]!==c||t[24]!==u)h=ZW.createElement(s,{dimColor:l},c,u,":"),t[21]=s,t[22]=l,t[23]=c,t[24]=u,t[25]=h;else h=t[25];let g;if(t[26]!==i||t[27]!==d||t[28]!==p||t[29]!==h||t[30]!==A)g=ZW.createElement(i,null,d,p,h," ",A),t[26]=i,t[27]=d,t[28]=p,t[29]=h,t[30]=A,t[31]=g;else g=t[31];let _;if(t[32]!==a||t[33]!==g||t[34]!==m)_=ZW.createElement(a,{marginTop:m},g),t[32]=a,t[33]=g,t[34]=m,t[35]=_;else _=t[35];return _}
var UNa,ZW,GEp,QUn,FNa,VEp,KEp,YEp=60;
var qNa=b(()=>{sl();initKp();ze();ps();QH();UNa=M(rt(),1),ZW=M(Te(),1),GEp=new RegExp(`^<${DMe}\\s+source="([^"]*)"([^>]*)>\\n?`),QUn=`</${DMe}>`,FNa=`
${QUn}`,VEp=/\buser="([^"]+)"/,KEp=[`

${bFe(!1)}${FHt}`,`

${bFe(!1)}`,`

${bFe(!0)}${FHt}`,`

${bFe(!0)}`]});
export {$Na,zEp,UserChannelMessage,UNa,ZW,GEp,QUn,FNa,VEp,KEp,YEp,qNa};
