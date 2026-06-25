// @ts-nocheck
import {Q} from "../runtime.ts";
import {pg} from "./m2138.ts";
var Lya=Q((ULn)=>{Object.defineProperty(ULn,"__esModule",{value:!0});ULn.InMemoryMetricExporter=void 0;var Pya=pg();class Oya{_shutdown=!1;_aggregationTemporality;_metrics=[];constructor(e){this._aggregationTemporality=e}export(e,t){if(this._shutdown){setTimeout(()=>t({code:Pya.ExportResultCode.FAILED}),0);return}this._metrics.push(e),setTimeout(()=>t({code:Pya.ExportResultCode.SUCCESS}),0)}getMetrics(){return this._metrics}forceFlush(){return Promise.resolve()}reset(){this._metrics=[]}selectAggregationTemporality(e){return this._aggregationTemporality}shutdown(){return this._shutdown=!0,Promise.resolve()}}ULn.InMemoryMetricExporter=Oya});
export {Lya};
