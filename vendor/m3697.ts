// @ts-nocheck
import {Q} from "../runtime.ts";
import {ote} from "./m3673.ts";
import {Qio} from "./m3693.ts";
var t0a=Q((aBn)=>{Object.defineProperty(aBn,"__esModule",{value:!0});aBn.ConsoleMetricExporter=void 0;var e0a=ote(),oTp=Qio();class eao{_shutdown=!1;_temporalitySelector;constructor(e){this._temporalitySelector=e?.temporalitySelector??oTp.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR}export(e,t){if(this._shutdown){t({code:e0a.ExportResultCode.FAILED});return}return eao._sendMetrics(e,t)}forceFlush(){return Promise.resolve()}selectAggregationTemporality(e){return this._temporalitySelector(e)}shutdown(){return this._shutdown=!0,Promise.resolve()}static _sendMetrics(e,t){for(let n of e.scopeMetrics)for(let r of n.metrics)console.dir({descriptor:r.descriptor,dataPointType:r.dataPointType,dataPoints:r.dataPoints},{depth:null});t({code:e0a.ExportResultCode.SUCCESS})}}aBn.ConsoleMetricExporter=eao});
export {t0a};
