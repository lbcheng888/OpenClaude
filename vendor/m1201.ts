// @ts-nocheck
import {b} from "../runtime.ts";
var lCr;
var BHs=b(()=>{lCr=class lCr{options;constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.messageStream)yield this.options.encoder.encode(e);if(this.options.includeEndFrame)yield new Uint8Array(0)}}});
export {lCr,BHs};
