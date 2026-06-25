// @ts-nocheck
import {b} from "../runtime.ts";
function svc(e){if(typeof e==="function")return e;if(Symbol.asyncDispose in e)return()=>e[Symbol.asyncDispose]();return()=>e[Symbol.dispose]()}
function Si(e){return v6o.register(e)}
async function GKe(){await v6o.drain()}
var R6o,v6o;
var ud=b(()=>{R6o=class R6o{#e=new Set;register(e){let t=svc(e);this.#e.add(t);let n=()=>{this.#e.delete(t)};return Object.assign(n,{[Symbol.dispose]:n})}async drain(){let e=Array.from(this.#e);this.#e.clear(),await Promise.all(e.map(async(t)=>t()))}async[Symbol.asyncDispose](){await this.drain()}get sizeForTesting(){return this.#e.size}};v6o=new R6o});
export {svc,Si,GKe,R6o,v6o,ud};
