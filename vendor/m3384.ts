// @ts-nocheck
import {X} from "../runtime.ts";
var Cda=X((YDn)=>{Object.defineProperty(YDn,"__esModule",{value:!0});YDn.ViewRegistry=void 0;class Eda{_registeredViews=[];addView(e){this._registeredViews.push(e)}findViews(e,t){return this._registeredViews.filter((r)=>this._matchInstrument(r.instrumentSelector,e)&&this._matchMeter(r.meterSelector,t))}_matchInstrument(e,t){return(e.getType()===void 0||t.type===e.getType())&&e.getNameFilter().match(t.name)&&e.getUnitFilter().match(t.unit)}_matchMeter(e,t){return e.getNameFilter().match(t.name)&&(t.version===void 0||e.getVersionFilter().match(t.version))&&(t.schemaUrl===void 0||e.getSchemaUrlFilter().match(t.schemaUrl))}}YDn.ViewRegistry=Eda});
export {Cda};
