// @ts-nocheck
import {X} from "../runtime.ts";
import {xno} from "./m3709.ts";
import {Ino} from "./m3711.ts";
import {Dno} from "./m3712.ts";
var eva=X((j1n)=>{Object.defineProperty(j1n,"__esModule",{value:!0});j1n.SyncMetricStorage=void 0;var Pcp=xno(),Ocp=Ino(),Lcp=Dno();class ZCa extends Pcp.MetricStorage{_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;_attributesProcessor;constructor(e,t,n,r,o){super(e);this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new Ocp.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new Lcp.TemporalMetricProcessor(t,r),this._attributesProcessor=n}record(e,t,n,r){t=this._attributesProcessor.process(t,n),this._deltaMetricStorage.record(e,t,n,r)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}j1n.SyncMetricStorage=ZCa});
export {eva};
