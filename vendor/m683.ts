// @ts-nocheck
import {ron} from "./m675.ts";
import {dTr} from "./m680.ts";
import {ion} from "./m679.ts";
import {b,x} from "../runtime.ts";
import {Lss} from "./m681.ts";
import {Nss} from "./m682.ts";
var lon,Fss,Bss,Uss=(e)=>{if(e!==void 0)throw TypeError("The `input` and `inputFile` options cannot be both set.")},Siu=({input:e,inputFile:t})=>{if(typeof t!=="string")return e;return Uss(e),lon.readFileSync(t)},$ss=(e)=>{let t=Siu(e);if(ron(t))throw TypeError("The `input` option cannot be a stream in sync mode");return t},biu=({input:e,inputFile:t})=>{if(typeof t!=="string")return e;return Uss(e),lon.createReadStream(t)},qss=(e,t)=>{let n=biu(t);if(n===void 0)return;if(ron(n))n.pipe(e.stdin);else e.stdin.end(n)},Wss=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let n=Bss.default();if(e.stdout)n.add(e.stdout);if(e.stderr)n.add(e.stderr);return n},pTr=async(e,t)=>{if(!e||t===void 0)return;await Fss.setTimeout(0),e.destroy();try{return await t}catch(n){return n.bufferedData}},mTr=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(!e||!n)return;if(t==="utf8"||t==="utf-8")return dTr(e,{maxBuffer:r});if(t===null||t==="buffer")return ion(e,{maxBuffer:r});return Eiu(e,r,t)},Eiu=async(e,t,n)=>(await ion(e,{maxBuffer:t})).toString(n),Gss=async({stdout:e,stderr:t,all:n},{encoding:r,buffer:o,maxBuffer:s},i)=>{let a=mTr(e,{encoding:r,buffer:o,maxBuffer:s}),l=mTr(t,{encoding:r,buffer:o,maxBuffer:s}),c=mTr(n,{encoding:r,buffer:o,maxBuffer:s*2});try{return await Promise.all([i,a,l,c])}catch(u){return Promise.all([{error:u,signal:u.signal,timedOut:u.timedOut},pTr(e,a),pTr(t,l),pTr(n,c)])}};
var Vss=b(()=>{Lss();lon=require("fs"),Fss=require("timers/promises"),Bss=x(Nss(),1)});
export {lon,Fss,Bss,Uss,Siu,$ss,biu,qss,Wss,pTr,mTr,Eiu,Gss,Vss};
