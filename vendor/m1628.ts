// @ts-nocheck
import {XYe,h5s} from "./m1627.ts";
import {b} from "../runtime.ts";
function _5s(e,t){t.log=(...n)=>{e.log(...n)}}
function y5s(e){return nHr.includes(e)}
function gpn(e){let t=new Set,n=typeof process<"u"&&process.env&&process.env[e.logLevelEnvVarName]||void 0,r,o=XYe(e.namespace);o.log=(...u)=>{XYe.log(...u)};function s(u){if(u&&!y5s(u))throw Error(`Unknown log level '${u}'. Acceptable values: ${nHr.join(",")}`);r=u;let d=[];for(let p of t)if(i(p))d.push(p.namespace);XYe.enable(d.join(","))}if(n)if(y5s(n))s(n);else console.error(`${e.logLevelEnvVarName} set to unknown log level '${n}'; logging is not enabled. Acceptable values: ${nHr.join(", ")}.`);function i(u){return Boolean(r&&g5s[u.level]<=g5s[r])}function a(u,d){let p=Object.assign(u.extend(d),{level:d});if(_5s(u,p),i(p)){let m=XYe.disable();XYe.enable(m+","+p.namespace)}return t.add(p),p}function l(){return r}function c(u){let d=o.extend(u);return _5s(o,d),{error:a(d,"error"),warning:a(d,"warning"),info:a(d,"info"),verbose:a(d,"verbose")}}return{setLogLevel:s,getLogLevel:l,createClientLogger:c,logger:o}}
function _pn(e){return T5s.createClientLogger(e)}
var nHr,g5s,T5s,BwA;
var ypn=b(()=>{h5s();nHr=["verbose","info","warning","error"],g5s={verbose:400,info:300,warning:200,error:100};T5s=gpn({logLevelEnvVarName:"TYPESPEC_RUNTIME_LOG_LEVEL",namespace:"typeSpecRuntime"}),BwA=T5s.logger});
export {_5s,y5s,gpn,_pn,nHr,g5s,T5s,BwA,ypn};
