// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Mfn} from "./m1559.ts";
function _7s({byteLength:e,byteOffset:t,buffer:n}){if(e<M4u)throw Error("Provided message too short to accommodate event stream message overhead");let r=new DataView(n,t,e),o=r.getUint32(0,!1);if(e!==o)throw Error("Reported message length does not match received message length");let s=r.getUint32(g7s,!1),i=r.getUint32(jAe,!1),a=r.getUint32(e-_Fe,!1),l=new h7s.Crc32().update(new Uint8Array(n,t,jAe));if(i!==l.digest())throw Error(`The prelude checksum specified in the message (${i}) does not match the calculated CRC32 checksum (${l.digest()})`);if(l.update(new Uint8Array(n,t+jAe,e-(jAe+_Fe))),a!==l.digest())throw Error(`The message checksum (${l.digest()}) did not match the expected value of ${a}`);return{headers:new DataView(n,t+jAe+_Fe,s),body:new Uint8Array(n,t+jAe+_Fe+s,o-s-(jAe+_Fe+_Fe))}}
var h7s,g7s=4,jAe,_Fe=4,M4u;
var y7s=b(()=>{h7s=x(Mfn(),1),jAe=g7s*2,M4u=jAe+_Fe*2});
export {_7s,h7s,g7s,jAe,_Fe,M4u,y7s};
