// @ts-nocheck
import {Qs,YH} from "./m137.ts";
import {b} from "../runtime.ts";
function GJt(e){if(typeof e!=="object")return{};return e??{}}
function rlr(e){if(!e)return!0;for(let t in e)return!1;return!0}
function N6o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}
var uvc,M6o=(e)=>uvc.test(e),tlr=(e)=>(tlr=Array.isArray,tlr(e)),nlr,F6o=(e,t)=>{if(typeof t!=="number"||!Number.isInteger(t))throw new Qs(`${e} must be an integer`);if(t<0)throw new Qs(`${e} must be a positive integer`);return t},VJt=(e)=>{try{return JSON.parse(e)}catch(t){return}};
var Wbe=b(()=>{YH();uvc=/^[a-z][a-z0-9+.-]*:/i,nlr=tlr});
export {GJt,rlr,N6o,uvc,M6o,tlr,nlr,F6o,VJt,Wbe};
