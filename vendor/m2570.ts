// @ts-nocheck
import {Toe,sl} from "./m715.ts";
import {mr,ki} from "./m2453.ts";
import {Text} from "./m2423.ts";
import {Ansi} from "./m2431.ts";
import {tn,Hc} from "./m235.ts";
import {Decorative} from "./m2435.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function dg(e){let t=zIi.c(27),{width:n,color:r,char:o,padding:s,title:i,titleAlign:a}=e,l=o===void 0?Toe:o,c=s===void 0?0:s,u=a===void 0?"center":a,{columns:d}=mr(),p=Math.max(0,(n??d)-c),m;if(t[0]!==r||t[1]!==i)m=i?yAe.default.createElement(Text,{color:r,dimColor:!r},yAe.default.createElement(Ansi,null,i)):null,t[0]=r,t[1]=i,t[2]=m;else m=t[2];let f=m;if(i){let _=tn(i)+2,y=Math.max(0,p-_),T=u==="start"?Math.min(4,y):Math.floor(y/2),S=y-T,v=!r,R;if(t[3]!==l||t[4]!==T)R=l.repeat(T),t[3]=l,t[4]=T,t[5]=R;else R=t[5];let k;if(t[6]!==i)k=yAe.default.createElement(Text,{dimColor:!0},yAe.default.createElement(Ansi,null,i)),t[6]=i,t[7]=k;else k=t[7];let x;if(t[8]!==l||t[9]!==S)x=l.repeat(S),t[8]=l,t[9]=S,t[10]=x;else x=t[10];let H;if(t[11]!==r||t[12]!==v||t[13]!==R||t[14]!==k||t[15]!==x)H=yAe.default.createElement(Text,{color:r,dimColor:v},R," ",k," ",x),t[11]=r,t[12]=v,t[13]=R,t[14]=k,t[15]=x,t[16]=H;else H=t[16];let I;if(t[17]!==f||t[18]!==H)I=yAe.default.createElement(Decorative,{fallback:f},H),t[17]=f,t[18]=H,t[19]=I;else I=t[19];return I}let A=!r,h;if(t[20]!==l||t[21]!==p)h=l.repeat(p),t[20]=l,t[21]=p,t[22]=h;else h=t[22];let g;if(t[23]!==r||t[24]!==A||t[25]!==h)g=yAe.default.createElement(Decorative,null,yAe.default.createElement(Text,{color:r,dimColor:A},h)),t[23]=r,t[24]=A,t[25]=h,t[26]=g;else g=t[26];return g}
var zIi,yAe;
var J4=b(()=>{sl();ki();Hc();ze();zIi=M(rt(),1),yAe=M(Te(),1)});
export {dg,zIi,yAe,J4};
