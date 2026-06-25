// @ts-nocheck
import {b,x} from "../runtime.ts";
import {XN} from "./m786.ts";
var C9s=()=>{};
var A9s=()=>{};
var R9s=()=>{};
function kpn(e){return Promise.all(Object.keys(e).reduce((t,n)=>{let r=e[n];if(typeof r==="string")t.push([n,r]);else t.push(r().then((o)=>[n,o]));return t},[])).then((t)=>t.reduce((n,[r,o])=>(n[r]=o,n),{}))}
class Hpn{config;middlewareStack=v9s.constructStack();initConfig;handlers;constructor(e){this.config=e}send(e,t,n){let r=typeof t!=="function"?t:void 0,o=typeof t==="function"?t:n,s=r===void 0&&this.config.cacheMiddleware===!0,i;if(s){if(!this.handlers)this.handlers=new WeakMap;let a=this.handlers;if(a.has(e.constructor))i=a.get(e.constructor);else i=e.resolveMiddleware(this.middlewareStack,this.config,r),a.set(e.constructor,i)}else delete this.handlers,i=e.resolveMiddleware(this.middlewareStack,this.config,r);if(o)i(e).then((a)=>o(null,a.output),(a)=>o(a)).catch(()=>{});else return i(e).then((a)=>a.output)}destroy(){this.config?.requestHandler?.destroy?.(),delete this.handlers}}
var v9s;
var w9s=b(()=>{v9s=x(XN(),1)});
export {C9s,A9s,R9s,kpn,Hpn,v9s,w9s};
