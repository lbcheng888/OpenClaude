// @ts-nocheck
import {X} from "../runtime.ts";
import {ag} from "./m2133.ts";
import {eQr} from "./m3379.ts";
var bda=X((zDn)=>{Object.defineProperty(zDn,"__esModule",{value:!0});zDn.ConsoleMetricExporter=void 0;var Sda=ag(),kVd=eQr();class rQr{_shutdown=!1;_temporalitySelector;constructor(e){this._temporalitySelector=e?.temporalitySelector??kVd.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR}export(e,t){if(this._shutdown){setImmediate(t,{code:Sda.ExportResultCode.FAILED});return}return rQr._sendMetrics(e,t)}forceFlush(){return Promise.resolve()}selectAggregationTemporality(e){return this._temporalitySelector(e)}shutdown(){return this._shutdown=!0,Promise.resolve()}static _sendMetrics(e,t){for(let n of e.scopeMetrics)for(let r of n.metrics)console.dir({descriptor:r.descriptor,dataPointType:r.dataPointType,dataPoints:r.dataPoints},{depth:null});t({code:Sda.ExportResultCode.SUCCESS})}}zDn.ConsoleMetricExporter=rQr});
export {bda};
