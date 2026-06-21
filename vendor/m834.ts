// @ts-nocheck
import {a_r,l_r} from "./m833.ts";
import {b} from "../runtime.ts";
var xls=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=fru(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw a_r(i,t)},mru=(e)=>({output:t,parsedBody:n,errorCode:r})=>{xls({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},fru=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var kls=b(()=>{l_r()});
export {xls,mru,fru,kls};
