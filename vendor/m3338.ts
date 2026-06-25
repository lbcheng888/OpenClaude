// @ts-nocheck
import {toInfraSessionId} from "../src/core/2809_toInfraSessionId.ts";
import {b} from "../runtime.ts";
function BOn(e,t,n,r){if(!r)return{url:`${e}/v1/sessions/${t}/events`,body:{events:n}};let o=toInfraSessionId(t);return{url:`${e}/v1/code/sessions/${encodeURIComponent(o)}/events`,body:{events:n.map((s)=>({payload:typeof s.uuid==="string"&&s.uuid?s:{...s,uuid:gga.randomUUID()}}))}}}
var gga;
var Rto=b(()=>{gga=require("crypto")});
export {BOn,gga,Rto};
