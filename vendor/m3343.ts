// @ts-nocheck
import {Cst,eua,wXr} from "./m3342.ts";
import {Or,Ts} from "./m2542.ts";
import {Tm,Fk} from "./m3341.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {ac,e_} from "./m3338.ts";
import {Uy,zq} from "./m3339.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function fDn(e){let t=tua.c(20),{settings:n,onAccept:r,onReject:o}=e,s=Cst(n),i=eua(s),a;if(t[0]===Symbol.for("react.memo_cache_sentinel"))a={context:"Confirmation"},t[0]=a;else a=t[0];Or("confirm:no",o,a);let l=Tm,c="warning",u="warning",d="Managed settings require approval",p=Box,m="column",f=1,A=1,h;if(t[1]===Symbol.for("react.memo_cache_sentinel"))h=JETBRAINS_IDE_NAMES.default.createElement(Text,null,"Your organization has configured managed settings that could allow execution of arbitrary code or interception of your prompts and responses."),t[1]=h;else h=t[1];let g=Box,_="column",y;if(t[2]===Symbol.for("react.memo_cache_sentinel"))y=JETBRAINS_IDE_NAMES.default.createElement(Text,{dimColor:!0},"Settings requiring approval:"),t[2]=y;else y=t[2];let T=i.map(mGd),S;if(t[3]!==g||t[4]!==y||t[5]!==T)S=JETBRAINS_IDE_NAMES.default.createElement(g,{flexDirection:_},y,T),t[3]=g,t[4]=y,t[5]=T,t[6]=S;else S=t[6];let v;if(t[7]===Symbol.for("react.memo_cache_sentinel"))v=JETBRAINS_IDE_NAMES.default.createElement(Text,null,"Only accept if you trust your organization's IT administration and expect these settings to be configured."),t[7]=v;else v=t[7];let R;if(t[8]!==r||t[9]!==o)R=JETBRAINS_IDE_NAMES.default.createElement(ac,{confirmLabel:"Yes, I trust these settings",cancelLabel:"No, exit Claude Code",onConfirm:r,onCancel:o}),t[8]=r,t[9]=o,t[10]=R;else R=t[10];let k;if(t[11]===Symbol.for("react.memo_cache_sentinel"))k=JETBRAINS_IDE_NAMES.default.createElement(Uy,null,JETBRAINS_IDE_NAMES.default.createElement(Tn,null,JETBRAINS_IDE_NAMES.default.createElement(at,{chord:"enter",action:"confirm"}),JETBRAINS_IDE_NAMES.default.createElement(at,{chord:"escape",action:"exit"}))),t[11]=k;else k=t[11];let x;if(t[12]!==p||t[13]!==S||t[14]!==R||t[15]!==h)x=JETBRAINS_IDE_NAMES.default.createElement(p,{flexDirection:m,gap:f,paddingTop:A},h,S,v,R,k),t[12]=p,t[13]=S,t[14]=R,t[15]=h,t[16]=x;else x=t[16];let H;if(t[17]!==l||t[18]!==x)H=JETBRAINS_IDE_NAMES.default.createElement(l,{color:c,titleColor:u,title:d},x),t[17]=l,t[18]=x,t[19]=H;else H=t[19];return H}
function mGd(e,t){return JETBRAINS_IDE_NAMES.default.createElement(Box,{key:t,paddingLeft:2},JETBRAINS_IDE_NAMES.default.createElement(Text,null,JETBRAINS_IDE_NAMES.default.createElement(Text,{dimColor:!0},"\xB7 "),JETBRAINS_IDE_NAMES.default.createElement(Text,null,e)))}
var tua,JETBRAINS_IDE_NAMES;
var RXr=b(()=>{ze();Ts();zs();e_();zq();rs();Fk();wXr();tua=M(rt(),1),JETBRAINS_IDE_NAMES=M(Te(),1)});
export {fDn,mGd,tua,JETBRAINS_IDE_NAMES,RXr};
