// @ts-nocheck
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
function httpRequest(e){return new Promise((t,n)=>{let r=ios.request({method:"GET",...e,hostname:e.hostname?.replace(/^\[(.+)\]$/,"$1")});r.on("error",(o)=>{n(Object.assign(new Xnn.ProviderError("Unable to connect to instance metadata service"),o)),r.destroy()}),r.on("timeout",()=>{n(new Xnn.ProviderError("TimeoutError from instance metadata service")),r.destroy()}),r.on("response",(o)=>{let{statusCode:s=400}=o;if(s<200||300<=s)n(Object.assign(new Xnn.ProviderError("Error response received from instance metadata service"),{statusCode:s})),r.destroy();let i=[];o.on("data",(a)=>{i.push(a)}),o.on("end",()=>{t(sos.Buffer.concat(i)),r.destroy()})}),r.end()})}
var Xnn,sos,ios;
var Qnn=b(()=>{Xnn=M(createDefaultGlobalConfig(),1),sos=require("buffer"),ios=require("http")});
export {httpRequest,Xnn,sos,ios,Qnn};
