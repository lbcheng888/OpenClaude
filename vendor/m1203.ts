// @ts-nocheck
import {INe,Zun} from "./m1199.ts";
import {b} from "../runtime.ts";
function wLs({byteLength:e,byteOffset:t,buffer:n}){if(e<IMu)throw Error("Provided message too short to accommodate event stream message overhead");let r=new DataView(n,t,e),o=r.getUint32(0,!1);if(e!==o)throw Error("Reported message length does not match received message length");let s=r.getUint32(vLs,!1),i=r.getUint32(mAe,!1),a=r.getUint32(e-xNe,!1),l=new INe().update(new Uint8Array(n,t,mAe));if(i!==l.digest())throw Error(`The prelude checksum specified in the message (${i}) does not match the calculated CRC32 checksum (${l.digest()})`);if(l.update(new Uint8Array(n,t+mAe,e-(mAe+xNe))),a!==l.digest())throw Error(`The message checksum (${l.digest()}) did not match the expected value of ${a}`);return{headers:new DataView(n,t+mAe+xNe,s),body:new Uint8Array(n,t+mAe+xNe+s,o-s-(mAe+xNe+xNe))}}
var vLs=4,mAe,xNe=4,IMu;
var kLs=b(()=>{Zun();mAe=vLs*2,IMu=mAe+xNe*2});
export {wLs,vLs,mAe,xNe,IMu,kLs};
