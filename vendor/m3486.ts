// @ts-nocheck
import {X} from "../runtime.ts";
import {aAa} from "./m3485.ts";
var cAa=X((rOn)=>{Object.defineProperty(rOn,"__esModule",{value:!0});rOn.createHttpExporterTransport=void 0;var Fzd=aAa();class lAa{_parameters;_utils=null;constructor(e){this._parameters=e}async send(e,t){let{agent:n,request:r}=await this._loadUtils(),o=await this._parameters.headers();return new Promise((s)=>{(0,Fzd.sendWithHttp)(r,this._parameters.url,o,this._parameters.compression,this._parameters.userAgent,n,e,(i)=>{s(i)},t)})}shutdown(){}async _loadUtils(){let e=this._utils;if(e===null){let t=new URL(this._parameters.url).protocol,[n,r]=await Promise.all([this._parameters.agentFactory(t),Uzd(t)]);e=this._utils={agent:n,request:r}}return e}}async function Uzd(e){let t=e==="http:"?import("http"):import("https"),{request:n}=await t;return n}function $zd(e){return new lAa(e)}rOn.createHttpExporterTransport=$zd});
export {cAa};
