// @ts-nocheck
import {Q} from "../runtime.ts";
import {EEa} from "./m3501.ts";
var AEa=Q((JMn)=>{Object.defineProperty(JMn,"__esModule",{value:!0});JMn.createHttpExporterTransport=void 0;var vsp=EEa();class CEa{_parameters;_utils=null;constructor(e){this._parameters=e}async send(e,t){let{agent:n,request:r}=await this._loadUtils(),o=await this._parameters.headers();return new Promise((s)=>{(0,vsp.sendWithHttp)(r,this._parameters.url,o,this._parameters.compression,this._parameters.userAgent,n,e,(i)=>{s(i)},t)})}shutdown(){}async _loadUtils(){let e=this._utils;if(e===null){let t=new URL(this._parameters.url).protocol,[n,r]=await Promise.all([this._parameters.agentFactory(t),wsp(t)]);e=this._utils={agent:n,request:r}}return e}}async function wsp(e){let t=e==="http:"?import("http"):import("https"),{request:n}=await t;return n}function ksp(e){return new CEa(e)}JMn.createHttpExporterTransport=ksp});
export {AEa};
