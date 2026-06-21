// @ts-nocheck
import {X} from "../runtime.ts";
import {KNt} from "./m3433.ts";
import {Xfa} from "./m3480.ts";
var Zfa=X((Zst)=>{Object.defineProperty(Zst,"__esModule",{value:!0});Zst.getHttpConfigurationDefaults=Zst.mergeOtlpHttpConfigurationWithDefaults=void 0;var Qfa=KNt(),Czd=Xfa();function vzd(e,t,n){return async()=>{let r={...await n()},o={};if(t!=null)Object.assign(o,await t());if(e!=null)Object.assign(o,(0,Czd.validateAndNormalizeHeaders)(await e()));return Object.assign(o,r)}}function wzd(e){if(e==null)return;try{let t=globalThis.location?.href;return new URL(e,t).href}catch{throw Error(`Configuration: Could not parse user-provided export URL: '${e}'`)}}function Rzd(e,t,n){return{...(0,Qfa.mergeOtlpSharedConfigurationWithDefaults)(e,t,n),headers:vzd(e.headers,t.headers,n.headers),url:wzd(e.url)??t.url??n.url}}Zst.mergeOtlpHttpConfigurationWithDefaults=Rzd;function xzd(e,t){return{...(0,Qfa.getSharedConfigurationDefaults)(),headers:async()=>e,url:"http://localhost:4318/"+t}}Zst.getHttpConfigurationDefaults=xzd});
export {Zfa};
