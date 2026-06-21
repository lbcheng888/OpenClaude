// @ts-nocheck
import {X} from "../runtime.ts";
import {SKe} from "./m809.ts";
import {XEt} from "./m790.ts";
import {Vis} from "./m810.ts";
import {FS} from "./m788.ts";
import {Fbe} from "./m792.ts";
var Jis=X((Srn)=>{Object.defineProperty(Srn,"__esModule",{value:!0});Srn.sdkStreamMixin=void 0;var Ctu=SKe(),vtu=XEt(),wtu=Vis(),Rtu=FS(),Kis=Fbe(),zis="The stream has already been transformed.",xtu=(e)=>{if(!Yis(e)&&!(0,Kis.isReadableStream)(e)){let o=e?.__proto__?.constructor?.name||e;throw Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${o}`)}let t=!1,n=async()=>{if(t)throw Error(zis);return t=!0,await(0,Ctu.streamCollector)(e)},r=(o)=>{if(typeof o.stream!=="function")throw Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body`);return o.stream()};return Object.assign(e,{transformToByteArray:n,transformToString:async(o)=>{let s=await n();if(o==="base64")return(0,vtu.toBase64)(s);else if(o==="hex")return(0,wtu.toHex)(s);else if(o===void 0||o==="utf8"||o==="utf-8")return(0,Rtu.toUtf8)(s);else if(typeof TextDecoder==="function")return new TextDecoder(o).decode(s);else throw Error("TextDecoder is not available, please make sure polyfill is provided.")},transformToWebStream:()=>{if(t)throw Error(zis);if(t=!0,Yis(e))return r(e);else if((0,Kis.isReadableStream)(e))return e;else throw Error(`Cannot transform payload to web stream, got ${e}`)}})};Srn.sdkStreamMixin=xtu;var Yis=(e)=>typeof Blob==="function"&&e instanceof Blob});
export {Jis};
