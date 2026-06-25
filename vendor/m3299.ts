// @ts-nocheck
import {formatDuration,Xo} from "./m240.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function C3e(e){let t=Qma.c(10),{elapsedTimeSeconds:n,timeoutMs:r}=e;if(n===void 0&&!r)return null;let o;if(t[0]!==r)o=r?formatDuration(r,{hideTrailingZeros:!0}):void 0,t[0]=r,t[1]=o;else o=t[1];let s=o;if(n===void 0){let d=`(timeout ${s})`,p;if(t[2]!==d)p=tOn.jsx(Text,{dimColor:!0,children:d}),t[2]=d,t[3]=p;else p=t[3];return p}let i=n*1000,a;if(t[4]!==i)a=formatDuration(i),t[4]=i,t[5]=a;else a=t[5];let l=a;if(s){let d=`(${l} \xB7 timeout ${s})`,p;if(t[6]!==d)p=tOn.jsx(Text,{dimColor:!0,children:d}),t[6]=d,t[7]=p;else p=t[7];return p}let c=`(${l})`,u;if(t[8]!==c)u=tOn.jsx(Text,{dimColor:!0,children:c}),t[8]=c,t[9]=u;else u=t[9];return u}
var Qma,tOn;
var nOn=b(()=>{je();Xo();Qma=x(tt(),1),tOn=x(oe(),1)});
export {C3e,Qma,tOn,nOn};
