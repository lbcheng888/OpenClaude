// @ts-nocheck
import {Q} from "../runtime.ts";
import {Avt} from "./m795.ts";
import {bCe} from "./m797.ts";
import {dps} from "./m798.ts";
var pps=Q((jsn)=>{Object.defineProperty(jsn,"__esModule",{value:!0});jsn.createChecksumStream=void 0;var Kuu=Avt(),zuu=bCe(),juu=dps(),Yuu=({expectedChecksum:e,checksum:t,source:n,checksumSourceLocation:r,base64Encoder:o})=>{if(!(0,zuu.isReadableStream)(n))throw Error(`@smithy/util-stream: unsupported source type ${n?.constructor?.name??n} in ChecksumStream.`);let s=o??Kuu.toBase64;if(typeof TransformStream!=="function")throw Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");let i=new TransformStream({start(){},async transform(l,c){t.update(l),c.enqueue(l)},async flush(l){let c=await t.digest(),u=s(c);if(e!==u){let d=Error(`Checksum mismatch: expected "${e}" but received "${u}" in response header "${r}".`);l.error(d)}else l.terminate()}});n.pipeThrough(i);let a=i.readable;return Object.setPrototypeOf(a,juu.ChecksumStream.prototype),a};jsn.createChecksumStream=Yuu});
export {pps};
