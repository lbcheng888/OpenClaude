// @ts-nocheck
import {FSn,U4} from "./m2426.ts";
import {J2t,Iio} from "./m3941.ts";
import {Text} from "./m2423.ts";
import {Link} from "./m2427.ts";
import {L2e,xz} from "../src/agent/2734_partialTextChars.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function r2n(e){let t=CBa.c(27),{children:n,color:r,bold:o}=e,s=FSn(),i,a,l,c,u,d;if(t[0]!==o||t[1]!==n||t[2]!==r||t[3]!==s){d=Symbol.for("react.early_return_sentinel");e:{if(a=n.indexOf(EBa),!s||a===-1){let A;if(t[10]!==o||t[11]!==n||t[12]!==r)A=p$t.default.createElement(J2t,{color:r,bold:o},n),t[10]=o,t[11]=n,t[12]=r,t[13]=A;else A=t[13];d=A;break e}i=Text,l=r,c=o,u=n.slice(0,a)}t[0]=o,t[1]=n,t[2]=r,t[3]=s,t[4]=i,t[5]=a,t[6]=l,t[7]=c,t[8]=u,t[9]=d}else i=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9];if(d!==Symbol.for("react.early_return_sentinel"))return d;let p;if(t[14]!==o||t[15]!==r)p=p$t.default.createElement(Link,{url:L2e},p$t.default.createElement(Text,{color:r,bold:o,underline:!0},"learn more")),t[14]=o,t[15]=r,t[16]=p;else p=t[16];let m;if(t[17]!==n||t[18]!==a)m=n.slice(a+EBa.length),t[17]=n,t[18]=a,t[19]=m;else m=t[19];let f;if(t[20]!==i||t[21]!==l||t[22]!==c||t[23]!==u||t[24]!==p||t[25]!==m)f=p$t.default.createElement(i,{color:l,bold:c},u,p,m),t[20]=i,t[21]=l,t[22]=c,t[23]=u,t[24]=p,t[25]=m,t[26]=f;else f=t[26];return f}
var CBa,p$t,EBa;
var jao=b(()=>{U4();ze();xz();Iio();CBa=M(rt(),1),p$t=M(Te(),1),EBa=`learn more: ${L2e}`});
export {r2n,CBa,p$t,EBa,jao};
