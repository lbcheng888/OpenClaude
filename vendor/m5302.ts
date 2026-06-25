// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {qAn,fd} from "./m2469.ts";
import {Wxl,PGt} from "./m4927.ts";
import {vLi,NRn} from "./m2529.ts";
import {_gl,DKn} from "./m4593.ts";
import {AppStateProvider,pq} from "./m3370.ts";
import {wSe,U_t} from "./m5270.ts";
import {xVl,mNo} from "./m5301.ts";
import {vVl,uNo} from "./m5300.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var fNo={};
ft(fNo,{App:()=>ILm});
function ILm(e){let t=PVl.c(11),{getFpsMetrics:n,stats:r,initialState:o,children:s}=e,i;if(t[0]!==s)i=MOe.jsx(qAn,{children:MOe.jsx(Wxl,{children:MOe.jsx(vLi,{children:MOe.jsx(_gl,{children:s})})})}),t[0]=s,t[1]=i;else i=t[1];let a;if(t[2]!==o||t[3]!==i)a=MOe.jsx(AppStateProvider,{initialState:o,onChangeAppState:wSe,children:i}),t[2]=o,t[3]=i,t[4]=a;else a=t[4];let l;if(t[5]!==r||t[6]!==a)l=MOe.jsx(xVl,{store:r,children:a}),t[5]=r,t[6]=a,t[7]=l;else l=t[7];let c;if(t[8]!==n||t[9]!==l)c=MOe.jsx(vVl,{getFpsMetrics:n,children:l}),t[8]=n,t[9]=l,t[10]=c;else c=t[10];return c}
var PVl,MOe;
var hNo=b(()=>{PGt();uNo();NRn();fd();mNo();pq();U_t();DKn();PVl=x(tt(),1),MOe=x(oe(),1)});
export {fNo,ILm,PVl,MOe,hNo};
