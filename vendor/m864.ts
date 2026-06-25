// @ts-nocheck
import {Q} from "../runtime.ts";
import {bgs} from "./m863.ts";
var ome=Q((Uvt)=>{var hhu=bgs();function ghu(e){return e}var Egs=(e)=>(t)=>async(n)=>{if(!hhu.HttpRequest.isInstance(n.request))return t(n);let{request:r}=n,{handlerProtocol:o=""}=e.requestHandler.metadata||{};if(o.indexOf("h2")>=0&&!r.headers[":authority"])delete r.headers.host,r.headers[":authority"]=r.hostname+(r.port?":"+r.port:"");else if(!r.headers.host){let s=r.hostname;if(r.port!=null)s+=`:${r.port}`;r.headers.host=s}return t(n)},Cgs={name:"hostHeaderMiddleware",step:"build",priority:"low",tags:["HOST"],override:!0},_hu=(e)=>({applyToStack:(t)=>{t.add(Egs(e),Cgs)}});Uvt.getHostHeaderPlugin=_hu;Uvt.hostHeaderMiddleware=Egs;Uvt.hostHeaderMiddlewareOptions=Cgs;Uvt.resolveHostHeaderConfig=ghu});
export {ome};
