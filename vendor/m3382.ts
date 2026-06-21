// @ts-nocheck
import {X} from "../runtime.ts";
import {ag} from "./m2133.ts";
var Tda=X((KDn)=>{Object.defineProperty(KDn,"__esModule",{value:!0});KDn.InMemoryMetricExporter=void 0;var _da=ag();class yda{_shutdown=!1;_aggregationTemporality;_metrics=[];constructor(e){this._aggregationTemporality=e}export(e,t){if(this._shutdown){setTimeout(()=>t({code:_da.ExportResultCode.FAILED}),0);return}this._metrics.push(e),setTimeout(()=>t({code:_da.ExportResultCode.SUCCESS}),0)}getMetrics(){return this._metrics}forceFlush(){return Promise.resolve()}reset(){this._metrics=[]}selectAggregationTemporality(e){return this._aggregationTemporality}shutdown(){return this._shutdown=!0,Promise.resolve()}}KDn.InMemoryMetricExporter=yda});
export {Tda};
