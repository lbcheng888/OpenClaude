// @ts-nocheck
import {X} from "../runtime.ts";
import {Rus} from "./m858.ts";
var Jpe=X((mCt)=>{var Zou=Rus();function esu(e){return e}var xus=(e)=>(t)=>async(n)=>{if(!Zou.HttpRequest.isInstance(n.request))return t(n);let{request:r}=n,{handlerProtocol:o=""}=e.requestHandler.metadata||{};if(o.indexOf("h2")>=0&&!r.headers[":authority"])delete r.headers.host,r.headers[":authority"]=r.hostname+(r.port?":"+r.port:"");else if(!r.headers.host){let s=r.hostname;if(r.port!=null)s+=`:${r.port}`;r.headers.host=s}return t(n)},kus={name:"hostHeaderMiddleware",step:"build",priority:"low",tags:["HOST"],override:!0},tsu=(e)=>({applyToStack:(t)=>{t.add(xus(e),kus)}});mCt.getHostHeaderPlugin=tsu;mCt.hostHeaderMiddleware=xus;mCt.hostHeaderMiddlewareOptions=kus;mCt.resolveHostHeaderConfig=esu});
export {Jpe};
