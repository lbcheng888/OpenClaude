// @ts-nocheck
import {Df,TI} from "./m2577.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function gqe(e){let t=wMa.c(38),{steps:n,initialData:r,onComplete:o,onCancel:s,children:i,title:a,showStepCounter:l}=e,c;if(t[0]!==r)c=r===void 0?{}:r,t[0]=r,t[1]=c;else c=t[1];let u=c,d=l===void 0?!0:l,[p,m]=K_e.useState(0),[f,h]=K_e.useState(u),[g,_]=K_e.useState(!1),T;if(t[2]===Symbol.for("react.memo_cache_sentinel"))T=[],t[2]=T;else T=t[2];let[y,S]=K_e.useState(T);Df();let E,R;if(t[3]!==g||t[4]!==o||t[5]!==f)E=()=>{if(g)S([]),o(f)},R=[g,f,o],t[3]=g,t[4]=o,t[5]=f,t[6]=E,t[7]=R;else E=t[6],R=t[7];K_e.useEffect(E,R);let w;if(t[8]!==p||t[9]!==y||t[10]!==n.length)w=()=>{if(p<n.length-1){if(y.length>0)S((J)=>[...J,p]);m(FAp)}else _(!0)},t[8]=p,t[9]=y,t[10]=n.length,t[11]=w;else w=t[11];let H=w,k;if(t[12]!==p||t[13]!==y||t[14]!==s)k=()=>{if(y.length>0){let J=y.at(-1);if(J!==void 0)S(NAp),m(J)}else if(p>0)m(MAp);else if(s)s()},t[12]=p,t[13]=y,t[14]=s,t[15]=k;else k=t[15];let I=k,D;if(t[16]!==p||t[17]!==n.length)D=(J)=>{if(J>=0&&J<n.length)S((K)=>[...K,p]),m(J)},t[16]=p,t[17]=n.length,t[18]=D;else D=t[18];let O=D,L;if(t[19]!==s)L=()=>{if(S([]),s)s()},t[19]=s,t[20]=L;else L=t[20];let P=L,M;if(t[21]===Symbol.for("react.memo_cache_sentinel"))M=(J)=>{h((K)=>({...K,...J}))},t[21]=M;else M=t[21];let B=M,N;if(t[22]!==P||t[23]!==p||t[24]!==I||t[25]!==H||t[26]!==O||t[27]!==d||t[28]!==n.length||t[29]!==a||t[30]!==f)N={currentStepIndex:p,totalSteps:n.length,wizardData:f,setWizardData:h,updateWizardData:B,goNext:H,goBack:I,goToStep:O,cancel:P,title:a,showStepCounter:d},t[22]=P,t[23]=p,t[24]=I,t[25]=H,t[26]=O,t[27]=d,t[28]=n.length,t[29]=a,t[30]=f,t[31]=N;else N=t[31];let F=N,V=n[p];if(!V||g)return null;let G;if(t[32]!==V||t[33]!==i)G=i||Mlo.jsx(V,{}),t[32]=V,t[33]=i,t[34]=G;else G=t[34];let z;if(t[35]!==F||t[36]!==G)z=Mlo.jsx(Nlo.Provider,{value:F,children:G}),t[35]=F,t[36]=G,t[37]=z;else z=t[37];return z}
function MAp(e){return e-1}
function NAp(e){return e.slice(0,-1)}
function FAp(e){return e+1}
var wMa,K_e,Mlo,Nlo;
var Flo=b(()=>{TI();wMa=x(tt(),1),K_e=x(et(),1),Mlo=x(oe(),1),Nlo=K_e.createContext(null)});
export {gqe,MAp,NAp,FAp,wMa,K_e,Mlo,Nlo,Flo};
