// @ts-nocheck
import {gc,_t,uo} from "../../vendor/m2468.ts";
import {Ner,$Fo} from "../../vendor/m5392.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {isBridgeEnabled,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {P6e,J9n} from "../core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Text} from "../../vendor/m2433.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Link} from "../../vendor/m2437.ts";
import {G6e,U3n} from "../../vendor/m4070.ts";
import {Box} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {ate,h2n} from "../../vendor/m3839.ts";
import {pYl,UFo,dYl} from "../../vendor/m5391.ts";
import {je} from "../../vendor/m2462.ts";
import {Wo,at} from "../../vendor/m2557.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
function gYl(e){let t=Fer.c(41),{ideSelection:n,mcpClients:r,debug:o,bridgeSelected:s,modeLabels:i}=e,a=gc(),l;if(t[0]!==a)l=()=>a.getState().remoteSessionUrl,t[0]=a,t[1]=l;else l=t[1];let[c]=dyt.useState(l),{status:u}=Ner(r),d;if(t[2]!==n||t[3]!==u)d=EBm(u,n),t[2]=n,t[3]=u,t[4]=d;else d=t[4];let p=d,m=_t(TBm),{columns:f}=_r(),h;if(t[5]!==m||t[6]!==f)h=m&&f>=qFo&&isBridgeEnabled(),t[5]=m,t[6]=f,t[7]=h;else h=t[7];let g=h;P6e();let _;if(t[8]===Symbol.for("react.memo_cache_sentinel"))_=getFeatureValue_CACHED_MAY_BE_STALE("tengu_copper_thistle",!1),t[8]=_;else _=t[8];let T=_,y=_t(yBm),S=_t(_Bm),E=T&&(y!==null||S),R=!1,w;if(t[9]!==s||t[10]!==o||t[11]!==R||t[12]!==p||t[13]!==i||t[14]!==y||t[15]!==c||t[16]!==g||t[17]!==E){if(w=[],c){let k;if(t[20]===Symbol.for("react.memo_cache_sentinel"))k=zC.jsxs(Text,{color:"ide",children:[Xe.circleDouble," cloud"]}),t[20]=k;else k=t[20];let I;if(t[21]!==c)I=zC.jsx(Link,{url:c,children:k},"cloud"),t[21]=c,t[22]=I;else I=t[22];w.push(I),R=!0}if(p){let k;if(t[23]!==p)k=zC.jsx(Text,{color:"ide",wrap:"truncate",children:p},"ide"),t[23]=p,t[24]=k;else k=t[24];w.push(k),R=!0}if(o){let k;if(t[25]===Symbol.for("react.memo_cache_sentinel"))k=zC.jsx(Text,{color:"warning",wrap:"truncate",children:"Debug"},"debug"),t[25]=k;else k=t[25];w.push(k),R=!0}if(g){let k;if(t[26]!==s||t[27]!==R)k=zC.jsx(SBm,{bridgeSelected:s,leadingSeparator:R},"bridge"),t[26]=s,t[27]=R,t[28]=k;else k=t[28];w.push(k),R=!0}if(E){let k;if(t[29]!==R)k=R&&zC.jsx(Text,{dimColor:!0,children:" \xB7 "},"pr-sep"),t[29]=R,t[30]=k;else k=t[30];let I;if(t[31]!==y)I=y?zC.jsx(G6e,{number:y.number,url:y.url,reviewState:y.reviewState,kind:y.kind}):zC.jsx(Text,{dimColor:!0,children:"gh auth login"}),t[31]=y,t[32]=I;else I=t[32];let D;if(t[33]!==k||t[34]!==I)D=zC.jsxs(hYl.Fragment,{children:[k,I]},"pr"),t[33]=k,t[34]=I,t[35]=D;else D=t[35];w.push(D),R=!0}if(i.length>0){let k;if(t[36]!==R||t[37]!==i)k=zC.jsx(bBm,{labels:i,leadingSeparator:R},"mode-labels"),t[36]=R,t[37]=i,t[38]=k;else k=t[38];w.push(k)}t[9]=s,t[10]=o,t[11]=R,t[12]=p,t[13]=i,t[14]=y,t[15]=c,t[16]=g,t[17]=E,t[18]=w,t[19]=R}else w=t[18],R=t[19];if(w.length===0)return null;let H;if(t[39]!==w)H=zC.jsx(Box,{flexShrink:0,children:w.flatMap(gBm)}),t[39]=w,t[40]=H;else H=t[40];return H}
function gBm(e,t){let n=e?.key;if(t===0||(n==="bridge"||n==="pr"||n==="mode-labels"))return[e];return[zC.jsx(Text,{dimColor:!0,children:" \xB7 "},`sep-${n}`),e]}
function _Bm(e){return e.prNeedsAuth}
function yBm(e){return e.prStatus}
function TBm(e){return e.replBridgeEnabled&&e.replBridgeError===void 0}
function bBm(e){let t=Fer.c(9),{labels:n,leadingSeparator:r}=e,o;if(t[0]!==r)o=r&&zC.jsx(Text,{dimColor:!0,children:" \xB7 "},"mode-labels-sep"),t[0]=r,t[1]=o;else o=t[1];let s;if(t[2]!==n)s=n.join(" & "),t[2]=n,t[3]=s;else s=t[3];let i;if(t[4]!==s)i=zC.jsx(Text,{dimColor:!0,children:s}),t[4]=s,t[5]=i;else i=t[5];let a;if(t[6]!==o||t[7]!==i)a=zC.jsxs(zC.Fragment,{children:[o,i]}),t[6]=o,t[7]=i,t[8]=a;else a=t[8];return a}
function EBm(e,t){if(!t)return null;let n=t.source==="diff";if(!n&&e!=="connected")return null;if(t.text&&t.lineCount>0){let r=t.lineCount;return`\u29C9 ${r} ${r===1?"line":"lines"} ${n?"from diff":"selected"}`}if(!n&&t.filePath)return`\u29C9 In ${fYl.basename(t.filePath)}`;return null}
function CBm(e){return e.replBridgeConnected}
function ABm(e){return e.replBridgeSessionActive}
function RBm(e){return e.replBridgeReconnecting}
function vBm(e){return e.replBridgeError}
function wBm(e){return e.replBridgeOutboundOnly}
function kBm(e){return e.replBridgeSessionUrl}
var Fer,fYl,hYl,dyt,zC,qFo=60,SBm;
var WFo=b(()=>{Zs();uo();pH();ate();pYl();J9n();$Fo();ui();je();jn();Wo();U3n();Fer=x(tt(),1),fYl=require("path"),hYl=x(et(),1),dyt=x(et(),1),zC=x(oe(),1);SBm=dyt.memo(function(t){let n=Fer.c(26),{bridgeSelected:r,leadingSeparator:o}=t,s=_t(CBm),i=_t(ABm),a=_t(RBm),l=_t(vBm),c=_t(wBm),u=_t(kBm),d;if(n[0]!==l||n[1]!==c)d=!isBridgeEnabled()||c||Boolean(l),n[0]=l,n[1]=c,n[2]=d;else d=n[2];let p=d,m;if(n[3]!==s||n[4]!==a||n[5]!==i)m=h2n({connected:s,sessionActive:i,reconnecting:a}),n[3]=s,n[4]=a,n[5]=i,n[6]=m;else m=n[6];let f=m,h=UFo(),g,_;if(n[7]!==p||n[8]!==f.label)g=()=>{if(!p&&f.label==="/rc active")dYl()},_=[p,f.label],n[7]=p,n[8]=f.label,n[9]=g,n[10]=_;else g=n[9],_=n[10];if(dyt.useEffect(g,_),p)return null;let T=f.label==="/rc active"&&!h?"/rc":f.label,y;if(n[11]!==T||n[12]!==u)y=u?zC.jsx(Link,{url:u,children:T}):T,n[11]=T,n[12]=u,n[13]=y;else y=n[13];let S=y,E;if(n[14]!==o)E=o&&zC.jsx(Text,{dimColor:!0,children:" \xB7 "},"bridge-sep"),n[14]=o,n[15]=E;else E=n[15];let R=r?"background":f.color,w;if(n[16]!==r)w=r&&zC.jsxs(Text,{dimColor:!0,children:[" \xB7 ",zC.jsx(at,{chord:"enter",action:"view"})]}),n[16]=r,n[17]=w;else w=n[17];let H;if(n[18]!==r||n[19]!==S||n[20]!==R||n[21]!==w)H=zC.jsxs(Text,{color:R,inverse:r,wrap:"truncate",children:[S,w]}),n[18]=r,n[19]=S,n[20]=R,n[21]=w,n[22]=H;else H=n[22];let k;if(n[23]!==E||n[24]!==H)k=zC.jsxs(zC.Fragment,{children:[E,H]}),n[23]=E,n[24]=H,n[25]=k;else k=n[25];return k})});
export {gYl,gBm,_Bm,yBm,TBm,bBm,EBm,CBm,ABm,RBm,vBm,wBm,kBm,Fer,fYl,hYl,dyt,zC,qFo,SBm,WFo};
