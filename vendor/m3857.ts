// @ts-nocheck
import {iu} from "./m3830.ts";
import {L1a,M1a} from "./m3856.ts";
import {_c,PE} from "./m3831.ts";
import {Hc,OE} from "./m3855.ts";
import {Or,ss} from "./m2553.ts";
import {z_e,p2n} from "./m3835.ts";
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
function F1a(){let e=Zlo.c(10),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=iu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={phase:"loading"},e[0]=s;else s=e[0];let[i,a]=v0e.useState(s),l,c;if(e[1]===Symbol.for("react.memo_cache_sentinel"))l=()=>{let d=!1;return L1a().then((p)=>{if(!d)a({phase:"ready",profiles:p})}),()=>{d=!0}},c=[],e[1]=l,e[2]=c;else l=e[1],c=e[2];if(v0e.useEffect(l,c),i.phase==="loading"){let d;if(e[3]===Symbol.for("react.memo_cache_sentinel"))d=MI.jsx(_c,{subtitle:"AWS profile",children:MI.jsx(Hc,{message:"Reading ~/.aws/config\u2026"})}),e[3]=d;else d=e[3];return d}let u;if(e[4]!==t||e[5]!==n||e[6]!==i.profiles||e[7]!==r||e[8]!==o)u=MI.jsx(QRp,{profiles:i.profiles,wizardData:o,goBack:t,goToStep:n,updateWizardData:r}),e[4]=t,e[5]=n,e[6]=i.profiles,e[7]=r,e[8]=o,e[9]=u;else u=e[9];return u}
function QRp(e){let t=Zlo.c(49),{profiles:n,wizardData:r,goBack:o,goToStep:s,updateWizardData:i}=e,a=n.length>XRp,l;if(t[0]!==n||t[1]!==r.awsProfile)l=r.awsProfile&&!n.includes(r.awsProfile),t[0]=n,t[1]=r.awsProfile,t[2]=l;else l=t[2];let c=Boolean(l),[u,d]=v0e.useState(n.length===0||a||c),p;if(t[3]!==n||t[4]!==a)p=a?n.find(evp):void 0,t[3]=n,t[4]=a,t[5]=p;else p=t[5];let m=p,[f,h]=v0e.useState(r.awsProfile??m??""),[g,_]=v0e.useState(f.length),[T,y]=v0e.useState(null),S;if(t[6]!==u)S={context:"Settings",isActive:u},t[6]=u,t[7]=S;else S=t[7];Or("confirm:no",o,S);let E;if(t[8]!==s||t[9]!==i)E=(B)=>{i({awsProfile:B}),s(z_e.REGION)},t[8]=s,t[9]=i,t[10]=E;else E=t[10];let R=E;if(!u){let B=n.length,N;if(t[11]!==n.length)N=Sn(n.length,"profile"),t[11]=n.length,t[12]=N;else N=t[12];let F;if(t[13]!==n.length||t[14]!==N)F=MI.jsxs(Text,{dimColor:!0,children:["Found ",B," ",N," in ~/.aws/config and ~/.aws/credentials."]}),t[13]=n.length,t[14]=N,t[15]=F;else F=t[15];let V;if(t[16]!==n){let j;if(t[18]===Symbol.for("react.memo_cache_sentinel"))j={label:"Type a different name\u2026",value:N1a},t[18]=j;else j=t[18];V=[...n.map(ZRp),j],t[16]=n,t[17]=V}else V=t[17];let G=r.awsProfile&&n.includes(r.awsProfile)?r.awsProfile:void 0,z;if(t[19]!==R)z=(j)=>{if(j===N1a)d(!0);else R(j)},t[19]=R,t[20]=z;else z=t[20];let J;if(t[21]!==o||t[22]!==z||t[23]!==V||t[24]!==G)J=MI.jsx(hr,{options:V,defaultValue:G,onChange:z,onCancel:o}),t[21]=o,t[22]=z,t[23]=V,t[24]=G,t[25]=J;else J=t[25];let K;if(t[26]!==J||t[27]!==F)K=MI.jsx(_c,{subtitle:"AWS profile",children:MI.jsxs(Box,{flexDirection:"column",gap:1,children:[F,J]})}),t[26]=J,t[27]=F,t[28]=K;else K=t[28];return K}let w;if(t[29]!==R||t[30]!==f)w=()=>{let B=f.trim();if(!B){y("Profile name is required");return}y(null),R(B)},t[29]=R,t[30]=f,t[31]=w;else w=t[31];let H=w,k;if(t[32]===Symbol.for("react.memo_cache_sentinel"))k=MI.jsxs(bn,{children:[MI.jsx(at,{chord:"enter",action:"continue"}),MI.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})]}),t[32]=k;else k=t[32];let I;if(t[33]===Symbol.for("react.memo_cache_sentinel"))I=MI.jsx(Text,{children:"The name from ~/.aws/config (after [profile \u2026])."}),t[33]=I;else I=t[33];let D;if(t[34]!==m||t[35]!==n.length||t[36]!==a)D=a&&MI.jsxs(Text,{dimColor:!0,children:["Found ",n.length," profiles \u2014 too many to list.",m&&` Prepopulated with "${m}".`]}),t[34]=m,t[35]=n.length,t[36]=a,t[37]=D;else D=t[37];let O;if(t[38]===Symbol.for("react.memo_cache_sentinel"))O=MI.jsx(Text,{dimColor:!0,children:"If this is an SSO profile, run `aws sso login --profile NAME` first."}),t[38]=O;else O=t[38];let L;if(t[39]!==g||t[40]!==H||t[41]!==f)L=MI.jsx(Box,{marginTop:1,children:MI.jsx(ga,{value:f,onChange:h,onSubmit:H,placeholder:"my-bedrock-profile",columns:60,cursorOffset:g,onChangeCursorOffset:_,focus:!0,showCursor:!0})}),t[39]=g,t[40]=H,t[41]=f,t[42]=L;else L=t[42];let P;if(t[43]!==T)P=T&&MI.jsx(Box,{marginTop:1,children:MI.jsx(Ba,{error:T})}),t[43]=T,t[44]=P;else P=t[44];let M;if(t[45]!==L||t[46]!==P||t[47]!==D)M=MI.jsx(_c,{subtitle:"AWS profile name",footerText:k,children:MI.jsxs(Box,{flexDirection:"column",children:[I,D,O,L,P]})}),t[45]=L,t[46]=P,t[47]=D,t[48]=M;else M=t[48];return M}
function ZRp(e){return{label:e,value:e}}
function evp(e){return e.toLowerCase().includes("bedrock")}
var Zlo,v0e,MI,N1a="__manual__",XRp=12;
var B1a=b(()=>{je();ss();lr();uc();Ol();Is();I_();Wo();OE();rh();Fy();PE();M1a();p2n();Zlo=x(tt(),1),v0e=x(et(),1),MI=x(oe(),1)});
export {F1a,QRp,ZRp,evp,Zlo,v0e,MI,N1a,XRp,B1a};
