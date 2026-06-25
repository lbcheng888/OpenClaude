// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
var YGc=(e,t)=>rr.isAsyncFn(e)?function(...n){let r=n.pop();e.apply(this,n).then((o)=>{try{t?r(null,...t(o)):r(null,o)}catch(s){r(s)}},r)}:e,zZo;
var jZo=b(()=>{oC();zZo=YGc});
export {YGc,zZo,jZo};
