// @ts-nocheck
import {X} from "../runtime.ts";
import {oQr} from "./m3388.ts";
import {aQr} from "./m3390.ts";
import {lQr} from "./m3391.ts";
var spa=X((iPn)=>{Object.defineProperty(iPn,"__esModule",{value:!0});iPn.SyncMetricStorage=void 0;var QVd=oQr(),ZVd=aQr(),e7d=lQr();class opa extends QVd.MetricStorage{_attributesProcessor;_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;constructor(e,t,n,r,o){super(e);this._attributesProcessor=n,this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new ZVd.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new e7d.TemporalMetricProcessor(t,r)}record(e,t,n,r){t=this._attributesProcessor.process(t,n),this._deltaMetricStorage.record(e,t,n,r)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}iPn.SyncMetricStorage=opa});
export {spa};
