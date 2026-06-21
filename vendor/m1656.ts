// @ts-nocheck
import {IQ,vpn} from "./m1643.ts";
import {lse,Wwt} from "./m1640.ts";
import {b} from "../runtime.ts";
function LHr(e={}){var t;let n=(t=e.logger)!==null&&t!==void 0?t:IQ.info,r=new lse({additionalAllowedHeaderNames:e.additionalAllowedHeaderNames,additionalAllowedQueryParameters:e.additionalAllowedQueryParameters});return{name:OHr,async sendRequest(o,s){if(!n.enabled)return s(o);n(`Request: ${r.sanitize(o)}`);let i=await s(o);return n(`Response status code: ${i.status}`),n(`Headers: ${r.sanitize(i.headers)}`),i}}}
var OHr="logPolicy";
var oWs=b(()=>{vpn();Wwt()});
export {LHr,OHr,oWs};
