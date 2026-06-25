// @ts-nocheck
import {b,x} from "../runtime.ts";
import {XN} from "./m786.ts";
var ZLs=(e)=>Object.assign(e,{eventStreamMarshaller:e.eventStreamSerdeProvider(e)});
var eMs=()=>{};
class Mwt{config;middlewareStack=tMs.constructStack();initConfig;handlers;constructor(e){this.config=e}send(e,t,n){let r=typeof t!=="function"?t:void 0,o=typeof t==="function"?t:n,s=r===void 0&&this.config.cacheMiddleware===!0,i;if(s){if(!this.handlers)this.handlers=new WeakMap;let a=this.handlers;if(a.has(e.constructor))i=a.get(e.constructor);else i=e.resolveMiddleware(this.middlewareStack,this.config,r),a.set(e.constructor,i)}else delete this.handlers,i=e.resolveMiddleware(this.middlewareStack,this.config,r);if(o)i(e).then((a)=>o(null,a.output),(a)=>o(a)).catch(()=>{});else return i(e).then((a)=>a.output)}destroy(){this.config?.requestHandler?.destroy?.(),delete this.handlers}}
var tMs;
var nMs=b(()=>{tMs=x(XN(),1)});
export {ZLs,eMs,Mwt,tMs,nMs};
