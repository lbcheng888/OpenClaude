// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
var q2c=(e,t)=>er.isAsyncFn(e)?function(...n){let r=n.pop();e.apply(this,n).then((o)=>{try{t?r(null,...t(o)):r(null,o)}catch(s){r(s)}},r)}:e,JKo;
var XKo=b(()=>{ZE();JKo=q2c});
export {q2c,JKo,XKo};
