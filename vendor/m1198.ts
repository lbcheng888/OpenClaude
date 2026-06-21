// @ts-nocheck
import {N1e,Aln} from "./m1194.ts";
import {b} from "../runtime.ts";
function PHs({byteLength:e,byteOffset:t,buffer:n}){if(e<fRu)throw Error("Provided message too short to accommodate event stream message overhead");let r=new DataView(n,t,e),o=r.getUint32(0,!1);if(e!==o)throw Error("Reported message length does not match received message length");let s=r.getUint32(DHs,!1),i=r.getUint32(IEe,!1),a=r.getUint32(e-B1e,!1),l=new N1e().update(new Uint8Array(n,t,IEe));if(i!==l.digest())throw Error(`The prelude checksum specified in the message (${i}) does not match the calculated CRC32 checksum (${l.digest()})`);if(l.update(new Uint8Array(n,t+IEe,e-(IEe+B1e))),a!==l.digest())throw Error(`The message checksum (${l.digest()}) did not match the expected value of ${a}`);return{headers:new DataView(n,t+IEe+B1e,s),body:new Uint8Array(n,t+IEe+B1e+s,o-s-(IEe+B1e+B1e))}}
var DHs=4,IEe,B1e=4,fRu;
var OHs=b(()=>{Aln();IEe=DHs*2,fRu=IEe+B1e*2});
export {PHs,DHs,IEe,B1e,fRu,OHs};
