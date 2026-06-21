// @ts-nocheck
import {X} from "../runtime.ts";
var yCa=X((D1n)=>{Object.defineProperty(D1n,"__esModule",{value:!0});D1n.ViewRegistry=void 0;class _Ca{_registeredViews=[];addView(e){this._registeredViews.push(e)}findViews(e,t){return this._registeredViews.filter((r)=>this._matchInstrument(r.instrumentSelector,e)&&this._matchMeter(r.meterSelector,t))}_matchInstrument(e,t){return(e.getType()===void 0||t.type===e.getType())&&e.getNameFilter().match(t.name)&&e.getUnitFilter().match(t.unit)}_matchMeter(e,t){return e.getNameFilter().match(t.name)&&(t.version===void 0||e.getVersionFilter().match(t.version))&&(t.schemaUrl===void 0||e.getSchemaUrlFilter().match(t.schemaUrl))}}D1n.ViewRegistry=_Ca});
export {yCa};
