// @ts-nocheck
import {b} from "../runtime.ts";
var Bkr;
var OLs=b(()=>{Bkr=class Bkr{options;constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.serializer(e)}}});
export {Bkr,OLs};
