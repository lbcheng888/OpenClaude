// @ts-nocheck
import {formatDuration,ps} from "./m238.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function p9e(e){let t=Gia.c(10),{elapsedTimeSeconds:n,timeoutMs:r}=e;if(n===void 0&&!r)return null;let o;if(t[0]!==r)o=r?formatDuration(r,{hideTrailingZeros:!0}):void 0,t[0]=r,t[1]=o;else o=t[1];let s=o;if(n===void 0){let d=`(timeout ${s})`,p;if(t[2]!==d)p=u0n.default.createElement(Text,{dimColor:!0},d),t[2]=d,t[3]=p;else p=t[3];return p}let i=n*1000,a;if(t[4]!==i)a=formatDuration(i),t[4]=i,t[5]=a;else a=t[5];let l=a;if(s){let d=`(${l} \xB7 timeout ${s})`,p;if(t[6]!==d)p=u0n.default.createElement(Text,{dimColor:!0},d),t[6]=d,t[7]=p;else p=t[7];return p}let c=`(${l})`,u;if(t[8]!==c)u=u0n.default.createElement(Text,{dimColor:!0},c),t[8]=c,t[9]=u;else u=t[9];return u}
var Gia,u0n;
var d0n=b(()=>{ze();ps();Gia=M(rt(),1),u0n=M(Te(),1)});
export {p9e,Gia,u0n,d0n};
