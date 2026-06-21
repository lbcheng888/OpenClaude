// @ts-nocheck
import {MHr,Ipn} from "./m1658.ts";
import {GHr,VWs,KWs} from "./m1675.ts";
import {b} from "../runtime.ts";
import {DQ} from "./m1662.ts";
function zWs(){let e=MHr();return{name:VHr,sendRequest:async(t,n)=>{if(t.multipartBody){for(let r of t.multipartBody.parts)if(GHr(r.body))r.body=VWs(r.body)}return e.sendRequest(t,n)}}}
var VHr;
var YWs=b(()=>{DQ();KWs();VHr=Ipn});
export {zWs,VHr,YWs};
