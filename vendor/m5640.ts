// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {ay,E$} from "./m2821.ts";
import {useInterval} from "./m2456.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {mn} from "../src/telemetry/0600_feature_name.ts";
import {K$t} from "./m3840.ts";
import {Xo} from "./m240.ts";
import {vxo} from "./m5077.ts";
import {mg} from "./m2209.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Muc(){let e=Luc.c(13),{addNotification:t}=Ci(),n=Byt.useRef(null),r=Byt.useRef(!1),o=ay(),s;e:s=null;let i=s,a;e:a=null;let l=a,c;if(e[3]===Symbol.for("react.memo_cache_sentinel"))c=()=>{n.current=null},e[3]=c;else c=e[3];let u;if(e[4]===Symbol.for("react.memo_cache_sentinel"))u=[i?.intervalMs],e[4]=u;else u=e[4];Byt.useEffect(c,u);let d;if(e[5]!==t)d=(g,_)=>!1,e[5]=t,e[6]=d;else d=e[6];let p=d,m;if(e[7]!==p)m=()=>{},e[7]=p,e[8]=m;else m=e[8];let f;if(e[9]===Symbol.for("react.memo_cache_sentinel"))f=[l?.start,l?.end],e[9]=f;else f=e[9];Byt.useEffect(m,f);let h;if(e[10]!==t||e[11]!==p)h=()=>{},e[10]=t,e[11]=p,e[12]=h;else h=e[12];useInterval(h,i||l?tVm:null)}
var Luc,Byt,Nuc,tVm=60000;
var Fuc=b(()=>{fd();E$();je();mn();K$t();Xo();vxo();mg();Luc=x(tt(),1),Byt=x(et(),1),Nuc=x(oe(),1)});
export {Muc,Luc,Byt,Nuc,tVm,Fuc};
