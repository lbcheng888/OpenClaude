// @ts-nocheck
import {bD,Ihe} from "./m2544.ts";
import {Oo,ss} from "./m2553.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {preInitQueue,di} from "./m2583.ts";
import {zpl,Kpl,x8t} from "../src/telemetry/4531_agentPushNotifEnabled.ts";
import {NRt,Pa} from "./m720.ts";
import {Link,yie} from "./m2437.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function TAo(e){switch(e){case"terminal_bell":return"bell";case"iterm2_with_bell":return"iterm2+bell";case"notifications_disabled":return"none";default:return e}}
function Qpl(e){let t=yAo.c(43),{channel:n,showInputNeededRow:r,showDoneRow:o,inputNeededEnabled:s,doneEnabled:i,onCycleChannel:a,onToggleInputNeeded:l,onToggleDone:c,onClose:u}=e,[d,p]=Bft.useState(0),m=Bft.useRef(null);bD(m,!0);let f;if(t[0]!==n)f=TAo(n),t[0]=n,t[1]=f;else f=t[1];let h=`\u2039 ${f} \u203A`,g;if(t[2]!==a||t[3]!==h)g={id:"channel",label:"Channel",value:h,activate:a},t[2]=a,t[3]=h,t[4]=g;else g=t[4];let _;if(t[5]!==s||t[6]!==l||t[7]!==r)_=r?[{id:"inputNeeded",label:"Notify when Claude needs you",value:String(s),activate:l}]:[],t[5]=s,t[6]=l,t[7]=r,t[8]=_;else _=t[8];let T;if(t[9]!==i||t[10]!==c||t[11]!==o)T=o?[{id:"done",label:"Notify when Claude is done",value:String(i),activate:c}]:[],t[9]=i,t[10]=c,t[11]=o,t[12]=T;else T=t[12];let y;if(t[13]!==g||t[14]!==_||t[15]!==T)y=[g,..._,...T],t[13]=g,t[14]=_,t[15]=T,t[16]=y;else y=t[16];let S=y,E;if(t[17]!==d||t[18]!==S)E=function(){S[d]?.activate()},t[17]=d,t[18]=S,t[19]=E;else E=t[19];let R=E,w;if(t[20]===Symbol.for("react.memo_cache_sentinel"))w=()=>p(ZYp),t[20]=w;else w=t[20];let H;if(t[21]!==S.length)H=()=>p((F)=>Math.min(S.length-1,F+1)),t[21]=S.length,t[22]=H;else H=t[22];let k;if(t[23]!==R||t[24]!==H)k={"select:previous":w,"select:next":H,"select:accept":R},t[23]=R,t[24]=H,t[25]=k;else k=t[25];let I;if(t[26]===Symbol.for("react.memo_cache_sentinel"))I={context:"Select",isActive:!0},t[26]=I;else I=t[26];Oo(k,I);let D;if(t[27]!==R)D=function(V){if(V.key===" ")V.preventDefault(),R()},t[27]=R,t[28]=D;else D=t[28];let O=D,L;if(t[29]===Symbol.for("react.memo_cache_sentinel"))L=defineTool.jsxs(bn,{children:[defineTool.jsx(at,{chord:["up","down"],action:"navigate"}),defineTool.jsx(at,{chord:"enter",action:"change"}),defineTool.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"close"})]}),t[29]=L;else L=t[29];let P;if(t[30]!==d||t[31]!==S)P=S.map((F,V)=>{let G=V===d;return defineTool.jsxs(Box,{children:[defineTool.jsx(Box,{width:34,flexShrink:0,marginRight:1,children:defineTool.jsxs(Text,{color:G?"suggestion":void 0,wrap:"truncate-end",children:[G?Xe.pointer:" "," ",F.label]})}),defineTool.jsx(Text,{color:G?"suggestion":void 0,wrap:"truncate-end",children:F.value})]},F.id)}),t[30]=d,t[31]=S,t[32]=P;else P=t[32];let M;if(t[33]!==o||t[34]!==r)M=(r||o)&&defineTool.jsx(SAo,{}),t[33]=o,t[34]=r,t[35]=M;else M=t[35];let B;if(t[36]!==O||t[37]!==P||t[38]!==M)B=defineTool.jsxs(Box,{flexDirection:"column",ref:m,tabIndex:0,autoFocus:!0,onKeyDown:O,children:[P,M]}),t[36]=O,t[37]=P,t[38]=M,t[39]=B;else B=t[39];let N;if(t[40]!==u||t[41]!==B)N=defineTool.jsx(preInitQueue,{title:"Notifications",onCancel:u,hideBorder:!0,inputGuide:L,children:B}),t[40]=u,t[41]=B,t[42]=N;else N=t[42];return N}
function ZYp(e){return Math.max(0,e-1)}
function SAo(){let e=yAo.c(1);if(Bft.useSyncExternalStore(zpl,Kpl,eJp)?.has_active_channel!==!1)return null;let n;if(e[0]===Symbol.for("react.memo_cache_sentinel"))n=defineTool.jsxs(Text,{color:"warning",wrap:"truncate-end",children:["  ",NRt," No mobile registered \xB7"," ",defineTool.jsx(Link,{url:"https://claude.com/download#mobile",children:"get the app"})," and turn on notif"]}),e[0]=n;else n=e[0];return n}
function eJp(){}
var yAo,Bft,defineTool,$8e;
var bAo=b(()=>{Zs();Pa();yie();Ihe();je();ss();x8t();uc();Is();di();Wo();yAo=x(tt(),1),Bft=x(et(),1),defineTool=x(oe(),1),$8e=["auto","iterm2","terminal_bell","iterm2_with_bell","kitty","ghostty","notifications_disabled"]});
export {TAo,Qpl,ZYp,SAo,eJp,yAo,Bft,defineTool,$8e,bAo};
