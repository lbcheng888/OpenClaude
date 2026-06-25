// @ts-nocheck
import {Q} from "../runtime.ts";
import {Uno} from "./m3404.ts";
import {Wno} from "./m3406.ts";
import {Gno} from "./m3407.ts";
var STa=Q((ZLn)=>{Object.defineProperty(ZLn,"__esModule",{value:!0});ZLn.SyncMetricStorage=void 0;var Bnp=Uno(),Unp=Wno(),$np=Gno();class TTa extends Bnp.MetricStorage{_attributesProcessor;_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;constructor(e,t,n,r,o){super(e);this._attributesProcessor=n,this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new Unp.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new $np.TemporalMetricProcessor(t,r)}record(e,t,n,r){t=this._attributesProcessor.process(t,n),this._deltaMetricStorage.record(e,t,n,r)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}ZLn.SyncMetricStorage=TTa});
export {STa};
