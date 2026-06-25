// @ts-nocheck
import {LIr,MIr} from "./m1374.ts";
import {b} from "../runtime.ts";
var X3s=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=d2u(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw LIr(i,t)},u2u=(e)=>({output:t,parsedBody:n,errorCode:r})=>{X3s({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},d2u=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var Q3s=b(()=>{MIr()});
export {X3s,u2u,d2u,Q3s};
