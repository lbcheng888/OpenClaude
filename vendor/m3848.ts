// @ts-nocheck
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {sn,mc} from "./m237.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function X$t(e,t,n){let r=e==="requesting"?50:200,[o,s]=useAnimationFrame(n?null:r),i=d1a.useMemo(()=>sn(t),[t]);if(n)return[o,-100];let a=Math.floor(s/r),l=i+20;if(e==="requesting")return[o,a%l-10];return[o,i+10-a%l]}
var d1a;
var R2n=b(()=>{mc();je();d1a=x(et(),1)});
export {X$t,d1a,R2n};
