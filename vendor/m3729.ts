// @ts-nocheck
import {Q} from "../runtime.ts";
import {uao} from "./m3725.ts";
import {mao} from "./m3727.ts";
import {fao} from "./m3728.ts";
import {r$t} from "./m3726.ts";
var J0a=Q((xBn)=>{Object.defineProperty(xBn,"__esModule",{value:!0});xBn.AsyncMetricStorage=void 0;var dSp=uao(),pSp=mao(),mSp=fao(),fSp=r$t();class Y0a extends dSp.MetricStorage{_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;_attributesProcessor;constructor(e,t,n,r,o){super(e);this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new pSp.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new mSp.TemporalMetricProcessor(t,r),this._attributesProcessor=n}record(e,t){let n=new fSp.AttributeHashMap;for(let[r,o]of e.entries())n.set(this._attributesProcessor.process(r),o);this._deltaMetricStorage.batchCumulate(n,t)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}xBn.AsyncMetricStorage=Y0a});
export {J0a};
