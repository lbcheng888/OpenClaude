// @ts-nocheck
import {mi,SH} from "./m135.ts";
import {b} from "../runtime.ts";
function dzt(e){if(typeof e!=="object")return{};return e??{}}
function xrr(e){if(!e)return!0;for(let t in e)return!1;return!0}
function V2o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}
var ihc,G2o=(e)=>ihc.test(e),wrr=(e)=>(wrr=Array.isArray,wrr(e)),Rrr,K2o=(e,t)=>{if(typeof t!=="number"||!Number.isInteger(t))throw new mi(`${e} must be an integer`);if(t<0)throw new mi(`${e} must be a positive integer`);return t},pzt=(e)=>{try{return JSON.parse(e)}catch(t){return}};
var lSe=b(()=>{SH();ihc=/^[a-z][a-z0-9+.-]*:/i,Rrr=wrr});
export {dzt,xrr,V2o,ihc,G2o,wrr,Rrr,K2o,pzt,lSe};
