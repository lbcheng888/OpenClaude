// @ts-nocheck
import {G5s,SHr} from "./m1649.ts";
import {b} from "../runtime.ts";
function V5s(e){if(!(e&&[429,503].includes(e.status)))return;try{for(let o of x1u){let s=G5s(e,o);if(s===0||s)return s*(o===bHr?1000:1)}let t=e.headers.get(bHr);if(!t)return;let r=Date.parse(t)-Date.now();return Number.isFinite(r)?Math.max(0,r):void 0}catch(t){return}}
function K5s(e){return Number.isFinite(V5s(e))}
function z5s(){return{name:"throttlingRetryStrategy",retry({response:e}){let t=V5s(e);if(!Number.isFinite(t))return{skipStrategy:!0};return{retryAfterInMs:t}}}}
var bHr="Retry-After",x1u;
var EHr=b(()=>{SHr();x1u=["retry-after-ms","x-ms-retry-after-ms",bHr]});
export {V5s,K5s,z5s,bHr,x1u,EHr};
