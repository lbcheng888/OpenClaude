// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {b} from "../runtime.ts";
function Wac(e){if(e.length===0)return!0;try{return qt(e),!0}catch{return!1}}
function Gac(){if(iNo)return;iNo=!0;let e=new TextDecoder("utf-8");D5e=process.stdout.write.bind(process.stdout),process.stdout.write=function(t,n,r){let o=typeof t==="string"?t:e.decode(t,{stream:!0});nre+=o;let s,i=!0;while((s=nre.indexOf(`
`))!==-1){let l=nre.slice(0,s);if(nre=nre.slice(s+1),Wac(l))i=D5e(l+`
`);else process.stderr.write(`${jac} ${l}
`),logForDebugging(`streamJsonStdoutGuard diverted non-JSON stdout line: ${l.slice(0,200)}`)}let a=typeof n==="function"?n:r;if(a)queueMicrotask(()=>a());return i},Gi(async()=>{if(nre+=e.decode(),nre.length>0){if(D5e&&Wac(nre))D5e(nre+`
`);else process.stderr.write(`${jac} ${nre}
`);nre=""}if(D5e)process.stdout.write=D5e,D5e=null;iNo=!1})}
var jac="[stdout-guard]",iNo=!1,nre="",D5e=null;
var Vac=b(()=>{ReactHooks();qe();Xt()});
export {Wac,Gac,jac,iNo,nre,D5e,Vac};
