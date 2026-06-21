// @ts-nocheck
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {tn,Hc} from "./m235.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function bUt(e,t,n){let r=e==="requesting"?50:200,[o,s]=useAnimationFrame(n?null:r),i=$Ha.useMemo(()=>tn(t),[t]);if(n)return[o,-100];let a=Math.floor(s/r),l=i+20;if(e==="requesting")return[o,a%l-10];return[o,i+10-a%l]}
var $Ha;
var IBn=b(()=>{Hc();ze();$Ha=M(Te(),1)});
export {bUt,$Ha,IBn};
