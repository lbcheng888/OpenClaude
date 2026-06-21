// @ts-nocheck
import {b} from "../runtime.ts";
import {SH} from "./m135.ts";
function x8s(e){if(e[Symbol.asyncIterator])return e;let t=e.getReader();return{async next(){try{let n=await t.read();if(n?.done)t.releaseLock();return n}catch(n){throw t.releaseLock(),n}},async return(){let n=t.cancel();return t.releaseLock(),await n,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}
var ipn=b(()=>{SH()});
export {x8s,ipn};
