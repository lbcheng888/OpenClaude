// @ts-nocheck
import {toInfraSessionId} from "../src/core/2797_toInfraSessionId.ts";
import {b} from "../runtime.ts";
function z0n(e,t,n,r){if(!r)return{url:`${e}/v1/sessions/${t}/events`,body:{events:n}};let o=toInfraSessionId(t);return{url:`${e}/v1/code/sessions/${encodeURIComponent(o)}/events`,body:{events:n.map((s)=>({payload:typeof s.uuid==="string"&&s.uuid?s:{...s,uuid:ica.randomUUID()}}))}}}
var ica;
var jJr=b(()=>{ica=require("crypto")});
export {z0n,ica,jJr};
