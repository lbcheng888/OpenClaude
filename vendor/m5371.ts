// @ts-nocheck
import {Nie,$0t} from "./m2534.ts";
import {useClock} from "./m2432.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {H4,Yfe} from "./m2265.ts";
import {bc,Ug} from "./m2264.ts";
import {No,lwe} from "./m2421.ts";
import {Z8,isFastModeEligible} from "../src/telemetry/2027_word.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function a8l(e,t){let n=Nie(),[r,o]=qJn.useState(!1),s=useClock(),[,i]=useAnimationFrame(r&&!n?s8l:null);if(qJn.useEffect(()=>{let u=i8l===!1&&e;if(i8l=e,!u||n)return;o(!0);let d=s.setTimeout(()=>o(!1),z0m);return()=>{d(),o(!1)}},[e,s,n]),!r||n||t<=0)return;let a=Math.floor(i/s8l),l=H4(bc("theme","dark").value),c=Array.from({length:t},(u,d)=>No(Z8(d+a),l)("\u2500")).join("");return[{content:c,position:"top",align:"start",offset:0},{content:c,position:"bottom",align:"start",offset:0}]}
var qJn,z0m=2500,s8l=150,i8l=null;
var l8l=b(()=>{$0t();ze();Ug();Yfe();isFastModeEligible();lwe();qJn=M(Te(),1)});
export {a8l,qJn,z0m,s8l,i8l,l8l};
