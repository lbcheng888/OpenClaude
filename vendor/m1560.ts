// @ts-nocheck
import {b} from "../runtime.ts";
var wjs=()=>{};
var gkr;
var Rjs=b(()=>{gkr=class gkr{constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.decoder.decode(e)}}});
export {wjs,gkr,Rjs};
