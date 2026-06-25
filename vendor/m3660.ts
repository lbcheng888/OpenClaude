// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var OHa=Q((wFn)=>{Object.defineProperty(wFn,"__esModule",{value:!0});wFn.CompositePropagator=void 0;var DHa=xi();class PHa{_propagators;_fields;constructor(e={}){this._propagators=e.propagators??[];let t=new Set;for(let n of this._propagators){let r=typeof n.fields==="function"?n.fields():[];for(let o of r)t.add(o)}this._fields=Array.from(t)}inject(e,t,n){for(let r of this._propagators)try{r.inject(e,t,n)}catch(o){DHa.diag.warn(`Failed to inject with ${r.constructor.name}. Err: ${o.message}`)}}extract(e,t,n){return this._propagators.reduce((r,o)=>{try{return o.extract(r,t,n)}catch(s){DHa.diag.warn(`Failed to extract with ${o.constructor.name}. Err: ${s.message}`)}return r},e)}fields(){return this._fields.slice()}}wFn.CompositePropagator=PHa});
export {OHa};
