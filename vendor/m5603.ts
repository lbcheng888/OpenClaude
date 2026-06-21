// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {sy,e9} from "./m2808.ts";
import {useInterval} from "./m2446.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ln} from "../src/telemetry/0594_feature_name.ts";
import {gUt} from "./m3822.ts";
import {ps} from "./m238.ts";
import {_Ro} from "./m5047.ts";
import {Ug} from "./m2264.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Xtc(){let e=Jtc.c(13),{addNotification:t}=Ui(),n=ght.useRef(null),r=ght.useRef(!1),o=sy(),s;e:s=null;let i=s,a;e:a=null;let l=a,c;if(e[3]===Symbol.for("react.memo_cache_sentinel"))c=()=>{n.current=null},e[3]=c;else c=e[3];let u;if(e[4]===Symbol.for("react.memo_cache_sentinel"))u=[i?.intervalMs],e[4]=u;else u=e[4];ght.useEffect(c,u);let d;if(e[5]!==t)d=(h,g)=>!1,e[5]=t,e[6]=d;else d=e[6];let p=d,m;if(e[7]!==p)m=()=>{},e[7]=p,e[8]=m;else m=e[8];let f;if(e[9]===Symbol.for("react.memo_cache_sentinel"))f=[l?.start,l?.end],e[9]=f;else f=e[9];ght.useEffect(m,f);let A;if(e[10]!==t||e[11]!==p)A=()=>{},e[10]=t,e[11]=p,e[12]=A;else A=e[12];useInterval(A,i||l?k$m:null)}
var Jtc,x$m,ght,k$m=60000;
var Qtc=b(()=>{Ld();e9();ze();ln();gUt();ps();_Ro();Ug();Jtc=M(rt(),1),x$m=M(Te(),1),ght=M(Te(),1)});
export {Xtc,Jtc,x$m,ght,k$m,Qtc};
