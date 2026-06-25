// @ts-nocheck
import {b} from "../runtime.ts";
var jDr;
var C7s=b(()=>{jDr=class jDr{constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.messageStream)yield this.options.encoder.encode(e);if(this.options.includeEndFrame)yield new Uint8Array(0)}}});
export {jDr,C7s};
