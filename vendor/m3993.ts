// @ts-nocheck
import {Text} from "./m2433.ts";
import {gS,vte} from "./m3991.ts";
import {formatNumber,Xo} from "./m240.ts";
import {q9n,kte} from "./m3992.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function k9a(e){let t=w9a.c(32),{agentType:n,description:r,name:o,descriptionColor:s,taskDescription:i,toolUseCount:a,tokens:l,color:c,isLast:u,isResolved:d,isAsync:p,lastToolInfo:m,hideType:f}=e,h=p===void 0?!1:p,g=f===void 0?!1:f,_=h&&d,T;if(t[0]!==_||t[1]!==d||t[2]!==m||t[3]!==i)T=()=>{if(!d)return m||"Initializing\u2026";if(_)return i??"Running in the background";return"Done"},t[0]=_,t[1]=d,t[2]=m,t[3]=i,t[4]=T;else T=t[4];let y=T,S=u?"last":"branch",E;if(t[5]!==S)E=[S],t[5]=S,t[6]=E;else E=t[6];let R=!d,w;if(t[7]!==n||t[8]!==c||t[9]!==r||t[10]!==s||t[11]!==g||t[12]!==o)w=g?mH.jsxs(mH.Fragment,{children:[mH.jsx(Text,{bold:!0,children:o??r??n}),o&&r&&mH.jsxs(Text,{dimColor:!0,children:[": ",r]})]}):mH.jsxs(mH.Fragment,{children:[mH.jsx(gS,{color:c,bold:!0,children:n}),r&&mH.jsxs(mH.Fragment,{children:[" (",mH.jsx(gS,{color:s,children:r}),")"]})]}),t[7]=n,t[8]=c,t[9]=r,t[10]=s,t[11]=g,t[12]=o,t[13]=w;else w=t[13];let H;if(t[14]!==_||t[15]!==l||t[16]!==a)H=!_&&mH.jsxs(mH.Fragment,{children:[" \xB7 ",a," tool ",a===1?"use":"uses",l!==null&&mH.jsxs(mH.Fragment,{children:[" \xB7 ",formatNumber(l)," tokens"]})]}),t[14]=_,t[15]=l,t[16]=a,t[17]=H;else H=t[17];let k;if(t[18]!==R||t[19]!==w||t[20]!==H)k=mH.jsxs(Text,{dimColor:R,children:[w,H]}),t[18]=R,t[19]=w,t[20]=H,t[21]=k;else k=t[21];let I;if(t[22]!==E||t[23]!==k)I=mH.jsx(q9n,{connectors:E,children:k}),t[22]=E,t[23]=k,t[24]=I;else I=t[24];let D;if(t[25]!==y||t[26]!==_||t[27]!==u)D=!_&&mH.jsx(q9n,{connectors:[u?"space":"pipe"],children:mH.jsxs(Text,{dimColor:!0,children:["\u23BF  ",y()]})}),t[25]=y,t[26]=_,t[27]=u,t[28]=D;else D=t[28];let O;if(t[29]!==I||t[30]!==D)O=mH.jsxs(Box,{flexDirection:"column",paddingLeft:3,children:[I,D]}),t[29]=I,t[30]=D,t[31]=O;else O=t[31];return O}
var w9a,mH;
var H9a=b(()=>{je();Xo();vte();kte();w9a=x(tt(),1),mH=x(oe(),1)});
export {k9a,w9a,mH,H9a};
