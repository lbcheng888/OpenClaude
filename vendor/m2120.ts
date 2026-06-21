// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var Qdi=X((Ign)=>{Object.defineProperty(Ign,"__esModule",{value:!0});Ign.CompositePropagator=void 0;var Jdi=Xi();class Xdi{_propagators;_fields;constructor(e={}){this._propagators=e.propagators??[],this._fields=Array.from(new Set(this._propagators.map((t)=>typeof t.fields==="function"?t.fields():[]).reduce((t,n)=>t.concat(n),[])))}inject(e,t,n){for(let r of this._propagators)try{r.inject(e,t,n)}catch(o){Jdi.diag.warn(`Failed to inject with ${r.constructor.name}. Err: ${o.message}`)}}extract(e,t,n){return this._propagators.reduce((r,o)=>{try{return o.extract(r,t,n)}catch(s){Jdi.diag.warn(`Failed to extract with ${o.constructor.name}. Err: ${s.message}`)}return r},e)}fields(){return this._fields.slice()}}Ign.CompositePropagator=Xdi});
export {Qdi};
