// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var z_i=Q((uSn)=>{Object.defineProperty(uSn,"__esModule",{value:!0});uSn.CompositePropagator=void 0;var V_i=xi();class K_i{_propagators;_fields;constructor(e={}){this._propagators=e.propagators??[],this._fields=Array.from(new Set(this._propagators.map((t)=>typeof t.fields==="function"?t.fields():[]).reduce((t,n)=>t.concat(n),[])))}inject(e,t,n){for(let r of this._propagators)try{r.inject(e,t,n)}catch(o){V_i.diag.warn(`Failed to inject with ${r.constructor.name}. Err: ${o.message}`)}}extract(e,t,n){return this._propagators.reduce((r,o)=>{try{return o.extract(r,t,n)}catch(s){V_i.diag.warn(`Failed to extract with ${o.constructor.name}. Err: ${s.message}`)}return r},e)}fields(){return this._fields.slice()}}uSn.CompositePropagator=K_i});
export {z_i};
