// @ts-nocheck
import {X} from "../runtime.ts";
import {oQr} from "./m3388.ts";
import {aQr} from "./m3390.ts";
import {lQr} from "./m3391.ts";
import {UNt} from "./m3389.ts";
var Uda=X((tPn)=>{Object.defineProperty(tPn,"__esModule",{value:!0});tPn.AsyncMetricStorage=void 0;var jVd=oQr(),WVd=aQr(),GVd=lQr(),VVd=UNt();class Fda extends jVd.MetricStorage{_attributesProcessor;_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;constructor(e,t,n,r,o){super(e);this._attributesProcessor=n,this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new WVd.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new GVd.TemporalMetricProcessor(t,r)}record(e,t){let n=new VVd.AttributeHashMap;Array.from(e.entries()).forEach(([r,o])=>{n.set(this._attributesProcessor.process(r),o)}),this._deltaMetricStorage.batchCumulate(n,t)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}tPn.AsyncMetricStorage=Fda});
export {Uda};
