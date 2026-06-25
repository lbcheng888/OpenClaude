// @ts-nocheck
import {qjs,ZPr} from "./m1655.ts";
import {SHt,JPr} from "./m1654.ts";
import {b} from "../runtime.ts";
function Gjs(e={}){var t,n;let r=(t=e.retryDelayInMs)!==null&&t!==void 0?t:jqu,o=(n=e.maxRetryDelayInMs)!==null&&n!==void 0?n:Yqu;return{name:"exponentialRetryStrategy",retry({retryCount:s,response:i,responseError:a}){let l=Xqu(a),c=l&&e.ignoreSystemErrors,u=Jqu(i),d=u&&e.ignoreHttpStatusCodes;if(i&&(qjs(i)||!u)||d||c)return{skipStrategy:!0};if(a&&!l&&!u)return{errorToThrow:a};return SHt(s,{retryDelayInMs:r,maxRetryDelayInMs:o})}}}
function Jqu(e){return Boolean(e&&e.status!==void 0&&(e.status>=500||e.status===408)&&e.status!==501&&e.status!==505)}
function Xqu(e){if(!e)return!1;return e.code==="ETIMEDOUT"||e.code==="ESOCKETTIMEDOUT"||e.code==="ECONNREFUSED"||e.code==="ECONNRESET"||e.code==="ENOENT"||e.code==="ENOTFOUND"}
var jqu=1000,Yqu=64000;
var Vjs=b(()=>{JPr();ZPr()});
export {Gjs,Jqu,Xqu,jqu,Yqu,Vjs};
