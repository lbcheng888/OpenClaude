// @ts-nocheck
import {iu} from "./m3830.ts";
import {aNa,lNa} from "./m3867.ts";
import {_c,PE} from "./m3831.ts";
import {Hc,OE} from "./m3855.ts";
import {Or,ss} from "./m2553.ts";
import {w0e,x2n} from "./m3862.ts";
import {Sn,lr} from "./m233.ts";
import {Text} from "./m2433.ts";
import {hr,Ol} from "./m2573.ts";
import {Box} from "./m2432.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {ga,rh} from "./m2550.ts";
import {Ba,I_} from "./m2584.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function uNa(){let e=lco.c(10),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=iu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={phase:"loading"},e[0]=s;else s=e[0];let[i,a]=H0e.useState(s),l,c;if(e[1]===Symbol.for("react.memo_cache_sentinel"))l=()=>{let d=!1;return aNa().then((p)=>{if(!d)a({phase:"ready",projects:p})}),()=>{d=!0}},c=[],e[1]=l,e[2]=c;else l=e[1],c=e[2];if(H0e.useEffect(l,c),i.phase==="loading"){let d;if(e[3]===Symbol.for("react.memo_cache_sentinel"))d=NI.jsx(_c,{subtitle:"GCP project",children:NI.jsx(Hc,{message:"Reading ~/.config/gcloud\u2026"})}),e[3]=d;else d=e[3];return d}let u;if(e[4]!==t||e[5]!==n||e[6]!==i.projects||e[7]!==r||e[8]!==o)u=NI.jsx(hvp,{projects:i.projects,wizardData:o,goBack:t,goToStep:n,updateWizardData:r}),e[4]=t,e[5]=n,e[6]=i.projects,e[7]=r,e[8]=o,e[9]=u;else u=e[9];return u}
function hvp(e){let t=lco.c(45),{projects:n,wizardData:r,goBack:o,goToStep:s,updateWizardData:i}=e,a=n.length>fvp,l;if(t[0]!==n||t[1]!==r.projectId)l=r.projectId&&!n.includes(r.projectId),t[0]=n,t[1]=r.projectId,t[2]=l;else l=t[2];let c=Boolean(l),[u,d]=H0e.useState(n.length===0||a||c),[p,m]=H0e.useState(r.projectId??""),[f,h]=H0e.useState(p.length),[g,_]=H0e.useState(null),T;if(t[3]!==u)T={context:"Settings",isActive:u},t[3]=u,t[4]=T;else T=t[4];Or("confirm:no",o,T);let y;if(t[5]!==s||t[6]!==i)y=(P)=>{i({projectId:P}),s(w0e.REGION)},t[5]=s,t[6]=i,t[7]=y;else y=t[7];let S=y;if(!u){let P=n.length,M;if(t[8]!==n.length)M=Sn(n.length,"project"),t[8]=n.length,t[9]=M;else M=t[9];let B;if(t[10]!==n.length||t[11]!==M)B=NI.jsxs(Text,{dimColor:!0,children:["Found ",P," ",M," in your gcloud configurations."]}),t[10]=n.length,t[11]=M,t[12]=B;else B=t[12];let N;if(t[13]!==n){let J;if(t[15]===Symbol.for("react.memo_cache_sentinel"))J={label:"Type a different project\u2026",value:cNa},t[15]=J;else J=t[15];N=[...n.map(gvp),J],t[13]=n,t[14]=N}else N=t[14];let F=r.projectId&&n.includes(r.projectId)?r.projectId:void 0,V;if(t[16]!==S)V=(J)=>{if(J===cNa)d(!0);else S(J)},t[16]=S,t[17]=V;else V=t[17];let G;if(t[18]!==o||t[19]!==N||t[20]!==F||t[21]!==V)G=NI.jsx(hr,{options:N,defaultValue:F,onChange:V,onCancel:o}),t[18]=o,t[19]=N,t[20]=F,t[21]=V,t[22]=G;else G=t[22];let z;if(t[23]!==G||t[24]!==B)z=NI.jsx(_c,{subtitle:"GCP project",children:NI.jsxs(Box,{flexDirection:"column",gap:1,children:[B,G]})}),t[23]=G,t[24]=B,t[25]=z;else z=t[25];return z}let E;if(t[26]!==S||t[27]!==p)E=()=>{let P=p.trim();if(!P){_("Project ID is required");return}_(null),S(P)},t[26]=S,t[27]=p,t[28]=E;else E=t[28];let R=E,w;if(t[29]===Symbol.for("react.memo_cache_sentinel"))w=NI.jsxs(bn,{children:[NI.jsx(at,{chord:"enter",action:"continue"}),NI.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})]}),t[29]=w;else w=t[29];let H;if(t[30]===Symbol.for("react.memo_cache_sentinel"))H=NI.jsx(Text,{children:"The project where Vertex AI is enabled."}),t[30]=H;else H=t[30];let k;if(t[31]!==n.length||t[32]!==a)k=a&&NI.jsxs(Text,{dimColor:!0,children:["Found ",n.length," projects \u2014 too many to list."]}),t[31]=n.length,t[32]=a,t[33]=k;else k=t[33];let I;if(t[34]===Symbol.for("react.memo_cache_sentinel"))I=NI.jsx(Text,{dimColor:!0,children:"Find it with `gcloud config get-value project` or in the GCP console header."}),t[34]=I;else I=t[34];let D;if(t[35]!==f||t[36]!==R||t[37]!==p)D=NI.jsx(Box,{marginTop:1,children:NI.jsx(ga,{value:p,onChange:m,onSubmit:R,placeholder:"my-gcp-project",columns:60,cursorOffset:f,onChangeCursorOffset:h,focus:!0,showCursor:!0})}),t[35]=f,t[36]=R,t[37]=p,t[38]=D;else D=t[38];let O;if(t[39]!==g)O=g&&NI.jsx(Box,{marginTop:1,children:NI.jsx(Ba,{error:g})}),t[39]=g,t[40]=O;else O=t[40];let L;if(t[41]!==O||t[42]!==k||t[43]!==D)L=NI.jsx(_c,{subtitle:"GCP project ID",footerText:w,children:NI.jsxs(Box,{flexDirection:"column",children:[H,k,I,D,O]})}),t[41]=O,t[42]=k,t[43]=D,t[44]=L;else L=t[44];return L}
function gvp(e){return{label:e,value:e}}
var lco,H0e,NI,cNa="__manual__",fvp=12;
var dNa=b(()=>{je();ss();lr();uc();Ol();Is();I_();Wo();OE();rh();Fy();PE();lNa();x2n();lco=x(tt(),1),H0e=x(et(),1),NI=x(oe(),1)});
export {uNa,hvp,gvp,lco,H0e,NI,cNa,fvp,dNa};
