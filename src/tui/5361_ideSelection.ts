// @ts-nocheck
import {Mc,mt,configProtoStore} from "../../vendor/m2458.ts";
import {BJn,bOo} from "../../vendor/m5359.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {isBridgeEnabled,Vk} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {nqe,SUn} from "../core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Text} from "../../vendor/m2423.ts";
import {et,Ai} from "../../vendor/m2208.ts";
import {Link} from "../../vendor/m2427.ts";
import {fqe,t2n} from "../../vendor/m4005.ts";
import {Box} from "../../vendor/m2422.ts";
import {b,M} from "../../runtime.ts";
import {mte,SBn} from "../../vendor/m3821.ts";
import {Ijl,SOo,Hjl} from "../../vendor/m5358.ts";
import {ze} from "../../vendor/m2452.ts";
import {rs,at} from "../../vendor/m2546.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function Ojl(e){let t=FJn.c(41),{ideSelection:n,mcpClients:r,debug:o,bridgeSelected:s,modeLabels:i}=e,a=Mc(),l;if(t[0]!==a)l=()=>a.getState().remoteSessionUrl,t[0]=a,t[1]=l;else l=t[1];let[c]=KAt.useState(l),{status:u}=BJn(r),d;if(t[2]!==n||t[3]!==u)d=f0m(u,n),t[2]=n,t[3]=u,t[4]=d;else d=t[4];let p=d,m=mt(d0m),{columns:f}=mr(),A;if(t[5]!==m||t[6]!==f)A=m&&f>=EOo&&isBridgeEnabled(),t[5]=m,t[6]=f,t[7]=A;else A=t[7];let h=A;nqe();let g;if(t[8]===Symbol.for("react.memo_cache_sentinel"))g=getFeatureValue_CACHED_MAY_BE_STALE("tengu_copper_thistle",!1),t[8]=g;else g=t[8];let _=g,y=mt(u0m),T=mt(c0m),S=_&&(y!==null||T),v=!1,R;if(t[9]!==s||t[10]!==o||t[11]!==v||t[12]!==p||t[13]!==i||t[14]!==y||t[15]!==c||t[16]!==h||t[17]!==S){if(R=[],c){let x;if(t[20]===Symbol.for("react.memo_cache_sentinel"))x=lp.createElement(Text,{color:"ide"},et.circleDouble," cloud"),t[20]=x;else x=t[20];let H;if(t[21]!==c)H=lp.createElement(Link,{url:c,key:"cloud"},x),t[21]=c,t[22]=H;else H=t[22];R.push(H),v=!0}if(p){let x;if(t[23]!==p)x=lp.createElement(Text,{color:"ide",wrap:"truncate",key:"ide"},p),t[23]=p,t[24]=x;else x=t[24];R.push(x),v=!0}if(o){let x;if(t[25]===Symbol.for("react.memo_cache_sentinel"))x=lp.createElement(Text,{color:"warning",wrap:"truncate",key:"debug"},"Debug"),t[25]=x;else x=t[25];R.push(x),v=!0}if(h){let x;if(t[26]!==s||t[27]!==v)x=lp.createElement(p0m,{key:"bridge",bridgeSelected:s,leadingSeparator:v}),t[26]=s,t[27]=v,t[28]=x;else x=t[28];R.push(x),v=!0}if(S){let x;if(t[29]!==v)x=v&&lp.createElement(Text,{dimColor:!0,key:"pr-sep"}," \xB7 "),t[29]=v,t[30]=x;else x=t[30];let H;if(t[31]!==y)H=y?lp.createElement(fqe,{number:y.number,url:y.url,reviewState:y.reviewState,kind:y.kind}):lp.createElement(Text,{dimColor:!0},"gh auth login"),t[31]=y,t[32]=H;else H=t[32];let I;if(t[33]!==x||t[34]!==H)I=lp.createElement(lp.Fragment,{key:"pr"},x,H),t[33]=x,t[34]=H,t[35]=I;else I=t[35];R.push(I),v=!0}if(i.length>0){let x;if(t[36]!==v||t[37]!==i)x=lp.createElement(m0m,{key:"mode-labels",labels:i,leadingSeparator:v}),t[36]=v,t[37]=i,t[38]=x;else x=t[38];R.push(x)}t[9]=s,t[10]=o,t[11]=v,t[12]=p,t[13]=i,t[14]=y,t[15]=c,t[16]=h,t[17]=S,t[18]=R,t[19]=v}else R=t[18],v=t[19];if(R.length===0)return null;let k;if(t[39]!==R)k=lp.createElement(Box,{flexShrink:0},R.flatMap(l0m)),t[39]=R,t[40]=k;else k=t[40];return k}
function l0m(e,t){let n=e?.key;if(t===0||(n==="bridge"||n==="pr"||n==="mode-labels"))return[e];return[lp.createElement(Text,{dimColor:!0,key:`sep-${n}`}," \xB7 "),e]}
function c0m(e){return e.prNeedsAuth}
function u0m(e){return e.prStatus}
function d0m(e){return e.replBridgeEnabled&&e.replBridgeError===void 0}
function m0m(e){let t=FJn.c(9),{labels:n,leadingSeparator:r}=e,o;if(t[0]!==r)o=r&&lp.createElement(Text,{dimColor:!0,key:"mode-labels-sep"}," \xB7 "),t[0]=r,t[1]=o;else o=t[1];let s;if(t[2]!==n)s=n.join(" & "),t[2]=n,t[3]=s;else s=t[3];let i;if(t[4]!==s)i=lp.createElement(Text,{dimColor:!0},s),t[4]=s,t[5]=i;else i=t[5];let a;if(t[6]!==o||t[7]!==i)a=lp.createElement(lp.Fragment,null,o,i),t[6]=o,t[7]=i,t[8]=a;else a=t[8];return a}
function f0m(e,t){if(e!=="connected"||!t)return null;if(t.text&&t.lineCount>0)return`\u29C9 ${t.lineCount} ${t.lineCount===1?"line":"lines"} selected`;if(t.filePath)return`\u29C9 In ${Pjl.basename(t.filePath)}`;return null}
function A0m(e){return e.replBridgeConnected}
function h0m(e){return e.replBridgeSessionActive}
function g0m(e){return e.replBridgeReconnecting}
function _0m(e){return e.replBridgeError}
function y0m(e){return e.replBridgeOutboundOnly}
function T0m(e){return e.replBridgeSessionUrl}
var FJn,Pjl,lp,KAt,EOo=60,p0m;
var COo=b(()=>{Ai();configProtoStore();Vk();mte();Ijl();SUn();bOo();ki();ze();zn();rs();t2n();FJn=M(rt(),1),Pjl=require("path"),lp=M(Te(),1),KAt=M(Te(),1);p0m=KAt.memo(function(t){let n=FJn.c(26),{bridgeSelected:r,leadingSeparator:o}=t,s=mt(A0m),i=mt(h0m),a=mt(g0m),l=mt(_0m),c=mt(y0m),u=mt(T0m),d;if(n[0]!==l||n[1]!==c)d=!isBridgeEnabled()||c||Boolean(l),n[0]=l,n[1]=c,n[2]=d;else d=n[2];let p=d,m;if(n[3]!==s||n[4]!==a||n[5]!==i)m=SBn({connected:s,sessionActive:i,reconnecting:a}),n[3]=s,n[4]=a,n[5]=i,n[6]=m;else m=n[6];let f=m,A=SOo(),h,g;if(n[7]!==p||n[8]!==f.label)h=()=>{if(!p&&f.label==="/rc active")Hjl()},g=[p,f.label],n[7]=p,n[8]=f.label,n[9]=h,n[10]=g;else h=n[9],g=n[10];if(KAt.useEffect(h,g),p)return null;let _=f.label==="/rc active"&&!A?"/rc":f.label,y;if(n[11]!==_||n[12]!==u)y=u?lp.createElement(Link,{url:u},_):_,n[11]=_,n[12]=u,n[13]=y;else y=n[13];let T=y,S;if(n[14]!==o)S=o&&lp.createElement(Text,{dimColor:!0,key:"bridge-sep"}," \xB7 "),n[14]=o,n[15]=S;else S=n[15];let v=r?"background":f.color,R;if(n[16]!==r)R=r&&lp.createElement(Text,{dimColor:!0}," \xB7 ",lp.createElement(at,{chord:"enter",action:"view"})),n[16]=r,n[17]=R;else R=n[17];let k;if(n[18]!==r||n[19]!==T||n[20]!==v||n[21]!==R)k=lp.createElement(Text,{color:v,inverse:r,wrap:"truncate"},T,R),n[18]=r,n[19]=T,n[20]=v,n[21]=R,n[22]=k;else k=n[22];let x;if(n[23]!==S||n[24]!==k)x=lp.createElement(lp.Fragment,null,S,k),n[23]=S,n[24]=k,n[25]=x;else x=n[25];return x})});
export {Ojl,l0m,c0m,u0m,d0m,m0m,f0m,A0m,h0m,g0m,_0m,y0m,T0m,FJn,Pjl,lp,KAt,EOo,p0m,COo};
