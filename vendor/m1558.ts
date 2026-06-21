// @ts-nocheck
import {b,M} from "../runtime.ts";
import {epn} from "./m1554.ts";
function bjs({byteLength:e,byteOffset:t,buffer:n}){if(e<gMu)throw Error("Provided message too short to accommodate event stream message overhead");let r=new DataView(n,t,e),o=r.getUint32(0,!1);if(e!==o)throw Error("Reported message length does not match received message length");let s=r.getUint32(Sjs,!1),i=r.getUint32(dCe,!1),a=r.getUint32(e-SNe,!1),l=new Tjs.Crc32().update(new Uint8Array(n,t,dCe));if(i!==l.digest())throw Error(`The prelude checksum specified in the message (${i}) does not match the calculated CRC32 checksum (${l.digest()})`);if(l.update(new Uint8Array(n,t+dCe,e-(dCe+SNe))),a!==l.digest())throw Error(`The message checksum (${l.digest()}) did not match the expected value of ${a}`);return{headers:new DataView(n,t+dCe+SNe,s),body:new Uint8Array(n,t+dCe+SNe+s,o-s-(dCe+SNe+SNe))}}
var Tjs,Sjs=4,dCe,SNe=4,gMu;
var Ejs=b(()=>{Tjs=M(epn(),1),dCe=Sjs*2,gMu=dCe+SNe*2});
export {bjs,Tjs,Sjs,dCe,SNe,gMu,Ejs};
