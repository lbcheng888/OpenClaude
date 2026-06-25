// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Si,ud} from "./m134.ts";
import {b} from "../runtime.ts";
function Z_c(e){if(e.length===0)return!0;try{return qt(e),!0}catch{return!1}}
function eyc(){if(J$o)return;J$o=!0;let e=new TextDecoder("utf-8");SVe=process.stdout.write.bind(process.stdout),process.stdout.write=function(t,n,r){let o=typeof t==="string"?t:e.decode(t,{stream:!0});Zne+=o;let s,i=!0;while((s=Zne.indexOf(`
`))!==-1){let l=Zne.slice(0,s);if(Zne=Zne.slice(s+1),Z_c(l))i=SVe(l+`
`);else process.stderr.write(`${Q_c} ${l}
`),logForDebugging(`streamJsonStdoutGuard diverted non-JSON stdout line: ${l.slice(0,200)}`)}let a=typeof n==="function"?n:r;if(a)queueMicrotask(()=>a());return i},Si(async()=>{if(Zne+=e.decode(),Zne.length>0){if(SVe&&Z_c(Zne))SVe(Zne+`
`);else process.stderr.write(`${Q_c} ${Zne}
`);Zne=""}if(SVe)process.stdout.write=SVe,SVe=null;J$o=!1})}
var Q_c="[stdout-guard]",J$o=!1,Zne="",SVe=null;
var tyc=b(()=>{ud();qe();tn()});
export {Z_c,eyc,Q_c,J$o,Zne,SVe,tyc};
