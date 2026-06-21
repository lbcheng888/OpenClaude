// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {tbn,Ld} from "./m2459.ts";
import {PCl,d8t} from "./m4897.ts";
import {iHi,Jbn} from "./m2518.ts";
import {Bll,Q8n} from "./m4565.ts";
import {AppStateProvider,Jq} from "./m3354.ts";
import {Xye,bAt} from "./m5237.ts";
import {R9l,$Do} from "./m5265.ts";
import {E9l,BDo} from "./m5264.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var qDo={};
isFullscreenWithTTY(qDo,{App:()=>tRm});
function tRm(e){let t=x9l.c(11),{getFpsMetrics:n,stats:r,initialState:o,children:s}=e,i;if(t[0]!==s)i=BPe.default.createElement(tbn,null,BPe.default.createElement(PCl,null,BPe.default.createElement(iHi,null,BPe.default.createElement(Bll,null,s)))),t[0]=s,t[1]=i;else i=t[1];let a;if(t[2]!==o||t[3]!==i)a=BPe.default.createElement(AppStateProvider,{initialState:o,onChangeAppState:Xye},i),t[2]=o,t[3]=i,t[4]=a;else a=t[4];let l;if(t[5]!==r||t[6]!==a)l=BPe.default.createElement(R9l,{store:r},a),t[5]=r,t[6]=a,t[7]=l;else l=t[7];let c;if(t[8]!==n||t[9]!==l)c=BPe.default.createElement(E9l,{getFpsMetrics:n},l),t[8]=n,t[9]=l,t[10]=c;else c=t[10];return c}
var x9l,BPe;
var jDo=b(()=>{d8t();BDo();Jbn();Ld();$Do();Jq();bAt();Q8n();x9l=M(rt(),1),BPe=M(Te(),1)});
export {qDo,tRm,x9l,BPe,jDo};
