// @ts-nocheck
import {Q} from "../runtime.ts";
import {CUt} from "./m3449.ts";
import {pEa} from "./m3496.ts";
var fEa=Q((Jat)=>{Object.defineProperty(Jat,"__esModule",{value:!0});Jat.getHttpConfigurationDefaults=Jat.mergeOtlpHttpConfigurationWithDefaults=void 0;var mEa=CUt(),dsp=pEa();function psp(e,t,n){return async()=>{let r={...await n()},o={};if(t!=null)Object.assign(o,await t());if(e!=null)Object.assign(o,(0,dsp.validateAndNormalizeHeaders)(await e()));return Object.assign(o,r)}}function msp(e){if(e==null)return;try{let t=globalThis.location?.href;return new URL(e,t).href}catch{throw Error(`Configuration: Could not parse user-provided export URL: '${e}'`)}}function fsp(e,t,n){return{...(0,mEa.mergeOtlpSharedConfigurationWithDefaults)(e,t,n),headers:psp(e.headers,t.headers,n.headers),url:msp(e.url)??t.url??n.url}}Jat.mergeOtlpHttpConfigurationWithDefaults=fsp;function hsp(e,t){return{...(0,mEa.getSharedConfigurationDefaults)(),headers:async()=>e,url:"http://localhost:4318/"+t}}Jat.getHttpConfigurationDefaults=hsp});
export {fEa};
