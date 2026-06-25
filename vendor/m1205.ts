// @ts-nocheck
import {b} from "../runtime.ts";
var ILs=()=>{};
var Mkr;
var xLs=b(()=>{Mkr=class Mkr{options;constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.inputStream)yield this.options.decoder.decode(e)}}});
export {ILs,Mkr,xLs};
