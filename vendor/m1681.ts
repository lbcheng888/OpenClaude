// @ts-nocheck
import {gHr} from "./m1649.ts";
import {b} from "../runtime.ts";
import {DQ} from "./m1662.ts";
function oGs(e="x-ms-client-request-id"){return{name:"setClientRequestIdPolicy",async sendRequest(t,n){if(!t.headers.has(e))t.headers.set(e,t.requestId);return n(t)}}}
function sGs(e){return gHr(e)}
var iGs=b(()=>{DQ()});
export {oGs,sGs,iGs};
