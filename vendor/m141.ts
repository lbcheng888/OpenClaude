// @ts-nocheck
import {V2o,lSe} from "./m136.ts";
import {b} from "../runtime.ts";
function C_t(){}
function Szt(e,t,n){if(!t||bzt[e]>bzt[n])return C_t;else return t[e].bind(t)}
function serializeToolResult(e){let t=e.logger,n=e.logLevel??"off";if(!t)return fhc;let r=p$o.get(t);if(r&&r[0]===n)return r[1];let o={error:Szt("error",t,n),warn:Szt("warn",t,n),info:Szt("info",t,n),debug:Szt("debug",t,n)};return p$o.set(t,[n,o]),o}
var bzt,Prr=(e,t,n)=>{if(!e)return;if(V2o(bzt,e))return e;serializeToolResult(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(bzt))}`);return},fhc,p$o,Kde=(e)=>{if(e.options)e.options={...e.options},delete e.options.headers;if(e.headers)e.headers=Object.fromEntries((e.headers instanceof Headers?[...e.headers]:Object.entries(e.headers)).map(([t,n])=>[t,t.toLowerCase()==="x-api-key"||t.toLowerCase()==="authorization"||t.toLowerCase()==="cookie"||t.toLowerCase()==="set-cookie"?"***":n]));if("retryOfRequestLogID"in e){if(e.retryOfRequestLogID)e.retryOf=e.retryOfRequestLogID;delete e.retryOfRequestLogID}return e};
var v_t=b(()=>{lSe();bzt={off:0,error:200,warn:300,info:400,debug:500};fhc={error:C_t,warn:C_t,info:C_t,debug:C_t},p$o=new WeakMap});
export {C_t,Szt,serializeToolResult,bzt,Prr,fhc,p$o,Kde,v_t};
