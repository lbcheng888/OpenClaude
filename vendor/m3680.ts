// @ts-nocheck
import {X} from "../runtime.ts";
import {ute} from "./m3657.ts";
var BEa=X((m1n)=>{Object.defineProperty(m1n,"__esModule",{value:!0});m1n.InMemoryMetricExporter=void 0;var MEa=ute();class NEa{_shutdown=!1;_aggregationTemporality;_metrics=[];constructor(e){this._aggregationTemporality=e}export(e,t){if(this._shutdown){setTimeout(()=>t({code:MEa.ExportResultCode.FAILED}),0);return}this._metrics.push(e),setTimeout(()=>t({code:MEa.ExportResultCode.SUCCESS}),0)}getMetrics(){return this._metrics}forceFlush(){return Promise.resolve()}reset(){this._metrics=[]}selectAggregationTemporality(e){return this._aggregationTemporality}shutdown(){return this._shutdown=!0,Promise.resolve()}}m1n.InMemoryMetricExporter=NEa});
export {BEa};
