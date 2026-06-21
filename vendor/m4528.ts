// @ts-nocheck
import {Wpt,sY,Vq} from "./m5187.ts";
import {Pt,Go} from "./m632.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {KE,sn} from "../src/config/0047_namespace.ts";
import {pr,Yl} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bil(e){return Object.entries(e).map(([t,n])=>({label:n?.name??T5p,value:t,description:n?.description??S5p}))}
function Uil(e){let t=Fil.c(26),{initialStyle:n,onComplete:r,onCancel:o,isStandaloneCommand:s}=e,i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=[],t[0]=i;else i=t[0];let[a,l]=f6t.useState(i),[c,u]=f6t.useState(!0),d,p;if(t[1]===Symbol.for("react.memo_cache_sentinel"))d=()=>{Wpt(Pt()).then((k)=>{let x=Bil(k);l(x),u(!1)}).catch(()=>{let k=Bil(sY);l(k),u(!1)})},p=[],t[1]=d,t[2]=p;else d=t[1],p=t[2];f6t.useEffect(d,p);let m;if(t[3]!==r)m=(k)=>{r(k)},t[3]=r,t[4]=m;else m=t[4];let f=m,A;if(t[5]!==n||t[6]!==c||t[7]!==a)A=!c&&hc("outputStyles")&&!a.some((k)=>k.value===n),t[5]=n,t[6]=c,t[7]=a,t[8]=A;else A=t[8];let h=A,g=!s,_=!s,y;if(t[9]===Symbol.for("react.memo_cache_sentinel"))y=$9.createElement(Box,{marginTop:1},$9.createElement(Text,{dimColor:!0},"This changes how Claude Code communicates with you")),t[9]=y;else y=t[9];let T;if(t[10]!==n||t[11]!==h)T=h&&$9.createElement(Text,{dimColor:!0},`Your saved output style "${n}" is a custom style disabled in safe mode \u2014 ${KE()} to use it; selecting a style here replaces it`),t[10]=n,t[11]=h,t[12]=T;else T=t[12];let S;if(t[13]!==f||t[14]!==n||t[15]!==c||t[16]!==a)S=c?$9.createElement(Text,{dimColor:!0},"Loading output styles\u2026"):$9.createElement(pr,{options:a,onChange:f,visibleOptionCount:10,defaultValue:n}),t[13]=f,t[14]=n,t[15]=c,t[16]=a,t[17]=S;else S=t[17];let v;if(t[18]!==S||t[19]!==T)v=$9.createElement(Box,{flexDirection:"column",gap:1},y,T,S),t[18]=S,t[19]=T,t[20]=v;else v=t[20];let R;if(t[21]!==o||t[22]!==v||t[23]!==g||t[24]!==_)R=$9.createElement(Kn,{title:"Preferred output style",onCancel:o,hideInputGuide:g,hideBorder:_},v),t[21]=o,t[22]=v,t[23]=g,t[24]=_,t[25]=R;else R=t[25];return R}
var Fil,$9,f6t,T5p="Default",S5p="Claude completes coding tasks efficiently and provides concise responses";
var $il=b(()=>{Vq();ze();Iy();Go();sn();Yl();Li();Fil=M(rt(),1),$9=M(Te(),1),f6t=M(Te(),1)});
export {Bil,Uil,Fil,$9,f6t,T5p,S5p,$il};
