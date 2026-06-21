// @ts-nocheck
import {b} from "../runtime.ts";
var ykr;
var kjs=b(()=>{ykr=class ykr{constructor(e){this.options=e}[Symbol.asyncIterator](){return this.asyncIterator()}async*asyncIterator(){for await(let e of this.options.messageStream){let t=await this.options.deserializer(e);if(t===void 0)continue;yield t}}}});
export {ykr,kjs};
