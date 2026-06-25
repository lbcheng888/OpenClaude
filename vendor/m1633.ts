// @ts-nocheck
import {YXe,djs} from "./m1632.ts";
import {b} from "../runtime.ts";
function mjs(e,t){t.log=(...n)=>{e.log(...n)}}
function fjs(e){return DPr.includes(e)}
function Zfn(e){let t=new Set,n=typeof process<"u"&&process.env&&process.env[e.logLevelEnvVarName]||void 0,r,o=YXe(e.namespace);o.log=(...u)=>{YXe.log(...u)};function s(u){if(u&&!fjs(u))throw Error(`Unknown log level '${u}'. Acceptable values: ${DPr.join(",")}`);r=u;let d=[];for(let p of t)if(i(p))d.push(p.namespace);YXe.enable(d.join(","))}if(n)if(fjs(n))s(n);else console.error(`${e.logLevelEnvVarName} set to unknown log level '${n}'; logging is not enabled. Acceptable values: ${DPr.join(", ")}.`);function i(u){return Boolean(r&&pjs[u.level]<=pjs[r])}function a(u,d){let p=Object.assign(u.extend(d),{level:d});if(mjs(u,p),i(p)){let m=YXe.disable();YXe.enable(m+","+p.namespace)}return t.add(p),p}function l(){return r}function c(u){let d=o.extend(u);return mjs(o,d),{error:a(d,"error"),warning:a(d,"warning"),info:a(d,"info"),verbose:a(d,"verbose")}}return{setLogLevel:s,getLogLevel:l,createClientLogger:c,logger:o}}
function ehn(e){return hjs.createClientLogger(e)}
var DPr,pjs,hjs,iNh;
var thn=b(()=>{djs();DPr=["verbose","info","warning","error"],pjs={verbose:400,info:300,warning:200,error:100};hjs=Zfn({logLevelEnvVarName:"TYPESPEC_RUNTIME_LOG_LEVEL",namespace:"typeSpecRuntime"}),iNh=hjs.logger});
export {mjs,fjs,Zfn,ehn,DPr,pjs,hjs,iNh,thn};
