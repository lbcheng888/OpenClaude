// @ts-nocheck
import {MWt,oPo} from "./m5286.ts";
import {b} from "../runtime.ts";
function Bac(e,t={},n,r){let o=new Nac.URL(e.href);if(o.protocol==="wss:")o.protocol="https:";else if(o.protocol==="ws:")o.protocol="http:";return o.pathname=o.pathname.replace(/\/$/,"")+"/worker/events/stream",new MWt(o,t,n,r)}
var Nac;
var Fac=b(()=>{oPo();Nac=require("url")});
export {Bac,Nac,Fac};
