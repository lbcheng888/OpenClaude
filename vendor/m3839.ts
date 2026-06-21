// @ts-nocheck
import {Eu} from "./m3812.ts";
import {dIa,pIa} from "./m3838.ts";
import {React,CE} from "./m3813.ts";
import {Jc,vE} from "./m3837.ts";
import {Or,Ts} from "./m2542.ts";
import {Ige,yBn} from "./m3817.ts";
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
function fIa(){let e=moo.c(10),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=Eu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={phase:"loading"},e[0]=s;else s=e[0];let[i,a]=pb.useState(s),l,c;if(e[1]===Symbol.for("react.memo_cache_sentinel"))l=()=>{let d=!1;return dIa().then((p)=>{if(!d)a({phase:"ready",profiles:p})}),()=>{d=!0}},c=[],e[1]=l,e[2]=c;else l=e[1],c=e[2];if(pb.useEffect(l,c),i.phase==="loading"){let d;if(e[3]===Symbol.for("react.memo_cache_sentinel"))d=pb.default.createElement(React,{subtitle:"AWS profile"},pb.default.createElement(Jc,{message:"Reading ~/.aws/config\u2026"})),e[3]=d;else d=e[3];return d}let u;if(e[4]!==t||e[5]!==n||e[6]!==i.profiles||e[7]!==r||e[8]!==o)u=pb.default.createElement(cAp,{profiles:i.profiles,wizardData:o,goBack:t,goToStep:n,updateWizardData:r}),e[4]=t,e[5]=n,e[6]=i.profiles,e[7]=r,e[8]=o,e[9]=u;else u=e[9];return u}
function cAp(e){let t=moo.c(49),{profiles:n,wizardData:r,goBack:o,goToStep:s,updateWizardData:i}=e,a=n.length>lAp,l;if(t[0]!==n||t[1]!==r.awsProfile)l=r.awsProfile&&!n.includes(r.awsProfile),t[0]=n,t[1]=r.awsProfile,t[2]=l;else l=t[2];let c=Boolean(l),[u,d]=pb.useState(n.length===0||a||c),p;if(t[3]!==n||t[4]!==a)p=a?n.find(dAp):void 0,t[3]=n,t[4]=a,t[5]=p;else p=t[5];let m=p,[f,A]=pb.useState(r.awsProfile??m??""),[h,g]=pb.useState(f.length),[_,y]=pb.useState(null),T;if(t[6]!==u)T={context:"Settings",isActive:u},t[6]=u,t[7]=T;else T=t[7];Or("confirm:no",o,T);let S;if(t[8]!==s||t[9]!==i)S=(O)=>{i({awsProfile:O}),s(Ige.REGION)},t[8]=s,t[9]=i,t[10]=S;else S=t[10];let v=S;if(!u){let O=n.length,$;if(t[11]!==n.length)$=Cn(n.length,"profile"),t[11]=n.length,t[12]=$;else $=t[12];let U;if(t[13]!==n.length||t[14]!==$)U=pb.default.createElement(Text,{dimColor:!0},"Found ",O," ",$," in ~/.aws/config and ~/.aws/credentials."),t[13]=n.length,t[14]=$,t[15]=U;else U=t[15];let W;if(t[16]!==n){let Y;if(t[18]===Symbol.for("react.memo_cache_sentinel"))Y={label:"Type a different name\u2026",value:mIa},t[18]=Y;else Y=t[18];W=[...n.map(uAp),Y],t[16]=n,t[17]=W}else W=t[17];let G=r.awsProfile&&n.includes(r.awsProfile)?r.awsProfile:void 0,V;if(t[19]!==v)V=(Y)=>{if(Y===mIa)d(!0);else v(Y)},t[19]=v,t[20]=V;else V=t[20];let Q;if(t[21]!==o||t[22]!==V||t[23]!==W||t[24]!==G)Q=pb.default.createElement(pr,{options:W,defaultValue:G,onChange:V,onCancel:o}),t[21]=o,t[22]=V,t[23]=W,t[24]=G,t[25]=Q;else Q=t[25];let K;if(t[26]!==Q||t[27]!==U)K=pb.default.createElement(React,{subtitle:"AWS profile"},pb.default.createElement(Box,{flexDirection:"column",gap:1},U,Q)),t[26]=Q,t[27]=U,t[28]=K;else K=t[28];return K}let R;if(t[29]!==v||t[30]!==f)R=()=>{let O=f.trim();if(!O){y("Profile name is required");return}y(null),v(O)},t[29]=v,t[30]=f,t[31]=R;else R=t[31];let k=R,x;if(t[32]===Symbol.for("react.memo_cache_sentinel"))x=pb.default.createElement(Tn,null,pb.default.createElement(at,{chord:"enter",action:"continue"}),pb.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),t[32]=x;else x=t[32];let H;if(t[33]===Symbol.for("react.memo_cache_sentinel"))H=pb.default.createElement(Text,null,"The name from ~/.aws/config (after [profile \u2026])."),t[33]=H;else H=t[33];let I;if(t[34]!==m||t[35]!==n.length||t[36]!==a)I=a&&pb.default.createElement(Text,{dimColor:!0},"Found ",n.length," profiles \u2014 too many to list.",m&&` Prepopulated with "${m}".`),t[34]=m,t[35]=n.length,t[36]=a,t[37]=I;else I=t[37];let P;if(t[38]===Symbol.for("react.memo_cache_sentinel"))P=pb.default.createElement(Text,{dimColor:!0},"If this is an SSO profile, run `aws sso login --profile NAME` first."),t[38]=P;else P=t[38];let L;if(t[39]!==h||t[40]!==k||t[41]!==f)L=pb.default.createElement(Box,{marginTop:1},pb.default.createElement(Pa,{value:f,onChange:A,onSubmit:k,placeholder:"my-bedrock-profile",columns:60,cursorOffset:h,onChangeCursorOffset:g,focus:!0,showCursor:!0})),t[39]=h,t[40]=k,t[41]=f,t[42]=L;else L=t[42];let D;if(t[43]!==_)D=_&&pb.default.createElement(Box,{marginTop:1},pb.default.createElement(nl,{error:_})),t[43]=_,t[44]=D;else D=t[44];let N;if(t[45]!==L||t[46]!==D||t[47]!==I)N=pb.default.createElement(React,{subtitle:"AWS profile name",footerText:x},pb.default.createElement(Box,{flexDirection:"column"},H,I,P,L,D)),t[45]=L,t[46]=D,t[47]=I,t[48]=N;else N=t[48];return N}
function uAp(e){return{label:e,value:e}}
function dAp(e){return e.toLowerCase().includes("bedrock")}
var moo,pb,mIa="__manual__",lAp=12;
var AIa=b(()=>{ze();Ts();dr();readRoster();Yl();zs();v_();rs();vE();rh();$y();CE();pIa();yBn();moo=M(rt(),1),pb=M(Te(),1)});
export {fIa,cAp,uAp,dAp,moo,pb,mIa,lAp,AIa};
