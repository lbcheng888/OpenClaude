// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {gS,vte} from "./m3991.ts";
import {Text} from "./m2433.ts";
import {sn,mc} from "./m237.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function AYl(e,t,n){if(e===0||n)return;if(t===null)return"History";return`History ${Math.max(1,t-e+1)}/${t}`}
function W7t(e){let t=RYl.c(27),{banner:n,columns:r,fastModeTag:o,borderOnly:s}=e;if(useIsScreenReaderEnabled()){if(s||!n.text&&!o)return null;let g;if(t[0]!==n.bgColor||t[1]!==n.text)g=n.text&&VJ.jsx(gS,{color:n.bgColor,padded:!0,children:n.text}),t[0]=n.bgColor,t[1]=n.text,t[2]=g;else g=t[2];let _;if(t[3]!==o)_=o&&VJ.jsxs(Text,{color:"fastMode",children:[" ",o]}),t[3]=o,t[4]=_;else _=t[4];let T;if(t[5]!==n.bgColor||t[6]!==g||t[7]!==_)T=VJ.jsxs(Text,{color:n.bgColor,children:[g,_]}),t[5]=n.bgColor,t[6]=g,t[7]=_,t[8]=T;else T=t[8];return T}let a=o?sn(o)+2:0,l=n.text?sn(n.text)+2:0,c=a||l?"\u2500\u2500":"",u=Math.max(0,r-a-l-c.length),d=n.gradient,p;if(t[9]!==n.bgColor||t[10]!==d)p=d?.at(-1)??n.bgColor,t[9]=n.bgColor,t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==u||t[13]!==d)m=d?VJ.jsx(KBm,{count:u,colors:d}):"\u2500".repeat(u),t[12]=u,t[13]=d,t[14]=m;else m=t[14];let f;if(t[15]!==n.bgColor||t[16]!==n.text||t[17]!==s||t[18]!==l||t[19]!==o||t[20]!==a||t[21]!==c)f=s?"\u2500".repeat(a+l+c.length):VJ.jsxs(VJ.Fragment,{children:[o?` ${o} `:null,n.text?VJ.jsx(gS,{color:n.bgColor,padded:!0,children:n.text}):null,c]}),t[15]=n.bgColor,t[16]=n.text,t[17]=s,t[18]=l,t[19]=o,t[20]=a,t[21]=c,t[22]=f;else f=t[22];let h;if(t[23]!==p||t[24]!==m||t[25]!==f)h=VJ.jsxs(Text,{color:p,children:[m,f]}),t[23]=p,t[24]=m,t[25]=f,t[26]=h;else h=t[26];return h}
function KBm({count:e,colors:t}){if(e<=0||t.length===0)return null;let n=Math.min(t.length,e),r=Math.floor(e/n),o=e-r*n;return t.slice(0,n).map((s,i)=>{let a=r+(o-- >0?1:0);return VJ.jsx(Text,{color:s,children:"\u2500".repeat(a)},i)})}
var RYl,VJ;
var YFo=b(()=>{mc();je();vte();RYl=x(tt(),1),VJ=x(oe(),1)});
export {AYl,W7t,KBm,RYl,VJ,YFo};
