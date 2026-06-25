// @ts-nocheck
import {Q} from "../runtime.ts";
var bps=Q((Xsn)=>{Object.defineProperty(Xsn,"__esModule",{value:!0});Xsn.getAwsChunkedEncodingStream=void 0;var odu=require("stream"),sdu=(e,t)=>{let{base64Encoder:n,bodyLengthChecker:r,checksumAlgorithmFn:o,checksumLocationName:s,streamHasher:i}=t,a=n!==void 0&&o!==void 0&&s!==void 0&&i!==void 0,l=a?i(o,e):void 0,c=new odu.Readable({read:()=>{}});return e.on("data",(u)=>{let d=r(u)||0;c.push(`${d.toString(16)}\r
`),c.push(u),c.push(`\r
`)}),e.on("end",async()=>{if(c.push(`0\r
`),a){let u=n(await l);c.push(`${s}:${u}\r
`),c.push(`\r
`)}c.push(null)}),c};Xsn.getAwsChunkedEncodingStream=sdu});
export {bps};
