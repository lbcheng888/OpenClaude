// @ts-nocheck
import {Q} from "../runtime.ts";
import {uao} from "./m3725.ts";
import {mao} from "./m3727.ts";
import {fao} from "./m3728.ts";
var hxa=Q((MBn)=>{Object.defineProperty(MBn,"__esModule",{value:!0});MBn.SyncMetricStorage=void 0;var SSp=uao(),bSp=mao(),ESp=fao();class fxa extends SSp.MetricStorage{_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;_attributesProcessor;constructor(e,t,n,r,o){super(e);this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new bSp.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new ESp.TemporalMetricProcessor(t,r),this._attributesProcessor=n}record(e,t,n,r){t=this._attributesProcessor.process(t,n),this._deltaMetricStorage.record(e,t,n,r)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}MBn.SyncMetricStorage=fxa});
export {hxa};
