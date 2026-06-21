// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {Z1t,ost} from "../src/telemetry/3312_stdout.ts";
import {Oao,Lao} from "./m4004.ts";
import {Text} from "./m2423.ts";
import {Link} from "./m2427.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function fqe(e){let t=oBa.c(35),{number:n,url:r,reviewState:o,bold:s,color:i,dimColor:a,underline:l,hidePrefix:c,kind:u}=e,d=l===void 0?!0:l,p=u==="cr"&&!1,m=mt(pCp),f;if(t[0]!==p||t[1]!==m||t[2]!==r)f=p?r:Z1t(r,m),t[0]=p,t[1]=m,t[2]=r,t[3]=f;else f=t[3];let A=f,h,g;if(t[4]!==p||t[5]!==r||t[6]!==A)h=()=>{Oao(A,r,p)},g=[A,r,p],t[4]=p,t[5]=r,t[6]=A,t[7]=h,t[8]=g;else h=t[7],g=t[8];bce.useEffect(h,g);let _;if(t[9]!==i||t[10]!==o)_=i??mCp(o),t[9]=i,t[10]=o,t[11]=_;else _=t[11];let y=_,T=a||!y&&!s,S;if(t[12]!==s||t[13]!==T||t[14]!==n||t[15]!==y)S=bce.default.createElement(Text,{color:y,dimColor:T,bold:s},"#",n),t[12]=s,t[13]=T,t[14]=n,t[15]=y,t[16]=S;else S=t[16];let v=S,R;if(t[17]!==s||t[18]!==a||t[19]!==c||t[20]!==p)R=!c&&bce.default.createElement(bce.default.Fragment,null,bce.default.createElement(Text,{dimColor:a||!s},"PR")," "),t[17]=s,t[18]=a,t[19]=c,t[20]=p,t[21]=R;else R=t[21];let k;if(t[22]!==s||t[23]!==T||t[24]!==n||t[25]!==y||t[26]!==d)k=bce.default.createElement(Text,{color:y,dimColor:T,underline:d,bold:s},"#",n),t[22]=s,t[23]=T,t[24]=n,t[25]=y,t[26]=d,t[27]=k;else k=t[27];let x;if(t[28]!==v||t[29]!==k||t[30]!==A)x=bce.default.createElement(Link,{url:A,fallback:v,assumeSupport:!1},k),t[28]=v,t[29]=k,t[30]=A,t[31]=x;else x=t[31];let H;if(t[32]!==R||t[33]!==x)H=bce.default.createElement(Text,null,R,x),t[32]=R,t[33]=x,t[34]=H;else H=t[34];return H}
function pCp(e){return e.settings?.prUrlTemplate}
function mCp(e){switch(e){case"approved":return"success";case"changes_requested":return"error";case"pending":return"warning";case"merged":return"merged";default:return}}
var oBa,bce;
var t2n=b(()=>{Lao();ze();configProtoStore();ost();oBa=M(rt(),1),bce=M(Te(),1)});
export {fqe,pCp,mCp,oBa,bce,t2n};
