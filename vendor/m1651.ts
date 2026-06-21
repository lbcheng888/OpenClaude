// @ts-nocheck
import {K5s,EHr} from "./m1650.ts";
import {Kwt,THr} from "./m1649.ts";
import {b} from "../runtime.ts";
function Y5s(e={}){var t,n;let r=(t=e.retryDelayInMs)!==null&&t!==void 0?t:k1u,o=(n=e.maxRetryDelayInMs)!==null&&n!==void 0?n:H1u;return{name:"exponentialRetryStrategy",retry({retryCount:s,response:i,responseError:a}){let l=D1u(a),c=l&&e.ignoreSystemErrors,u=I1u(i),d=u&&e.ignoreHttpStatusCodes;if(i&&(K5s(i)||!u)||d||c)return{skipStrategy:!0};if(a&&!l&&!u)return{errorToThrow:a};return Kwt(s,{retryDelayInMs:r,maxRetryDelayInMs:o})}}}
function I1u(e){return Boolean(e&&e.status!==void 0&&(e.status>=500||e.status===408)&&e.status!==501&&e.status!==505)}
function D1u(e){if(!e)return!1;return e.code==="ETIMEDOUT"||e.code==="ESOCKETTIMEDOUT"||e.code==="ECONNREFUSED"||e.code==="ECONNRESET"||e.code==="ENOENT"||e.code==="ENOTFOUND"}
var k1u=1000,H1u=64000;
var J5s=b(()=>{THr();EHr()});
export {Y5s,I1u,D1u,k1u,H1u,J5s};
