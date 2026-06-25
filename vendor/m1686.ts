// @ts-nocheck
import {zPr} from "./m1654.ts";
import {b} from "../runtime.ts";
import {kQ} from "./m1667.ts";
function ZYs(e="x-ms-client-request-id"){return{name:"setClientRequestIdPolicy",async sendRequest(t,n){if(!t.headers.has(e))t.headers.set(e,t.requestId);return n(t)}}}
function eJs(e){return zPr(e)}
var tJs=b(()=>{kQ()});
export {ZYs,eJs,tJs};
