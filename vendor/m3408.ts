// @ts-nocheck
import {Q} from "../runtime.ts";
import {Uno} from "./m3404.ts";
import {Wno} from "./m3406.ts";
import {Gno} from "./m3407.ts";
import {gUt} from "./m3405.ts";
var tTa=Q((jLn)=>{Object.defineProperty(jLn,"__esModule",{value:!0});jLn.AsyncMetricStorage=void 0;var Inp=Uno(),xnp=Wno(),Dnp=Gno(),Pnp=gUt();class eTa extends Inp.MetricStorage{_attributesProcessor;_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;constructor(e,t,n,r,o){super(e);this._attributesProcessor=n,this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new xnp.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new Dnp.TemporalMetricProcessor(t,r)}record(e,t){let n=new Pnp.AttributeHashMap;Array.from(e.entries()).forEach(([r,o])=>{n.set(this._attributesProcessor.process(r),o)}),this._deltaMetricStorage.batchCumulate(n,t)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}jLn.AsyncMetricStorage=eTa});
export {tTa};
