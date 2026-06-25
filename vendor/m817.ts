// @ts-nocheck
import {Q} from "../runtime.ts";
import {T3} from "./m755.ts";
import {qsn} from "./m789.ts";
import {Gps} from "./m816.ts";
var Kps=Q((sin)=>{Object.defineProperty(sin,"__esModule",{value:!0});sin.sdkStreamMixin=void 0;var Vdu=T3(),Kdu=qsn(),oEr=require("stream"),zdu=Gps(),Vps="The stream has already been transformed.",jdu=(e)=>{if(!(e instanceof oEr.Readable))try{return(0,zdu.sdkStreamMixin)(e)}catch(r){let o=e?.__proto__?.constructor?.name||e;throw Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${o}`)}let t=!1,n=async()=>{if(t)throw Error(Vps);return t=!0,await(0,Vdu.streamCollector)(e)};return Object.assign(e,{transformToByteArray:n,transformToString:async(r)=>{let o=await n();if(r===void 0||Buffer.isEncoding(r))return(0,Kdu.fromArrayBuffer)(o.buffer,o.byteOffset,o.byteLength).toString(r);else return new TextDecoder(r).decode(o)},transformToWebStream:()=>{if(t)throw Error(Vps);if(e.readableFlowing!==null)throw Error("The stream has been consumed by other callbacks.");if(typeof oEr.Readable.toWeb!=="function")throw Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");return t=!0,oEr.Readable.toWeb(e)}})};sin.sdkStreamMixin=jdu});
export {Kps};
