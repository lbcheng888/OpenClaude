// @ts-nocheck
import {Lpn,qHr,LWs} from "./m1666.ts";
import {b} from "../runtime.ts";
function NWs(e={}){let t=Lpn(e.userAgentPrefix);return{name:_Nu,async sendRequest(n,r){if(!n.headers.has(MWs))n.headers.set(MWs,await t);return r(n)}}}
var MWs,_Nu="userAgentPolicy";
var BWs=b(()=>{qHr();MWs=LWs()});
export {NWs,MWs,_Nu,BWs};
