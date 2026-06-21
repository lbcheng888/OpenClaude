// @ts-nocheck
import {btn} from "./m669.ts";
import {Mfr} from "./m674.ts";
import {vtn} from "./m673.ts";
import {b,M} from "../runtime.ts";
import {BZo} from "./m675.ts";
import {UZo} from "./m676.ts";
var Rtn,$Zo,qZo,jZo=(e)=>{if(e!==void 0)throw TypeError("The `input` and `inputFile` options cannot be both set.")},rJc=({input:e,inputFile:t})=>{if(typeof t!=="string")return e;return jZo(e),Rtn.readFileSync(t)},WZo=(e)=>{let t=rJc(e);if(btn(t))throw TypeError("The `input` option cannot be a stream in sync mode");return t},oJc=({input:e,inputFile:t})=>{if(typeof t!=="string")return e;return jZo(e),Rtn.createReadStream(t)},GZo=(e,t)=>{let n=oJc(t);if(n===void 0)return;if(btn(n))n.pipe(e.stdin);else e.stdin.end(n)},VZo=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let n=qZo.default();if(e.stdout)n.add(e.stdout);if(e.stderr)n.add(e.stderr);return n},Nfr=async(e,t)=>{if(!e||t===void 0)return;await $Zo.setTimeout(0),e.destroy();try{return await t}catch(n){return n.bufferedData}},Bfr=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(!e||!n)return;if(t==="utf8"||t==="utf-8")return Mfr(e,{maxBuffer:r});if(t===null||t==="buffer")return vtn(e,{maxBuffer:r});return sJc(e,r,t)},sJc=async(e,t,n)=>(await vtn(e,{maxBuffer:t})).toString(n),KZo=async({stdout:e,stderr:t,all:n},{encoding:r,buffer:o,maxBuffer:s},i)=>{let a=Bfr(e,{encoding:r,buffer:o,maxBuffer:s}),l=Bfr(t,{encoding:r,buffer:o,maxBuffer:s}),c=Bfr(n,{encoding:r,buffer:o,maxBuffer:s*2});try{return await Promise.all([i,a,l,c])}catch(u){return Promise.all([{error:u,signal:u.signal,timedOut:u.timedOut},Nfr(e,a),Nfr(t,l),Nfr(n,c)])}};
var zZo=b(()=>{BZo();Rtn=require("fs"),$Zo=require("timers/promises"),qZo=M(UZo(),1)});
export {Rtn,$Zo,qZo,jZo,rJc,WZo,oJc,GZo,VZo,Nfr,Bfr,sJc,KZo,zZo};
