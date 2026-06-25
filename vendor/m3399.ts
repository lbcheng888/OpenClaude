// @ts-nocheck
import {Q} from "../runtime.ts";
import {pg} from "./m2138.ts";
import {Mno} from "./m3395.ts";
var Nya=Q(($Ln)=>{Object.defineProperty($Ln,"__esModule",{value:!0});$Ln.ConsoleMetricExporter=void 0;var Mya=pg(),gnp=Mno();class Bno{_shutdown=!1;_temporalitySelector;constructor(e){this._temporalitySelector=e?.temporalitySelector??gnp.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR}export(e,t){if(this._shutdown){setImmediate(t,{code:Mya.ExportResultCode.FAILED});return}return Bno._sendMetrics(e,t)}forceFlush(){return Promise.resolve()}selectAggregationTemporality(e){return this._temporalitySelector(e)}shutdown(){return this._shutdown=!0,Promise.resolve()}static _sendMetrics(e,t){for(let n of e.scopeMetrics)for(let r of n.metrics)console.dir({descriptor:r.descriptor,dataPointType:r.dataPointType,dataPoints:r.dataPoints},{depth:null});t({code:Mya.ExportResultCode.SUCCESS})}}$Ln.ConsoleMetricExporter=Bno});
export {Nya};
