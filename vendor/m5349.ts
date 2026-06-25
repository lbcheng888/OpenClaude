// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {xke,Ike,aee} from "../src/config/2739_repl.ts";
import {QZn,VNo} from "./m5340.ts";
import {ev,D4} from "../src/session/2737_V4i.ts";
import {k6e,V9n} from "./m4002.ts";
import {Text} from "./m2433.ts";
import {Ne} from "./m583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {f1} from "./m4432.ts";
import {Ir} from "./m584.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function z7l(e){let t=K7l.c(13),{tokenUsage:n,model:r}=e,o=_t(v1m),s;if(t[0]!==o||t[1]!==r||t[2]!==n)s=xke(n,r,o),t[0]=o,t[1]=r,t[2]=n,t[3]=s;else s=t[3];let i=s,a=QZn();if(i.level==="ok"||a)return null;let l=i.pctLeft,c=ev(),u;if(t[4]===Symbol.for("react.memo_cache_sentinel"))u=k6e("warning"),t[4]=u;else u=t[4];let d=u,p=l,m=!D4()&&!Ike(r,o),f=!1;if(m||f){let T=aee(r,o),y;if(t[5]!==T||t[6]!==n)y=Math.round((T-n)/T*100),t[5]=T,t[6]=n,t[7]=y;else y=t[7];p=Math.max(0,y)}let h=m?`${100-p}% context used`:`${p}% until auto-compact`;if(c){let T=d?`${h} \xB7 ${d}`:h,y;if(t[9]!==T)y=QNo.jsx(Text,{dimColor:!0,wrap:"truncate",children:T}),t[9]=T,t[10]=y;else y=t[10];return y}let g=d?`Context low (${l}% remaining) \xB7 ${d}`:Ne.DISABLE_COMPACT?`Context low (${l}% remaining)`:`Context low (${l}% remaining) \xB7 Run /compact to compact & continue`,_;if(t[11]!==g)_=QNo.jsx(Text,{color:"error",wrap:"truncate",children:g}),t[11]=g,t[12]=_;else _=t[12];return _}
function v1m(e){return e.autoCompactWindow}
var K7l,R1m,QNo;
var j7l=b(()=>{je();f1();VNo();uo();Ir();V9n();K7l=x(tt(),1),R1m=x(et(),1),QNo=x(oe(),1)});
export {z7l,v1m,K7l,R1m,QNo,j7l};
