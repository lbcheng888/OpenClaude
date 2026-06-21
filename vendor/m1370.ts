// @ts-nocheck
import {iwr,awr} from "./m1369.ts";
import {b} from "../runtime.ts";
var nFs=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=z0u(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw iwr(i,t)},K0u=(e)=>({output:t,parsedBody:n,errorCode:r})=>{nFs({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},z0u=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var rFs=b(()=>{awr()});
export {nFs,K0u,z0u,rFs};
