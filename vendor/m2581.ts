// @ts-nocheck
import {yoe,Pa} from "./m720.ts";
import {_r,ui} from "./m2463.ts";
import {Text} from "./m2433.ts";
import {Ansi} from "./m2441.ts";
import {sn,mc} from "./m237.ts";
import {Decorative} from "./m2445.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function yg(e){let t=C1i.c(27),{width:n,color:r,char:o,padding:s,title:i,titleAlign:a}=e,l=o===void 0?yoe:o,c=s===void 0?0:s,u=a===void 0?"center":a,{columns:d}=_r(),p=Math.max(0,(n??d)-c),m;if(t[0]!==r||t[1]!==i)m=i?Lie.jsx(Text,{color:r,dimColor:!r,children:Lie.jsx(Ansi,{children:i})}):null,t[0]=r,t[1]=i,t[2]=m;else m=t[2];let f=m;if(i){let T=sn(i)+2,y=Math.max(0,p-T),S=u==="start"?Math.min(4,y):Math.floor(y/2),E=y-S,R=!r,w;if(t[3]!==l||t[4]!==S)w=l.repeat(S),t[3]=l,t[4]=S,t[5]=w;else w=t[5];let H;if(t[6]!==i)H=Lie.jsx(Text,{dimColor:!0,children:Lie.jsx(Ansi,{children:i})}),t[6]=i,t[7]=H;else H=t[7];let k;if(t[8]!==l||t[9]!==E)k=l.repeat(E),t[8]=l,t[9]=E,t[10]=k;else k=t[10];let I;if(t[11]!==r||t[12]!==R||t[13]!==w||t[14]!==H||t[15]!==k)I=Lie.jsxs(Text,{color:r,dimColor:R,children:[w," ",H," ",k]}),t[11]=r,t[12]=R,t[13]=w,t[14]=H,t[15]=k,t[16]=I;else I=t[16];let D;if(t[17]!==f||t[18]!==I)D=Lie.jsx(Decorative,{fallback:f,children:I}),t[17]=f,t[18]=I,t[19]=D;else D=t[19];return D}let h=!r,g;if(t[20]!==l||t[21]!==p)g=l.repeat(p),t[20]=l,t[21]=p,t[22]=g;else g=t[22];let _;if(t[23]!==r||t[24]!==h||t[25]!==g)_=Lie.jsx(Decorative,{children:Lie.jsx(Text,{color:r,dimColor:h,children:g})}),t[23]=r,t[24]=h,t[25]=g,t[26]=_;else _=t[26];return _}
var C1i,Lie;
var _4=b(()=>{Pa();ui();mc();je();C1i=x(tt(),1),Lie=x(oe(),1)});
export {yg,C1i,Lie,_4};
