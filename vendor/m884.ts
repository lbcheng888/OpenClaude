// @ts-nocheck
import {X} from "../runtime.ts";
import {gps} from "./m883.ts";
var ome=X((won)=>{var Dau=gps(),_ps="content-length";function yps(e){return(t)=>async(n)=>{let r=n.request;if(Dau.HttpRequest.isInstance(r)){let{body:o,headers:s}=r;if(o&&Object.keys(s).map((i)=>i.toLowerCase()).indexOf(_ps)===-1)try{let i=e(o);r.headers={...r.headers,[_ps]:String(i)}}catch(i){}}return t({...n,request:r})}}var Tps={step:"build",tags:["SET_CONTENT_LENGTH","CONTENT_LENGTH"],name:"contentLengthMiddleware",override:!0},Pau=(e)=>({applyToStack:(t)=>{t.add(yps(e.bodyLengthChecker),Tps)}});won.contentLengthMiddleware=yps;won.contentLengthMiddlewareOptions=Tps;won.getContentLengthPlugin=Pau});
export {ome};
