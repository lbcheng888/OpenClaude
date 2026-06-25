// @ts-nocheck
import {b} from "../runtime.ts";
var JDr;
var R7s=b(()=>{JDr=class JDr{constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.serializer(e)}}});
export {JDr,R7s};
