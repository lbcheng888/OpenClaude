// @ts-nocheck
import {b} from "../runtime.ts";
var MHs=()=>{};
var aCr;
var NHs=b(()=>{aCr=class aCr{options;constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.decoder.decode(e)}}});
export {MHs,aCr,NHs};
