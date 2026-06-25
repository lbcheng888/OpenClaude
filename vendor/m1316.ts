// @ts-nocheck
import {lIr,cIr} from "./m1315.ts";
import {b} from "../runtime.ts";
var l2s=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=ZBu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw lIr(i,t)},QBu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{l2s({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},ZBu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var c2s=b(()=>{cIr()});
export {l2s,QBu,ZBu,c2s};
