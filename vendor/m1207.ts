// @ts-nocheck
import {F1e,pCr} from "./m1206.ts";
import {b} from "../runtime.ts";
var YHs=(e,t)=>(n)=>(r)=>{let{request:o}=r;if(F1e.isInstance(o)&&e.requestHandler.metadata?.handlerProtocol?.toLowerCase().includes("websocket")){o.protocol="wss:",o.method="GET",o.path=`${o.path}-websocket`;let{headers:s}=o;delete s["content-type"],delete s["x-amz-content-sha256"];for(let i of Object.keys(s))if(i.indexOf(t.headerPrefix)===0){let a=i.replace(t.headerPrefix,"");o.query[a]=s[i]}if(s["x-amz-user-agent"])o.query["user-agent"]=s["x-amz-user-agent"];o.headers={host:s.host??o.hostname}}return n(r)},JHs;
var XHs=b(()=>{pCr();JHs={name:"websocketEndpointMiddleware",tags:["WEBSOCKET","EVENT_STREAM"],relation:"after",toMiddleware:"eventStreamHeaderMiddleware",override:!0}});
export {YHs,JHs,XHs};
