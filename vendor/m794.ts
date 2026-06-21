// @ts-nocheck
import {X} from "../runtime.ts";
import {XEt} from "./m790.ts";
import {Fbe} from "./m792.ts";
import {gis} from "./m793.ts";
var _is=X((drn)=>{Object.defineProperty(drn,"__esModule",{value:!0});drn.createChecksumStream=void 0;var Heu=XEt(),Ieu=Fbe(),Deu=gis(),Peu=({expectedChecksum:e,checksum:t,source:n,checksumSourceLocation:r,base64Encoder:o})=>{if(!(0,Ieu.isReadableStream)(n))throw Error(`@smithy/util-stream: unsupported source type ${n?.constructor?.name??n} in ChecksumStream.`);let s=o??Heu.toBase64;if(typeof TransformStream!=="function")throw Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");let i=new TransformStream({start(){},async transform(l,c){t.update(l),c.enqueue(l)},async flush(l){let c=await t.digest(),u=s(c);if(e!==u){let d=Error(`Checksum mismatch: expected "${e}" but received "${u}" in response header "${r}".`);l.error(d)}else l.terminate()}});n.pipeThrough(i);let a=i.readable;return Object.setPrototypeOf(a,Deu.ChecksumStream.prototype),a};drn.createChecksumStream=Peu});
export {_is};
