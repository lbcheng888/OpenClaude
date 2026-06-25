// @ts-nocheck
import {b} from "../runtime.ts";
import {YH} from "./m137.ts";
function Czs(e){if(e[Symbol.asyncIterator])return e;let t=e.getReader();return{async next(){try{let n=await t.read();if(n?.done)t.releaseLock();return n}catch(n){throw t.releaseLock(),n}},async return(){let n=t.cancel();return t.releaseLock(),await n,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}
var qfn=b(()=>{YH()});
export {Czs,qfn};
