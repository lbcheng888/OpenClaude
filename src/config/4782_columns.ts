// @ts-nocheck
import {mr,ki} from "../../vendor/m2453.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {aIe,jL} from "../../vendor/m3944.ts";
import {parseUserSpecifiedModel,renderModelSetting,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Fmt,H_l,FDe,Bjt} from "./4776_leftWidth.ts";
import {je} from "../../vendor/m577.ts";
import {truncate} from "../../vendor/m237.ts";
import {gQe,Om} from "./2215_level.ts";
import {getProTrialState,formatTrialBadge,$mt} from "../../vendor/m4779.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {Text} from "../../vendor/m2423.ts";
import {Ms,Pp} from "./2273_loggedTmuxCcDisable.ts";
import {rqe,jio} from "../../vendor/m3950.ts";
import {UY,r$t} from "../../vendor/m3949.ts";
import {Box} from "../../vendor/m2422.ts";
import {V_l,oGn} from "../tui/4781_status.ts";
import {bP,Vhe} from "../../vendor/m3282.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {ps} from "../../vendor/m238.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function z_l(){let e=K_l.c(40),{columns:t}=mr(),n=mt(Nem),r=mt(Mem),o=aIe(),s,i,a,l,c,u,d,p;if(e[0]!==n||e[1]!==t||e[2]!==r||e[3]!==o){let x=parseUserSpecifiedModel(o),H=renderModelSetting(o),{version:I,cwd:P,billingType:L,agentName:D}=Fmt();s=n??D,p=je.CLAUDE_CODE_TUI_JUST_SWITCHED!==void 0;let N=Math.max(t-15,20);d=truncate(I,Math.max(N-13,6));let O=gQe(x,r);l=null;let $=0;{let W,G;if(e[12]===Symbol.for("react.memo_cache_sentinel"))G=getProTrialState(),W=formatTrialBadge(G),e[12]=W,e[13]=G;else W=e[12],G=e[13];let V=W;if(V){let Q;if(e[14]===Symbol.for("react.memo_cache_sentinel"))Q=tn(` \xB7 ${V}`),e[14]=Q;else Q=e[14];$=Q;let K;if(e[15]===Symbol.for("react.memo_cache_sentinel"))K=Zu.createElement(Text,{dimColor:!0}," \xB7 "),e[15]=K;else K=e[15];let Y;if(e[16]===Symbol.for("react.memo_cache_sentinel"))Y=Zu.createElement(Text,null,K,Zu.createElement(Text,{color:G.status==="expired"?"suggestion":"warning"},V)),e[16]=Y;else Y=e[16];l=Y}}({shouldSplit:i,truncatedModel:u,truncatedBilling:c}=H_l(H+O,L,N-$));let U=s?N-1-tn(s)-3:N;a=FDe(P,Math.max(U,10)),e[0]=n,e[1]=t,e[2]=r,e[3]=o,e[4]=s,e[5]=i,e[6]=a,e[7]=l,e[8]=c,e[9]=u,e[10]=d,e[11]=p}else s=e[4],i=e[5],a=e[6],l=e[7],c=e[8],u=e[9],d=e[10],p=e[11];let m=a,f=s&&`@${s}`,A;if(e[17]!==f||e[18]!==m)A=[f,m].filter(Boolean),e[17]=f,e[18]=m,e[19]=A;else A=e[19];let h=A.join(" \xB7 "),g;if(e[20]===Symbol.for("react.memo_cache_sentinel"))g=sGn?Zu.createElement(sGn.Mascot,{fallback:Ms()?Zu.createElement(rqe,null):Zu.createElement(UY,null)}):Ms()?Zu.createElement(rqe,null):Zu.createElement(UY,null),e[20]=g;else g=e[20];let _;if(e[21]===Symbol.for("react.memo_cache_sentinel"))_=sGn?Zu.createElement(sGn.Title,null):Zu.createElement(Text,{bold:!0},"Claude Code"),e[21]=_;else _=e[21];let y;if(e[22]!==d)y=Zu.createElement(Text,null,_," ",Zu.createElement(Text,{dimColor:!0},"v",d)),e[22]=d,e[23]=y;else y=e[23];let T;if(e[24]!==i||e[25]!==l||e[26]!==c||e[27]!==u)T=i?Zu.createElement(Zu.Fragment,null,Zu.createElement(Text,{dimColor:!0},u),Zu.createElement(Text,null,Zu.createElement(Text,{dimColor:!0},c),l)):Zu.createElement(Text,null,Zu.createElement(Text,{dimColor:!0},u," \xB7 ",c),l),e[24]=i,e[25]=l,e[26]=c,e[27]=u,e[28]=T;else T=e[28];let S;if(e[29]!==h)S=h&&Zu.createElement(Text,{dimColor:!0},h),e[29]=h,e[30]=S;else S=e[30];let v;if(e[31]!==y||e[32]!==T||e[33]!==S)v=Zu.createElement(Box,{flexDirection:"row",gap:2,alignItems:"center"},g,Zu.createElement(Box,{flexDirection:"column"},y,T,S)),e[31]=y,e[32]=T,e[33]=S,e[34]=v;else v=e[34];let R;if(e[35]!==p)R=p&&Zu.createElement(Box,{paddingLeft:2,flexDirection:"column",marginTop:1},Zu.createElement(V_l,null)),e[35]=p,e[36]=R;else R=e[36];let k;if(e[37]!==v||e[38]!==R)k=Zu.createElement(bP,null,Zu.createElement(Box,{flexDirection:"column"},v,R)),e[37]=v,e[38]=R,e[39]=k;else k=e[39];return k}
function Mem(e){return e.effortValue}
function Nem(e){return e.agent}
var K_l,Zu,sGn=null;
var Y_l=b(()=>{jL();ki();Hc();ze();$mt();configProtoStore();Om();Lr();ps();Pp();Bjt();Mo();Vhe();jio();r$t();oGn();K_l=M(rt(),1),Zu=M(Te(),1)});
export {z_l,Mem,Nem,K_l,Zu,sGn,Y_l};
