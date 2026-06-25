// @ts-nocheck
import {Evr,Cvr} from "./m1044.ts";
import {b} from "../runtime.ts";
var vHs=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=zvu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw Evr(i,t)},Kvu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{vHs({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},zvu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var wHs=b(()=>{Cvr()});
export {vHs,Kvu,zvu,wHs};
