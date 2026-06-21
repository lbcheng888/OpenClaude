// @ts-nocheck
import {b,M} from "../runtime.ts";
import {xB} from "./m781.ts";
class Hvt{config;middlewareStack=qOs.constructStack();initConfig;handlers;constructor(e){this.config=e}send(e,t,n){let r=typeof t!=="function"?t:void 0,o=typeof t==="function"?t:n,s=r===void 0&&this.config.cacheMiddleware===!0,i;if(s){if(!this.handlers)this.handlers=new WeakMap;let a=this.handlers;if(a.has(e.constructor))i=a.get(e.constructor);else i=e.resolveMiddleware(this.middlewareStack,this.config,r),a.set(e.constructor,i)}else delete this.handlers,i=e.resolveMiddleware(this.middlewareStack,this.config,r);if(o)i(e).then((a)=>o(null,a.output),(a)=>o(a)).catch(()=>{});else return i(e).then((a)=>a.output)}destroy(){this.config?.requestHandler?.destroy?.(),delete this.handlers}}
var qOs;
var jOs=b(()=>{qOs=M(xB(),1)});
export {Hvt,qOs,jOs};
