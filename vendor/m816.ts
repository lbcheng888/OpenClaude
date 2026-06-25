// @ts-nocheck
import {Q} from "../runtime.ts";
import {TYe} from "./m814.ts";
import {Avt} from "./m795.ts";
import {Ups} from "./m815.ts";
import {BS} from "./m793.ts";
import {bCe} from "./m797.ts";
var Gps=Q((oin)=>{Object.defineProperty(oin,"__esModule",{value:!0});oin.sdkStreamMixin=void 0;var Udu=TYe(),$du=Avt(),qdu=Ups(),Wdu=BS(),$ps=bCe(),qps="The stream has already been transformed.",Gdu=(e)=>{if(!Wps(e)&&!(0,$ps.isReadableStream)(e)){let o=e?.__proto__?.constructor?.name||e;throw Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${o}`)}let t=!1,n=async()=>{if(t)throw Error(qps);return t=!0,await(0,Udu.streamCollector)(e)},r=(o)=>{if(typeof o.stream!=="function")throw Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body`);return o.stream()};return Object.assign(e,{transformToByteArray:n,transformToString:async(o)=>{let s=await n();if(o==="base64")return(0,$du.toBase64)(s);else if(o==="hex")return(0,qdu.toHex)(s);else if(o===void 0||o==="utf8"||o==="utf-8")return(0,Wdu.toUtf8)(s);else if(typeof TextDecoder==="function")return new TextDecoder(o).decode(s);else throw Error("TextDecoder is not available, please make sure polyfill is provided.")},transformToWebStream:()=>{if(t)throw Error(qps);if(t=!0,Wps(e))return r(e);else if((0,$ps.isReadableStream)(e))return e;else throw Error(`Cannot transform payload to web stream, got ${e}`)}})};oin.sdkStreamMixin=Gdu;var Wps=(e)=>typeof Blob==="function"&&e instanceof Blob});
export {Gps};
