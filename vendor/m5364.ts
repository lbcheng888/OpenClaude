// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {Ab,Rte} from "./m3925.ts";
import {Text} from "./m2423.ts";
import {tn,Hc} from "./m235.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $jl(e,t,n){if(e===0||n)return;if(t===null)return"History";return`History ${Math.max(1,t-e+1)}/${t}`}
function hGt(e){let t=qjl.c(27),{banner:n,columns:r,fastModeTag:o,borderOnly:s}=e;if(useIsScreenReaderEnabled()){if(s||!n.text&&!o)return null;let h;if(t[0]!==n.bgColor||t[1]!==n.text)h=n.text&&_D.createElement(Ab,{color:n.bgColor,padded:!0},n.text),t[0]=n.bgColor,t[1]=n.text,t[2]=h;else h=t[2];let g;if(t[3]!==o)g=o&&_D.createElement(Text,{color:"fastMode"}," ",o),t[3]=o,t[4]=g;else g=t[4];let _;if(t[5]!==n.bgColor||t[6]!==h||t[7]!==g)_=_D.createElement(Text,{color:n.bgColor},h,g),t[5]=n.bgColor,t[6]=h,t[7]=g,t[8]=_;else _=t[8];return _}let a=o?tn(o)+2:0,l=n.text?tn(n.text)+2:0,c=a||l?"\u2500\u2500":"",u=Math.max(0,r-a-l-c.length),d=n.gradient,p;if(t[9]!==n.bgColor||t[10]!==d)p=d?.at(-1)??n.bgColor,t[9]=n.bgColor,t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==u||t[13]!==d)m=d?_D.createElement(B0m,{count:u,colors:d}):"\u2500".repeat(u),t[12]=u,t[13]=d,t[14]=m;else m=t[14];let f;if(t[15]!==n.bgColor||t[16]!==n.text||t[17]!==s||t[18]!==l||t[19]!==o||t[20]!==a||t[21]!==c)f=s?"\u2500".repeat(a+l+c.length):_D.createElement(_D.Fragment,null,o?` ${o} `:null,n.text?_D.createElement(Ab,{color:n.bgColor,padded:!0},n.text):null,c),t[15]=n.bgColor,t[16]=n.text,t[17]=s,t[18]=l,t[19]=o,t[20]=a,t[21]=c,t[22]=f;else f=t[22];let A;if(t[23]!==p||t[24]!==m||t[25]!==f)A=_D.createElement(Text,{color:p},m,f),t[23]=p,t[24]=m,t[25]=f,t[26]=A;else A=t[26];return A}
function B0m({count:e,colors:t}){if(e<=0||t.length===0)return null;let n=Math.min(t.length,e),r=Math.floor(e/n),o=e-r*n;return t.slice(0,n).map((s,i)=>{let a=r+(o-- >0?1:0);return _D.createElement(Text,{key:i,color:s},"\u2500".repeat(a))})}
var qjl,_D;
var HOo=b(()=>{Hc();ze();Rte();qjl=M(rt(),1),_D=M(Te(),1)});
export {$jl,hGt,B0m,qjl,_D,HOo};
