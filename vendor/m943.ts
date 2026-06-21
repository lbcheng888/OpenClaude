// @ts-nocheck
import {RTr,xTr} from "./m942.ts";
import {b} from "../runtime.ts";
var Xhs=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=Apu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw RTr(i,t)},fpu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{Xhs({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},Apu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var Qhs=b(()=>{xTr()});
export {Xhs,fpu,Apu,Qhs};
