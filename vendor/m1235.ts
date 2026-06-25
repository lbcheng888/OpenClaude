// @ts-nocheck
import {zkr,jkr} from "./m1234.ts";
import {b} from "../runtime.ts";
var v1s=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=LMu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw zkr(i,t)},OMu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{v1s({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},LMu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var w1s=b(()=>{jkr()});
export {v1s,OMu,LMu,w1s};
