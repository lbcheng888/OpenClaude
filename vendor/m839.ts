// @ts-nocheck
import {MEr,NEr} from "./m838.ts";
import {b} from "../runtime.ts";
var Efs=({output:e,parsedBody:t,exceptionCtor:n,errorCode:r})=>{let o=Imu(e),s=o.httpStatusCode?o.httpStatusCode+"":void 0,i=new n({name:t?.code||t?.Code||r||s||"UnknownError",$fault:"client",$metadata:o});throw MEr(i,t)},Hmu=(e)=>({output:t,parsedBody:n,errorCode:r})=>{Efs({output:t,parsedBody:n,exceptionCtor:e,errorCode:r})},Imu=(e)=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]});
var Cfs=b(()=>{NEr()});
export {Efs,Hmu,Imu,Cfs};
