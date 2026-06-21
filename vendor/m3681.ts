// @ts-nocheck
import {X} from "../runtime.ts";
import {ute} from "./m3657.ts";
import {hno} from "./m3677.ts";
var UEa=X((f1n)=>{Object.defineProperty(f1n,"__esModule",{value:!0});f1n.ConsoleMetricExporter=void 0;var FEa=ute(),glp=hno();class _no{_shutdown=!1;_temporalitySelector;constructor(e){this._temporalitySelector=e?.temporalitySelector??glp.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR}export(e,t){if(this._shutdown){t({code:FEa.ExportResultCode.FAILED});return}return _no._sendMetrics(e,t)}forceFlush(){return Promise.resolve()}selectAggregationTemporality(e){return this._temporalitySelector(e)}shutdown(){return this._shutdown=!0,Promise.resolve()}static _sendMetrics(e,t){for(let n of e.scopeMetrics)for(let r of n.metrics)console.dir({descriptor:r.descriptor,dataPointType:r.dataPointType,dataPoints:r.dataPoints},{depth:null});t({code:FEa.ExportResultCode.SUCCESS})}}f1n.ConsoleMetricExporter=_no});
export {UEa};
