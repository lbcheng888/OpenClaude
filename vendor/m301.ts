// @ts-nocheck
import {b} from "../runtime.ts";
class $ZodRegistry{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];if(this._map.set(e,n),n&&typeof n==="object"&&"id"in n){if(this._idmap.has(n.id))throw Error(`ID ${n.id} already exists in the registry`);this._idmap.set(n.id,e)}return this}remove(e){return this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};return delete n.id,{...n,...this._map.get(e)}}return this._map.get(e)}has(e){return this._map.has(e)}}
function registry(){return new $ZodRegistry}
var $output,$input,globalRegistry;
var xar=b(()=>{$output=Symbol("ZodOutput"),$input=Symbol("ZodInput");globalRegistry=registry()});
export {$ZodRegistry,registry,$output,$input,globalRegistry,xar};
