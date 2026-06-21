// @ts-nocheck
import {Mc,bo,mt,configProtoStore} from "../../vendor/m2458.ts";
import {useClock} from "../../vendor/m2432.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {Ie,ln} from "../telemetry/0594_feature_name.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {truncateToWidth,EH} from "../../vendor/m237.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {b,M} from "../../runtime.ts";
import {Ai,et} from "../../vendor/m2208.ts";
import {sl,$Ar} from "../../vendor/m715.ts";
import {ki,mr} from "../../vendor/m2453.ts";
import {ze} from "../../vendor/m2452.ts";
import {Iwe,qH} from "./2545_current.ts";
import {rs,at} from "../../vendor/m2546.ts";
import {wEn,Dwe} from "../../vendor/m2545.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {W4} from "../../vendor/m2461.ts";
import {Link} from "../../vendor/m2427.ts";
function mIm(){let e=mGt.c(8),t=Mc(),n=bo(),r=eV.useRef(null),o=useClock(),s;if(e[0]!==o||e[1]!==n||e[2]!==t)s=()=>{let c=t.getState().frameUrls,u=Object.values(c).at(-1)?.url;if(!u)return!1;Oc(u),Ie("frame_link_open");let d=Object.keys(c).at(-1)??null;if(n((p)=>p.frameExpanded&&p.frameNavPath===d?p:{...p,frameExpanded:!0,frameNavPath:d}),r.current)r.current();r.current=o.setTimeout(()=>{n(AIm)},aIm)},e[0]=o,e[1]=n,e[2]=t,e[3]=s;else s=e[3];let i;if(e[4]===Symbol.for("react.memo_cache_sentinel"))i={context:"Global"},e[4]=i;else i=e[4];Or("app:openArtifact",s,i);let a,l;if(e[5]!==n)a=()=>()=>{r.current?.(),n(fIm)},l=[n],e[5]=n,e[6]=a,e[7]=l;else a=e[6],l=e[7];eV.useEffect(a,l)}
function fIm(e){if(e.footerSelection==="frame"||!e.frameExpanded)return e;return{...e,frameExpanded:!1}}
function AIm(e){if(e.footerSelection==="frame"||!e.frameExpanded)return e;return{...e,frameExpanded:!1}}
function G6l(){let e=mGt.c(1);if(mIm(),!mt(hIm))return null;let n;if(e[0]===Symbol.for("react.memo_cache_sentinel"))n=ld.createElement(gIm,null),e[0]=n;else n=e[0];return n}
function hIm(e){return Object.keys(e.frameUrls).length>0}
function OJn(e,t){if(e.length===0)return 0;if(t!=null){let n=e.findIndex(([r])=>r===t);if(n!==-1)return n}return e.length-1}
function _Im(e,t,n){let r=e.length;if(r===0)return{visible:[],before:0,after:0};let o=e.map(([u,d],p)=>({idx:p,name:cOo.parse(u).name,url:d.url,updatedAt:d.updatedAt})),s=Math.min(Math.max(n??r-1,0),r-1);function i(u,d){let p=0;for(let m=u;m<=d;m++)p+=(m>u?a5e:0)+tn(o[m].name);if(u>0)p+=tn(`+${u}`)+a5e;if(d<r-1)p+=a5e+tn(`+${r-1-d}`);return p}let a=s,l=s;for(;;){if(l<r-1&&i(a,l+1)<=t){l++;continue}if(a>0&&i(a-1,l)<=t){a--;continue}break}let c=o.slice(a,l+1);if(c.length===1&&i(a,l)>t){let u=i(a,l)-tn(c[0].name),d=Math.max(1,t-u);c=[{...c[0],name:truncateToWidth(c[0].name,d)}]}return{visible:c,before:a,after:r-1-l}}
function yIm(e){let t=mGt.c(13),{name:n,url:r,highlighted:o,navSelected:s,stale:i}=e,[a,l]=eV.useState(!1),c;if(t[0]!==r)c=()=>void Oc(r),t[0]=r,t[1]=c;else c=t[1];let u,d;if(t[2]===Symbol.for("react.memo_cache_sentinel"))u=()=>l(!0),d=()=>l(!1),t[2]=u,t[3]=d;else u=t[2],d=t[3];let p=o||a?"claude":void 0,m=i&&!o&&!a&&!s,f;if(t[4]!==a||t[5]!==n||t[6]!==s||t[7]!==p||t[8]!==m)f=ld.createElement(Text,{underline:a,inverse:s,color:p,dimColor:m},n),t[4]=a,t[5]=n,t[6]=s,t[7]=p,t[8]=m,t[9]=f;else f=t[9];let A;if(t[10]!==c||t[11]!==f)A=ld.createElement(Box,{flexShrink:0,onClick:c,onMouseEnter:u,onMouseLeave:d},f),t[10]=c,t[11]=f,t[12]=A;else A=t[12];return A}
function TIm(e){return e.frameUrls}
function SIm(e){return e.footerSelection==="frame"}
function bIm(e){return e.frameNavPath}
function EIm(e){return e.frameExpanded}
function CIm(e){let[,t]=e;return Date.now()-t.updatedAt<=W6l}
function vIm(e){return e+1}
var mGt,cOo,ld,eV,aIm=15000,lIm=30000,W6l=1800000,cIm=60000,i5e=" \xB7 ",a5e,uIm=2,lOo,dIm,pIm,gIm;
var V6l=b(()=>{Ai();sl();ki();Hc();ze();Iwe();Ts();ln();configProtoStore();b_();EH();rs();wEn();mGt=M(rt(),1),cOo=require("path"),ld=M(Te(),1),eV=M(Te(),1),a5e=tn(i5e),lOo=uIm+tn(`${$Ar}  `),dIm=tn(`\u2190/\u2192 to navigate${i5e}`),pIm=tn("Enter to open");gIm=eV.memo(function(){let t=mGt.c(47),n=mt(TIm),r=mt(SIm),o=mt(bIm),s=mt(EIm),i=qH("app:openArtifact","Global","ctrl+]"),{columns:a}=mr(),[l,c]=eV.useState(!1),u=eV.useRef(null),d=useClock(),p;if(t[0]!==n)p=Object.entries(n),t[0]=n,t[1]=p;else p=t[1];let m=p,f=OJn(m,o),A;if(t[2]!==d)A=()=>{c(!0),u.current?.(),u.current=d.setTimeout(()=>c(!1),lIm)},t[2]=d,t[3]=A;else A=t[3];let h;if(t[4]!==d||t[5]!==n)h=[n,d],t[4]=d,t[5]=n,t[6]=h;else h=t[6];eV.useEffect(A,h);let g,_;if(t[7]===Symbol.for("react.memo_cache_sentinel"))g=()=>()=>{u.current?.()},_=[],t[7]=g,t[8]=_;else g=t[7],_=t[8];eV.useEffect(g,_);let[,y]=eV.useState(0),T=m.some(CIm),S;if(t[9]!==y)S=()=>y(vIm),t[9]=y,t[10]=S;else S=t[10];useInterval(S,T?cIm:null);let v=r||s?f:null,R=s?m[f]?.[1]?.url:void 0,k=r?`${et.pointer} `:"  ",x=!r&&l&&i!=="",H=0;if(r)H=pIm+(m.length>1?dIm:0);else if(x){let _e;if(t[11]!==i)_e=Dwe([W4(i)]),t[11]=i,t[12]=_e;else _e=t[12];let fe=`${_e} to open`,ie;if(t[13]!==fe)ie=tn(fe),t[13]=fe,t[14]=ie;else ie=t[14];H=ie}let I=v??m.length-1,P=tn(cOo.parse(m[I]?.[0]??"").name),L=I>0?tn(`+${I}`)+a5e:0,D=I<m.length-1?a5e+tn(`+${m.length-1-I}`):0,N=H>0&&a-lOo-H-a5e-L-D>=Math.min(P,16),O;if(t[15]!==i||t[16]!==m.length||t[17]!==x||t[18]!==N||t[19]!==r)O=N&&r?ld.createElement(ld.Fragment,null,m.length>1&&ld.createElement(at,{chord:["left","right"],action:"navigate"}),m.length>1&&i5e,ld.createElement(at,{chord:"enter",action:"open"})):N&&x?ld.createElement(at,{chord:i,action:"open"}):null,t[15]=i,t[16]=m.length,t[17]=x,t[18]=N,t[19]=r,t[20]=O;else O=t[20];let $=O,U=Math.max(8,a-lOo-(N?H+a5e:0)),{visible:W,before:G,after:V}=_Im(m,U,v),Q=Box,K="column",Y="100%",J=Box,ee="row",te=r?"claude":void 0,ne=!r,re;if(t[21]!==k||t[22]!==te||t[23]!==ne)re=ld.createElement(Text,{color:te,dimColor:ne},k),t[21]=k,t[22]=te,t[23]=ne,t[24]=re;else re=t[24];let oe;if(t[25]===Symbol.for("react.memo_cache_sentinel"))oe=ld.createElement(Text,{color:"claude"},$Ar,"  "),t[25]=oe;else oe=t[25];let ce;if(t[26]!==re)ce=ld.createElement(Box,{flexShrink:0},re,oe),t[26]=re,t[27]=ce;else ce=t[27];let ue;if(t[28]!==G)ue=G>0&&ld.createElement(Box,{flexShrink:0},ld.createElement(Text,{dimColor:!0},"+",G,i5e)),t[28]=G,t[29]=ue;else ue=t[29];let ae=W.map((_e,fe)=>{let{idx:ie,name:Ae,url:ge,updatedAt:Ce}=_e;return ld.createElement(ld.Fragment,{key:`${ie}-${Ae}`},fe>0&&ld.createElement(Text,{dimColor:!0},i5e),ld.createElement(yIm,{name:Ae,url:ge,highlighted:ie===v,navSelected:r&&ie===f,stale:Date.now()-Ce>W6l}))}),he;if(t[30]!==V)he=V>0&&ld.createElement(Box,{flexShrink:0},ld.createElement(Text,{dimColor:!0},i5e,"+",V)),t[30]=V,t[31]=he;else he=t[31];let se;if(t[32]!==$)se=$&&ld.createElement(Box,{flexShrink:0},ld.createElement(Text,{dimColor:!0},i5e,$)),t[32]=$,t[33]=se;else se=t[33];let le;if(t[34]!==J||t[35]!==ce||t[36]!==ue||t[37]!==ae||t[38]!==he||t[39]!==se)le=ld.createElement(J,{flexDirection:ee},ce,ue,ae,he,se),t[34]=J,t[35]=ce,t[36]=ue,t[37]=ae,t[38]=he,t[39]=se,t[40]=le;else le=t[40];let pe;if(t[41]!==R)pe=R&&ld.createElement(Box,{paddingLeft:lOo},ld.createElement(Link,{url:R},ld.createElement(Text,{dimColor:!0},R))),t[41]=R,t[42]=pe;else pe=t[42];let de;if(t[43]!==Q||t[44]!==le||t[45]!==pe)de=ld.createElement(Q,{flexDirection:K,width:Y},le,pe),t[43]=Q,t[44]=le,t[45]=pe,t[46]=de;else de=t[46];return de})});
export {mIm,fIm,AIm,G6l,hIm,OJn,_Im,yIm,TIm,SIm,bIm,EIm,CIm,vIm,mGt,cOo,ld,eV,aIm,lIm,W6l,cIm,i5e,a5e,uIm,lOo,dIm,pIm,gIm,V6l};
