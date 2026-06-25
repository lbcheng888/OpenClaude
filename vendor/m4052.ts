// @ts-nocheck
import {ZPn} from "../src/core/3298_result.ts";
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {S1,sHe} from "./m2816.ts";
import {at,Wo} from "./m2557.ts";
import {C3e,nOn} from "./m3299.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function EDp(e){if(!e.match(/<sandbox_violations>([\s\S]*?)<\/sandbox_violations>/))return{cleanedStderr:e};return{cleanedStderr:ZPn(e).trim()}}
function CDp(e){let t=e.match(D4a);if(!t)return{cleanedStderr:e,cwdResetWarning:null};let n=t[1]??null;return{cleanedStderr:e.replace(D4a,"").trim(),cwdResetWarning:n}}
function q6e(e){let t=P4a.c(34),{content:n,verbose:r,timeoutMs:o}=e,{stdout:s,stderr:i,isImage:a,returnCodeInterpretation:l,noOutputExpected:c,backgroundTaskId:u}=n,d=s===void 0?"":s,p=i===void 0?"":i,m,f,h,g,_,T,y;if(t[0]!==a||t[1]!==p||t[2]!==d||t[3]!==r){y=Symbol.for("react.early_return_sentinel");e:{let{cleanedStderr:H}=EDp(p);if({cleanedStderr:h,cwdResetWarning:f}=CDp(H),a){let k;if(t[11]===Symbol.for("react.memo_cache_sentinel"))k=K1.jsx(Yn,{height:1,children:K1.jsx(Text,{dimColor:!0,children:"[Image data detected and sent to Claude]"})}),t[11]=k;else k=t[11];y=k;break e}if(m=Box,g="column",t[12]!==d||t[13]!==r)_=d!==""?K1.jsx(S1,{content:d,verbose:r}):null,t[12]=d,t[13]=r,t[14]=_;else _=t[14];T=h.trim()!==""?K1.jsx(S1,{content:h,verbose:r,isError:!0}):null}t[0]=a,t[1]=p,t[2]=d,t[3]=r,t[4]=m,t[5]=f,t[6]=h,t[7]=g,t[8]=_,t[9]=T,t[10]=y}else m=t[4],f=t[5],h=t[6],g=t[7],_=t[8],T=t[9],y=t[10];if(y!==Symbol.for("react.early_return_sentinel"))return y;let S;if(t[15]!==f)S=f?K1.jsx(Yn,{children:K1.jsx(Text,{dimColor:!0,children:f})}):null,t[15]=f,t[16]=S;else S=t[16];let E;if(t[17]!==u||t[18]!==f||t[19]!==c||t[20]!==l||t[21]!==h||t[22]!==d)E=d===""&&h.trim()===""&&!f?K1.jsx(Yn,{height:1,children:K1.jsx(Text,{dimColor:!0,children:u?K1.jsxs(K1.Fragment,{children:["Running in the background"," ",K1.jsx(at,{chord:"down",action:"manage",parens:!0})]}):l||(c?"Done":"(No output)")})}):null,t[17]=u,t[18]=f,t[19]=c,t[20]=l,t[21]=h,t[22]=d,t[23]=E;else E=t[23];let R;if(t[24]!==o)R=o&&K1.jsx(Yn,{children:K1.jsx(C3e,{timeoutMs:o})}),t[24]=o,t[25]=R;else R=t[25];let w;if(t[26]!==m||t[27]!==R||t[28]!==g||t[29]!==_||t[30]!==T||t[31]!==S||t[32]!==E)w=K1.jsxs(m,{flexDirection:g,children:[_,T,S,E,R]}),t[26]=m,t[27]=R,t[28]=g,t[29]=_,t[30]=T,t[31]=S,t[32]=E,t[33]=w;else w=t[33];return w}
var P4a,K1,D4a;
var x3n=b(()=>{Wo();Pl();sHe();nOn();je();P4a=x(tt(),1),K1=x(oe(),1),D4a=/(?:^|\n)(Shell cwd was reset to .+)$/});
export {EDp,CDp,q6e,P4a,K1,D4a,x3n};
