// @ts-nocheck
import {nRr,rRr} from "./m947.ts";
import {b} from "../runtime.ts";
var VEs=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=xEu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw nRr(i,t)},IEu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{VEs({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},xEu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var KEs=b(()=>{rRr()});
export {VEs,IEu,xEu,KEs};
