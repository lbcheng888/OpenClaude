// @ts-nocheck
import {qw,sP} from "./m4535.ts";
import {Tgt,PGt} from "./m4927.ts";
import {Text} from "./m2433.ts";
import {bs,ff} from "./m2561.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Zxl(e){let t=Qxl.c(32),{onHeaderFocusChange:n,onStateChange:r}=e,{headerFocused:o,focusHeader:s}=qw(),i,a;if(t[0]!==o||t[1]!==n)i=()=>{n(o)},a=[o,n],t[0]=o,t[1]=n,t[2]=i,t[3]=a;else i=t[2],a=t[3];JPe.useEffect(i,a);let{getDenials:l}=Tgt(),[c]=JPe.useState(l),[u,d]=JPe.useState(ghm),[p,m]=JPe.useState(hhm),[f,h]=JPe.useState(0),g,_;if(t[4]!==u||t[5]!==c||t[6]!==r||t[7]!==p)g=()=>{r({approved:u,retry:p,denials:c})},_=[u,p,c,r],t[4]=u,t[5]=c,t[6]=r,t[7]=p,t[8]=g,t[9]=_;else g=t[8],_=t[9];JPe.useEffect(g,_);let T;if(t[10]===Symbol.for("react.memo_cache_sentinel"))T=(P)=>{let M=Number(P);d((B)=>{let N=new Set(B);if(N.has(M))N.delete(M);else N.add(M);return N})},t[10]=T;else T=t[10];let y=T,S;if(t[11]===Symbol.for("react.memo_cache_sentinel"))S=(P)=>{h(Number(P))},t[11]=S;else S=t[11];let E=S,R;if(t[12]!==f||t[13]!==o)R=function(M){if(o)return;if(M.ctrl||M.meta||M.shift)return;if(M.key!=="r")return;M.preventDefault(),m((B)=>{let N=new Set(B);if(N.has(f))N.delete(f);else N.add(f);return N}),d((B)=>{if(B.has(f))return B;let N=new Set(B);return N.add(f),N})},t[12]=f,t[13]=o,t[14]=R;else R=t[14];let w=R;if(c.length===0){let P;if(t[15]===Symbol.for("react.memo_cache_sentinel"))P=Pue.jsx(Text,{dimColor:!0,children:"No recent denials. Commands denied by the auto mode classifier will appear here."}),t[15]=P;else P=t[15];return P}let H;if(t[16]!==u||t[17]!==c||t[18]!==p){let P;if(t[20]!==u||t[21]!==p)P=(M,B)=>{let N=u.has(B),F=p.has(B)?" (retry)":"";return{label:Pue.jsxs(Text,{children:[Pue.jsx(bs,{status:N?"success":"error",withSpace:!0}),M.display,Pue.jsx(Text,{dimColor:!0,children:F})]}),value:String(B),...{}}},t[20]=u,t[21]=p,t[22]=P;else P=t[22];H=c.map(P),t[16]=u,t[17]=c,t[18]=p,t[19]=H}else H=t[19];let k=H,I;if(t[23]===Symbol.for("react.memo_cache_sentinel"))I=Pue.jsx(Text,{children:"Commands recently denied by the auto mode classifier."}),t[23]=I;else I=t[23];let D=Math.min(10,k.length),O;if(t[24]!==s||t[25]!==o||t[26]!==k||t[27]!==D)O=Pue.jsx(Box,{marginTop:1,children:Pue.jsx(hr,{options:k,onChange:y,onFocus:E,visibleOptionCount:D,isDisabled:o,onUpFromFirstItem:s})}),t[24]=s,t[25]=o,t[26]=k,t[27]=D,t[28]=O;else O=t[28];let L;if(t[29]!==w||t[30]!==O)L=Pue.jsxs(Box,{flexDirection:"column",onKeyDown:w,children:[I,O]}),t[29]=w,t[30]=O,t[31]=L;else L=t[31];return L}
function hhm(){return new Set}
function ghm(){return new Set}
var Qxl,JPe,Pue;
var eDl=b(()=>{PGt();je();Ol();ff();sP();Qxl=x(tt(),1),JPe=x(et(),1),Pue=x(oe(),1)});
export {Zxl,hhm,ghm,Qxl,JPe,Pue,eDl};
