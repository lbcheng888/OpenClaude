// @ts-nocheck
import {Kft,Lj,lq} from "./m5221.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {eC,dn} from "../src/config/0137_namespace.ts";
import {hr,Ol} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function kml(e){return Object.entries(e).map(([t,n])=>({label:n?.name??tXp,value:t,description:n?.description??nXp}))}
function Iml(e){let t=Hml.c(26),{initialStyle:n,onComplete:r,onCancel:o,isStandaloneCommand:s}=e,i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=[],t[0]=i;else i=t[0];let[a,l]=B8t.useState(i),[c,u]=B8t.useState(!0),d,p;if(t[1]===Symbol.for("react.memo_cache_sentinel"))d=()=>{Kft(isTmuxControlMode()).then((H)=>{let k=kml(H);l(k),u(!1)}).catch(()=>{let H=kml(Lj);l(H),u(!1)})},p=[],t[1]=d,t[2]=p;else d=t[1],p=t[2];B8t.useEffect(d,p);let m;if(t[3]!==r)m=(H)=>{r(H)},t[3]=r,t[4]=m;else m=t[4];let f=m,h;if(t[5]!==n||t[6]!==c||t[7]!==a)h=!c&&buildMcpToolName("outputStyles")&&!a.some((H)=>H.value===n),t[5]=n,t[6]=c,t[7]=a,t[8]=h;else h=t[8];let g=h,_=!s,T=!s,y;if(t[9]===Symbol.for("react.memo_cache_sentinel"))y=_Te.jsx(Box,{marginTop:1,children:_Te.jsx(Text,{dimColor:!0,children:"This changes how Claude Code communicates with you"})}),t[9]=y;else y=t[9];let S;if(t[10]!==n||t[11]!==g)S=g&&_Te.jsx(Text,{dimColor:!0,children:`Your saved output style "${n}" is a custom style disabled in safe mode \u2014 ${eC()} to use it; selecting a style here replaces it`}),t[10]=n,t[11]=g,t[12]=S;else S=t[12];let E;if(t[13]!==f||t[14]!==n||t[15]!==c||t[16]!==a)E=c?_Te.jsx(Text,{dimColor:!0,children:"Loading output styles\u2026"}):_Te.jsx(hr,{options:a,onChange:f,visibleOptionCount:10,defaultValue:n}),t[13]=f,t[14]=n,t[15]=c,t[16]=a,t[17]=E;else E=t[17];let R;if(t[18]!==E||t[19]!==S)R=_Te.jsxs(Box,{flexDirection:"column",gap:1,children:[y,S,E]}),t[18]=E,t[19]=S,t[20]=R;else R=t[20];let w;if(t[21]!==o||t[22]!==R||t[23]!==_||t[24]!==T)w=_Te.jsx(preInitQueue,{title:"Preferred output style",onCancel:o,hideInputGuide:_,hideBorder:T,children:R}),t[21]=o,t[22]=R,t[23]=_,t[24]=T,t[25]=w;else w=t[25];return w}
var Hml,B8t,_Te,tXp="Default",nXp="Claude completes coding tasks efficiently and provides concise responses";
var xml=b(()=>{lq();je();ky();Po();dn();Ol();di();Hml=x(tt(),1),B8t=x(et(),1),_Te=x(oe(),1)});
export {kml,Iml,Hml,B8t,_Te,tXp,nXp,xml};
