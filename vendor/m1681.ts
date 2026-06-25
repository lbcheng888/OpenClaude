// @ts-nocheck
import {pOr,mhn} from "./m1663.ts";
import {bOr,$Ys,qYs} from "./m1680.ts";
import {b} from "../runtime.ts";
import {kQ} from "./m1667.ts";
function WYs(){let e=pOr();return{name:EOr,sendRequest:async(t,n)=>{if(t.multipartBody){for(let r of t.multipartBody.parts)if(bOr(r.body))r.body=$Ys(r.body)}return e.sendRequest(t,n)}}}
var EOr;
var GYs=b(()=>{kQ();qYs();EOr=mhn});
export {WYs,EOr,GYs};
