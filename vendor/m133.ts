// @ts-nocheck
import {b} from "../runtime.ts";
function nhc(e){if(typeof e==="function")return e;if(Symbol.asyncDispose in e)return()=>e[Symbol.asyncDispose]();return()=>e[Symbol.dispose]()}
function Gi(e){return $2o.register(e)}
async function JWe(){await $2o.drain()}
var U2o,$2o;
var ReactHooks=b(()=>{U2o=class U2o{#e=new Set;register(e){let t=nhc(e);this.#e.add(t);let n=()=>{this.#e.delete(t)};return Object.assign(n,{[Symbol.dispose]:n})}async drain(){let e=Array.from(this.#e);this.#e.clear(),await Promise.all(e.map(async(t)=>t()))}async[Symbol.asyncDispose](){await this.drain()}get sizeForTesting(){return this.#e.size}};$2o=new U2o});
export {nhc,Gi,JWe,U2o,$2o,ReactHooks};
