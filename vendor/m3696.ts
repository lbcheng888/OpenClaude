// @ts-nocheck
import {Q} from "../runtime.ts";
import {ote} from "./m3673.ts";
var ZIa=Q((iBn)=>{Object.defineProperty(iBn,"__esModule",{value:!0});iBn.InMemoryMetricExporter=void 0;var XIa=ote();class QIa{_shutdown=!1;_aggregationTemporality;_metrics=[];constructor(e){this._aggregationTemporality=e}export(e,t){if(this._shutdown){setTimeout(()=>t({code:XIa.ExportResultCode.FAILED}),0);return}this._metrics.push(e),setTimeout(()=>t({code:XIa.ExportResultCode.SUCCESS}),0)}getMetrics(){return this._metrics}forceFlush(){return Promise.resolve()}reset(){this._metrics=[]}selectAggregationTemporality(e){return this._aggregationTemporality}shutdown(){return this._shutdown=!0,Promise.resolve()}}iBn.InMemoryMetricExporter=QIa});
export {ZIa};
