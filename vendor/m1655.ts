// @ts-nocheck
import {Ujs,XPr} from "./m1654.ts";
import {b} from "../runtime.ts";
function $js(e){if(!(e&&[429,503].includes(e.status)))return;try{for(let o of zqu){let s=Ujs(e,o);if(s===0||s)return s*(o===QPr?1000:1)}let t=e.headers.get(QPr);if(!t)return;let r=Date.parse(t)-Date.now();return Number.isFinite(r)?Math.max(0,r):void 0}catch(t){return}}
function qjs(e){return Number.isFinite($js(e))}
function Wjs(){return{name:"throttlingRetryStrategy",retry({response:e}){let t=$js(e);if(!Number.isFinite(t))return{skipStrategy:!0};return{retryAfterInMs:t}}}}
var QPr="Retry-After",zqu;
var ZPr=b(()=>{XPr();zqu=["retry-after-ms","x-ms-retry-after-ms",QPr]});
export {$js,qjs,Wjs,QPr,zqu,ZPr};
