// @ts-nocheck
import {DNe,$kr} from "./m1211.ts";
import {b} from "../runtime.ts";
var WLs=(e,t)=>(n)=>(r)=>{let{request:o}=r;if(DNe.isInstance(o)&&e.requestHandler.metadata?.handlerProtocol?.toLowerCase().includes("websocket")){o.protocol="wss:",o.method="GET",o.path=`${o.path}-websocket`;let{headers:s}=o;delete s["content-type"],delete s["x-amz-content-sha256"];for(let i of Object.keys(s))if(i.indexOf(t.headerPrefix)===0){let a=i.replace(t.headerPrefix,"");o.query[a]=s[i]}if(s["x-amz-user-agent"])o.query["user-agent"]=s["x-amz-user-agent"];o.headers={host:s.host??o.hostname}}return n(r)},GLs;
var VLs=b(()=>{$kr();GLs={name:"websocketEndpointMiddleware",tags:["WEBSOCKET","EVENT_STREAM"],relation:"after",toMiddleware:"eventStreamHeaderMiddleware",override:!0}});
export {WLs,GLs,VLs};
