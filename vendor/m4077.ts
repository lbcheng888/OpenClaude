// @ts-nocheck
import {vAn,a4} from "./m2436.ts";
import {H6e,K9n} from "./m4003.ts";
import {Text} from "./m2433.ts";
import {Link} from "./m2437.ts";
import {$$e,nj} from "../src/agent/2746_partialTextChars.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function q3n(e){let t=Jqa.c(27),{children:n,color:r,bold:o}=e,s=vAn(),i,a,l,c,u,d;if(t[0]!==o||t[1]!==n||t[2]!==r||t[3]!==s){d=Symbol.for("react.early_return_sentinel");e:{if(a=n.indexOf(Yqa),!s||a===-1){let h;if(t[10]!==o||t[11]!==n||t[12]!==r)h=Kdt.jsx(H6e,{color:r,bold:o,children:n}),t[10]=o,t[11]=n,t[12]=r,t[13]=h;else h=t[13];d=h;break e}i=Text,l=r,c=o,u=n.slice(0,a)}t[0]=o,t[1]=n,t[2]=r,t[3]=s,t[4]=i,t[5]=a,t[6]=l,t[7]=c,t[8]=u,t[9]=d}else i=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9];if(d!==Symbol.for("react.early_return_sentinel"))return d;let p;if(t[14]!==o||t[15]!==r)p=Kdt.jsx(Link,{url:$$e,children:Kdt.jsx(Text,{color:r,bold:o,underline:!0,children:"learn more"})}),t[14]=o,t[15]=r,t[16]=p;else p=t[16];let m;if(t[17]!==n||t[18]!==a)m=n.slice(a+Yqa.length),t[17]=n,t[18]=a,t[19]=m;else m=t[19];let f;if(t[20]!==i||t[21]!==l||t[22]!==c||t[23]!==u||t[24]!==p||t[25]!==m)f=Kdt.jsxs(i,{color:l,bold:c,children:[u,p,m]}),t[20]=i,t[21]=l,t[22]=c,t[23]=u,t[24]=p,t[25]=m,t[26]=f;else f=t[26];return f}
var Jqa,Kdt,Yqa;
var kmo=b(()=>{a4();je();nj();K9n();Jqa=x(tt(),1),Kdt=x(oe(),1),Yqa=`learn more: ${$$e}`});
export {q3n,Jqa,Kdt,Yqa,kmo};
