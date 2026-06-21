// @ts-nocheck
import {KSr,zSr} from "./m1039.ts";
import {b} from "../runtime.ts";
var DEs=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=Ihu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw KSr(i,t)},Hhu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{DEs({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},Ihu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var PEs=b(()=>{zSr()});
export {DEs,Hhu,Ihu,PEs};
