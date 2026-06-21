// @ts-nocheck
import {b} from "../runtime.ts";
var Tkr;
var Hjs=b(()=>{Tkr=class Tkr{constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.serializer(e)}}});
export {Tkr,Hjs};
