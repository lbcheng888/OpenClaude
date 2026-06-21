// @ts-nocheck
import {X} from "../runtime.ts";
import {e4} from "./m750.ts";
import {srn} from "./m784.ts";
import {Jis} from "./m811.ts";
var Qis=X((brn)=>{Object.defineProperty(brn,"__esModule",{value:!0});brn.sdkStreamMixin=void 0;var ktu=e4(),Htu=srn(),kgr=require("stream"),Itu=Jis(),Xis="The stream has already been transformed.",Dtu=(e)=>{if(!(e instanceof kgr.Readable))try{return(0,Itu.sdkStreamMixin)(e)}catch(r){let o=e?.__proto__?.constructor?.name||e;throw Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${o}`)}let t=!1,n=async()=>{if(t)throw Error(Xis);return t=!0,await(0,ktu.streamCollector)(e)};return Object.assign(e,{transformToByteArray:n,transformToString:async(r)=>{let o=await n();if(r===void 0||Buffer.isEncoding(r))return(0,Htu.fromArrayBuffer)(o.buffer,o.byteOffset,o.byteLength).toString(r);else return new TextDecoder(r).decode(o)},transformToWebStream:()=>{if(t)throw Error(Xis);if(e.readableFlowing!==null)throw Error("The stream has been consumed by other callbacks.");if(typeof kgr.Readable.toWeb!=="function")throw Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");return t=!0,kgr.Readable.toWeb(e)}})};brn.sdkStreamMixin=Dtu});
export {Qis};
