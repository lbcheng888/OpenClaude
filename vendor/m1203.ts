// @ts-nocheck
import {b} from "../runtime.ts";
var uCr;
var UHs=b(()=>{uCr=class uCr{options;constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.serializer(e)}}});
export {uCr,UHs};
