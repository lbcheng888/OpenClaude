// @ts-nocheck
import {iP,gAe} from "./m2533.ts";
import {Wo,Ts} from "./m2542.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Kn,Li} from "./m2572.ts";
import {sil,oil,s6t} from "../src/telemetry/4511_agentPushNotifEnabled.ts";
import {uEt,sl} from "./m715.ts";
import {Link,Tie} from "./m2427.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function wyo(e){switch(e){case"terminal_bell":return"bell";case"iterm2_with_bell":return"iterm2+bell";case"notifications_disabled":return"none";default:return e}}
function uil(e){let t=vyo.c(43),{channel:n,showInputNeededRow:r,showDoneRow:o,inputNeededEnabled:s,doneEnabled:i,onCycleChannel:a,onToggleInputNeeded:l,onToggleDone:c,onClose:u}=e,[d,p]=rD.useState(0),m=rD.useRef(null);iP(m,!0);let f;if(t[0]!==n)f=wyo(n),t[0]=n,t[1]=f;else f=t[1];let A=`\u2039 ${f} \u203A`,h;if(t[2]!==a||t[3]!==A)h={id:"channel",label:"Channel",value:A,activate:a},t[2]=a,t[3]=A,t[4]=h;else h=t[4];let g;if(t[5]!==s||t[6]!==l||t[7]!==r)g=r?[{id:"inputNeeded",label:"Notify when Claude needs you",value:String(s),activate:l}]:[],t[5]=s,t[6]=l,t[7]=r,t[8]=g;else g=t[8];let _;if(t[9]!==i||t[10]!==c||t[11]!==o)_=o?[{id:"done",label:"Notify when Claude is done",value:String(i),activate:c}]:[],t[9]=i,t[10]=c,t[11]=o,t[12]=_;else _=t[12];let y;if(t[13]!==h||t[14]!==g||t[15]!==_)y=[h,...g,..._],t[13]=h,t[14]=g,t[15]=_,t[16]=y;else y=t[16];let T=y,S;if(t[17]!==d||t[18]!==T)S=function(){T[d]?.activate()},t[17]=d,t[18]=T,t[19]=S;else S=t[19];let v=S,R;if(t[20]===Symbol.for("react.memo_cache_sentinel"))R=()=>p(_8p),t[20]=R;else R=t[20];let k;if(t[21]!==T.length)k=()=>p((U)=>Math.min(T.length-1,U+1)),t[21]=T.length,t[22]=k;else k=t[22];let x;if(t[23]!==v||t[24]!==k)x={"select:previous":R,"select:next":k,"select:accept":v},t[23]=v,t[24]=k,t[25]=x;else x=t[25];let H;if(t[26]===Symbol.for("react.memo_cache_sentinel"))H={context:"Select",isActive:!0},t[26]=H;else H=t[26];Wo(x,H);let I;if(t[27]!==v)I=function(W){if(W.key===" ")W.preventDefault(),v()},t[27]=v,t[28]=I;else I=t[28];let P=I,L;if(t[29]===Symbol.for("react.memo_cache_sentinel"))L=rD.default.createElement(Tn,null,rD.default.createElement(at,{chord:["up","down"],action:"navigate"}),rD.default.createElement(at,{chord:"enter",action:"change"}),rD.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"close"})),t[29]=L;else L=t[29];let D;if(t[30]!==d||t[31]!==T)D=T.map((U,W)=>{let G=W===d;return rD.default.createElement(Box,{key:U.id},rD.default.createElement(Box,{width:34,flexShrink:0,marginRight:1},rD.default.createElement(Text,{color:G?"suggestion":void 0,wrap:"truncate-end"},G?et.pointer:" "," ",U.label)),rD.default.createElement(Text,{color:G?"suggestion":void 0,wrap:"truncate-end"},U.value))}),t[30]=d,t[31]=T,t[32]=D;else D=t[32];let N;if(t[33]!==o||t[34]!==r)N=(r||o)&&rD.default.createElement(Ryo,null),t[33]=o,t[34]=r,t[35]=N;else N=t[35];let O;if(t[36]!==P||t[37]!==D||t[38]!==N)O=rD.default.createElement(Box,{flexDirection:"column",ref:m,tabIndex:0,autoFocus:!0,onKeyDown:P},D,N),t[36]=P,t[37]=D,t[38]=N,t[39]=O;else O=t[39];let $;if(t[40]!==u||t[41]!==O)$=rD.default.createElement(Kn,{title:"Notifications",onCancel:u,hideBorder:!0,inputGuide:L},O),t[40]=u,t[41]=O,t[42]=$;else $=t[42];return $}
function _8p(e){return Math.max(0,e-1)}
function Ryo(){let e=vyo.c(1);if(rD.useSyncExternalStore(sil,oil,y8p)?.has_active_channel!==!1)return null;let n;if(e[0]===Symbol.for("react.memo_cache_sentinel"))n=rD.default.createElement(Text,{color:"warning",wrap:"truncate-end"},"  ",uEt," No mobile registered \xB7"," ",rD.default.createElement(Link,{url:"https://claude.com/download#mobile"},"get the app")," and turn on notif"),e[0]=n;else n=e[0];return n}
function y8p(){}
var vyo,rD,mje;
var xyo=b(()=>{Ai();sl();Tie();gAe();ze();Ts();s6t();readRoster();zs();Li();rs();vyo=M(rt(),1),rD=M(Te(),1),mje=["auto","iterm2","terminal_bell","iterm2_with_bell","kitty","ghostty","notifications_disabled"]});
export {wyo,uil,_8p,Ryo,y8p,vyo,rD,mje,xyo};
