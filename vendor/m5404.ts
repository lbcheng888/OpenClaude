// @ts-nocheck
import {Die,yOt} from "./m2545.ts";
import {useClock} from "./m2442.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {X3,cZ} from "./m2273.ts";
import {lc,mg} from "./m2209.ts";
import {color,Kve} from "./m2431.ts";
import {f8,$M} from "../src/telemetry/2032_word.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function GYl(e,t){let n=Die(),[r,o]=qer.useState(!1),s=useClock(),[,i]=useAnimationFrame(r&&!n?qYl:null);if(qer.useEffect(()=>{let u=WYl===!1&&e;if(WYl=e,!u||n)return;o(!0);let d=s.setTimeout(()=>o(!1),nUm);return()=>{d(),o(!1)}},[e,s,n]),!r||n||t<=0)return;let a=Math.floor(i/qYl),l=X3(lc("theme","dark").value),c=Array.from({length:t},(u,d)=>color(f8(d+a),l)("\u2500")).join("");return[{content:c,position:"top",align:"start",offset:0},{content:c,position:"bottom",align:"start",offset:0}]}
var qer,nUm=2500,qYl=150,WYl=null;
var VYl=b(()=>{yOt();je();mg();cZ();$M();Kve();qer=x(et(),1)});
export {GYl,qer,nUm,qYl,WYl,VYl};
