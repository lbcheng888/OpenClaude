// @ts-nocheck
import {Eu} from "./m3812.ts";
import {LIa,MIa} from "./m3849.ts";
import {React,CE} from "./m3813.ts";
import {Jc,vE} from "./m3837.ts";
import {Or,Ts} from "./m2542.ts";
import {BHe,LBn} from "./m3844.ts";
import {Cn,dr} from "./m231.ts";
import {Text} from "./m2423.ts";
import {pr,Yl} from "./m2562.ts";
import {Box} from "./m2422.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Pa,rh} from "./m2539.ts";
import {nl,v_} from "./m2573.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function BIa(){let e=Too.c(10),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=Eu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={phase:"loading"},e[0]=s;else s=e[0];let[i,a]=mb.useState(s),l,c;if(e[1]===Symbol.for("react.memo_cache_sentinel"))l=()=>{let d=!1;return LIa().then((p)=>{if(!d)a({phase:"ready",projects:p})}),()=>{d=!0}},c=[],e[1]=l,e[2]=c;else l=e[1],c=e[2];if(mb.useEffect(l,c),i.phase==="loading"){let d;if(e[3]===Symbol.for("react.memo_cache_sentinel"))d=mb.default.createElement(React,{subtitle:"GCP project"},mb.default.createElement(Jc,{message:"Reading ~/.config/gcloud\u2026"})),e[3]=d;else d=e[3];return d}let u;if(e[4]!==t||e[5]!==n||e[6]!==i.projects||e[7]!==r||e[8]!==o)u=mb.default.createElement(wAp,{projects:i.projects,wizardData:o,goBack:t,goToStep:n,updateWizardData:r}),e[4]=t,e[5]=n,e[6]=i.projects,e[7]=r,e[8]=o,e[9]=u;else u=e[9];return u}
function wAp(e){let t=Too.c(45),{projects:n,wizardData:r,goBack:o,goToStep:s,updateWizardData:i}=e,a=n.length>vAp,l;if(t[0]!==n||t[1]!==r.projectId)l=r.projectId&&!n.includes(r.projectId),t[0]=n,t[1]=r.projectId,t[2]=l;else l=t[2];let c=Boolean(l),[u,d]=mb.useState(n.length===0||a||c),[p,m]=mb.useState(r.projectId??""),[f,A]=mb.useState(p.length),[h,g]=mb.useState(null),_;if(t[3]!==u)_={context:"Settings",isActive:u},t[3]=u,t[4]=_;else _=t[4];Or("confirm:no",o,_);let y;if(t[5]!==s||t[6]!==i)y=(D)=>{i({projectId:D}),s(BHe.REGION)},t[5]=s,t[6]=i,t[7]=y;else y=t[7];let T=y;if(!u){let D=n.length,N;if(t[8]!==n.length)N=Cn(n.length,"project"),t[8]=n.length,t[9]=N;else N=t[9];let O;if(t[10]!==n.length||t[11]!==N)O=mb.default.createElement(Text,{dimColor:!0},"Found ",D," ",N," in your gcloud configurations."),t[10]=n.length,t[11]=N,t[12]=O;else O=t[12];let $;if(t[13]!==n){let Q;if(t[15]===Symbol.for("react.memo_cache_sentinel"))Q={label:"Type a different project\u2026",value:NIa},t[15]=Q;else Q=t[15];$=[...n.map(RAp),Q],t[13]=n,t[14]=$}else $=t[14];let U=r.projectId&&n.includes(r.projectId)?r.projectId:void 0,W;if(t[16]!==T)W=(Q)=>{if(Q===NIa)d(!0);else T(Q)},t[16]=T,t[17]=W;else W=t[17];let G;if(t[18]!==o||t[19]!==$||t[20]!==U||t[21]!==W)G=mb.default.createElement(pr,{options:$,defaultValue:U,onChange:W,onCancel:o}),t[18]=o,t[19]=$,t[20]=U,t[21]=W,t[22]=G;else G=t[22];let V;if(t[23]!==G||t[24]!==O)V=mb.default.createElement(React,{subtitle:"GCP project"},mb.default.createElement(Box,{flexDirection:"column",gap:1},O,G)),t[23]=G,t[24]=O,t[25]=V;else V=t[25];return V}let S;if(t[26]!==T||t[27]!==p)S=()=>{let D=p.trim();if(!D){g("Project ID is required");return}g(null),T(D)},t[26]=T,t[27]=p,t[28]=S;else S=t[28];let v=S,R;if(t[29]===Symbol.for("react.memo_cache_sentinel"))R=mb.default.createElement(Tn,null,mb.default.createElement(at,{chord:"enter",action:"continue"}),mb.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),t[29]=R;else R=t[29];let k;if(t[30]===Symbol.for("react.memo_cache_sentinel"))k=mb.default.createElement(Text,null,"The project where Vertex AI is enabled."),t[30]=k;else k=t[30];let x;if(t[31]!==n.length||t[32]!==a)x=a&&mb.default.createElement(Text,{dimColor:!0},"Found ",n.length," projects \u2014 too many to list."),t[31]=n.length,t[32]=a,t[33]=x;else x=t[33];let H;if(t[34]===Symbol.for("react.memo_cache_sentinel"))H=mb.default.createElement(Text,{dimColor:!0},"Find it with `gcloud config get-value project` or in the GCP console header."),t[34]=H;else H=t[34];let I;if(t[35]!==f||t[36]!==v||t[37]!==p)I=mb.default.createElement(Box,{marginTop:1},mb.default.createElement(Pa,{value:p,onChange:m,onSubmit:v,placeholder:"my-gcp-project",columns:60,cursorOffset:f,onChangeCursorOffset:A,focus:!0,showCursor:!0})),t[35]=f,t[36]=v,t[37]=p,t[38]=I;else I=t[38];let P;if(t[39]!==h)P=h&&mb.default.createElement(Box,{marginTop:1},mb.default.createElement(nl,{error:h})),t[39]=h,t[40]=P;else P=t[40];let L;if(t[41]!==P||t[42]!==x||t[43]!==I)L=mb.default.createElement(React,{subtitle:"GCP project ID",footerText:R},mb.default.createElement(Box,{flexDirection:"column"},k,x,H,I,P)),t[41]=P,t[42]=x,t[43]=I,t[44]=L;else L=t[44];return L}
function RAp(e){return{label:e,value:e}}
var Too,mb,NIa="__manual__",vAp=12;
var FIa=b(()=>{ze();Ts();dr();readRoster();Yl();zs();v_();rs();vE();rh();$y();CE();MIa();LBn();Too=M(rt(),1),mb=M(Te(),1)});
export {BIa,wAp,RAp,Too,mb,NIa,vAp,FIa};
