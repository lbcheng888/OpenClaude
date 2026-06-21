// @ts-nocheck
import {_Cr,yCr} from "./m1229.ts";
import {b} from "../runtime.ts";
var D0s=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=yRu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw _Cr(i,t)},_Ru=(e)=>({output:t,parsedBody:n,errorCode:r})=>{D0s({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},yRu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var P0s=b(()=>{yCr()});
export {D0s,_Ru,yRu,P0s};
