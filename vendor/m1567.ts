// @ts-nocheck
import {b} from "../runtime.ts";
var YDr;
var A7s=b(()=>{YDr=class YDr{constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.messageStream){let t=await this.options.deserializer(e);if(t===void 0)continue;yield t}}}});
export {YDr,A7s};
