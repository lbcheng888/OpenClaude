// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
function httpRequest(e){return new Promise((t,n)=>{let r=eus.request({method:"GET",...e,hostname:e.hostname?.replace(/^\[(.+)\]$/,"$1")});r.on("error",(o)=>{n(Object.assign(new Osn.ProviderError("Unable to connect to instance metadata service"),o)),r.destroy()}),r.on("timeout",()=>{n(new Osn.ProviderError("TimeoutError from instance metadata service")),r.destroy()}),r.on("response",(o)=>{let{statusCode:s=400}=o;if(s<200||300<=s)n(Object.assign(new Osn.ProviderError("Error response received from instance metadata service"),{statusCode:s})),r.destroy();let i=[];o.on("data",(a)=>{i.push(a)}),o.on("end",()=>{t(Zcs.Buffer.concat(i)),r.destroy()})}),r.end()})}
var Osn,Zcs,eus;
var Lsn=b(()=>{Osn=x(Vg(),1),Zcs=require("buffer"),eus=require("http")});
export {httpRequest,Osn,Zcs,eus,Lsn};
