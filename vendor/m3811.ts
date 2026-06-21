// @ts-nocheck
import {xA,jH} from "./m2566.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function n4e(e){let t=iHa.c(38),{steps:n,initialData:r,onComplete:o,onCancel:s,children:i,title:a,showStepCounter:l}=e,c;if(t[0]!==r)c=r===void 0?{}:r,t[0]=r,t[1]=c;else c=t[1];let u=c,d=l===void 0?!0:l,[p,m]=IY.useState(0),[f,A]=IY.useState(u),[h,g]=IY.useState(!1),_;if(t[2]===Symbol.for("react.memo_cache_sentinel"))_=[],t[2]=_;else _=t[2];let[y,T]=IY.useState(_);xA();let S,v;if(t[3]!==h||t[4]!==o||t[5]!==f)S=()=>{if(h)T([]),o(f)},v=[h,f,o],t[3]=h,t[4]=o,t[5]=f,t[6]=S,t[7]=v;else S=t[6],v=t[7];IY.useEffect(S,v);let R;if(t[8]!==p||t[9]!==y||t[10]!==n.length)R=()=>{if(p<n.length-1){if(y.length>0)T((Q)=>[...Q,p]);m(Ymp)}else g(!0)},t[8]=p,t[9]=y,t[10]=n.length,t[11]=R;else R=t[11];let k=R,x;if(t[12]!==p||t[13]!==y||t[14]!==s)x=()=>{if(y.length>0){let Q=y[y.length-1];if(Q!==void 0)T(zmp),m(Q)}else if(p>0)m(Kmp);else if(s)s()},t[12]=p,t[13]=y,t[14]=s,t[15]=x;else x=t[15];let H=x,I;if(t[16]!==p||t[17]!==n.length)I=(Q)=>{if(Q>=0&&Q<n.length)T((K)=>[...K,p]),m(Q)},t[16]=p,t[17]=n.length,t[18]=I;else I=t[18];let P=I,L;if(t[19]!==s)L=()=>{if(T([]),s)s()},t[19]=s,t[20]=L;else L=t[20];let D=L,N;if(t[21]===Symbol.for("react.memo_cache_sentinel"))N=(Q)=>{A((K)=>({...K,...Q}))},t[21]=N;else N=t[21];let O=N,$;if(t[22]!==D||t[23]!==p||t[24]!==H||t[25]!==k||t[26]!==P||t[27]!==d||t[28]!==n.length||t[29]!==a||t[30]!==f)$={currentStepIndex:p,totalSteps:n.length,wizardData:f,setWizardData:A,updateWizardData:O,goNext:k,goBack:H,goToStep:P,cancel:D,title:a,showStepCounter:d},t[22]=D,t[23]=p,t[24]=H,t[25]=k,t[26]=P,t[27]=d,t[28]=n.length,t[29]=a,t[30]=f,t[31]=$;else $=t[31];let U=$,W=n[p];if(!W||h)return null;let G;if(t[32]!==W||t[33]!==i)G=i||IY.default.createElement(W,null),t[32]=W,t[33]=i,t[34]=G;else G=t[34];let V;if(t[35]!==U||t[36]!==G)V=IY.default.createElement(Qro.Provider,{value:U},G),t[35]=U,t[36]=G,t[37]=V;else V=t[37];return V}
function Kmp(e){return e-1}
function zmp(e){return e.slice(0,-1)}
function Ymp(e){return e+1}
var iHa,IY,Qro;
var Zro=b(()=>{jH();iHa=M(rt(),1),IY=M(Te(),1),Qro=IY.createContext(null)});
export {n4e,Kmp,zmp,Ymp,iHa,IY,Qro,Zro};
