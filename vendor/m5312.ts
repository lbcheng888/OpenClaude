// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {KRe,VRe,cee} from "../src/config/2727_repl.ts";
import {jYn,_Po} from "./m5303.ts";
import {Yw,mq} from "../src/session/2725_iFi.ts";
import {Z4e,gUn} from "./m3940.ts";
import {Text} from "./m2423.ts";
import {je} from "./m577.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {nN} from "./m4410.ts";
import {Lr} from "./m578.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function F4l(e){let t=B4l.c(13),{tokenUsage:n,model:r}=e,o=mt(Xxm),s;if(t[0]!==o||t[1]!==r||t[2]!==n)s=KRe(n,r,o),t[0]=o,t[1]=r,t[2]=n,t[3]=s;else s=t[3];let i=s,a=jYn();if(i.level==="ok"||a)return null;let l=i.pctLeft,c=Yw(),u;if(t[4]===Symbol.for("react.memo_cache_sentinel"))u=Z4e("warning"),t[4]=u;else u=t[4];let d=u,p=l,m=!mq()&&!VRe(r,o),f=!1;if(m||f){let _=cee(r,o),y;if(t[5]!==_||t[6]!==n)y=Math.round((_-n)/_*100),t[5]=_,t[6]=n,t[7]=y;else y=t[7];p=Math.max(0,y)}let A=m?`${100-p}% context used`:`${p}% until auto-compact`;if(c){let _=d?`${A} \xB7 ${d}`:A,y;if(t[9]!==_)y=tGt.createElement(Text,{dimColor:!0,wrap:"truncate"},_),t[9]=_,t[10]=y;else y=t[10];return y}let h=d?`Context low (${l}% remaining) \xB7 ${d}`:je.DISABLE_COMPACT?`Context low (${l}% remaining)`:`Context low (${l}% remaining) \xB7 Run /compact to compact & continue`,g;if(t[11]!==h)g=tGt.createElement(Text,{color:"error",wrap:"truncate"},h),t[11]=h,t[12]=g;else g=t[12];return g}
function Xxm(e){return e.autoCompactWindow}
var B4l,tGt,Jxm;
var U4l=b(()=>{ze();nN();_Po();configProtoStore();Lr();gUn();B4l=M(rt(),1),tGt=M(Te(),1),Jxm=M(Te(),1)});
export {F4l,Xxm,B4l,tGt,Jxm,U4l};
