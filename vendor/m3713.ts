// @ts-nocheck
import {X} from "../runtime.ts";
import {xno} from "./m3709.ts";
import {Ino} from "./m3711.ts";
import {Dno} from "./m3712.ts";
import {RFt} from "./m3710.ts";
var LCa=X((B1n)=>{Object.defineProperty(B1n,"__esModule",{value:!0});B1n.AsyncMetricStorage=void 0;var Ccp=xno(),vcp=Ino(),wcp=Dno(),Rcp=RFt();class OCa extends Ccp.MetricStorage{_aggregationCardinalityLimit;_deltaMetricStorage;_temporalMetricStorage;_attributesProcessor;constructor(e,t,n,r,o){super(e);this._aggregationCardinalityLimit=o,this._deltaMetricStorage=new vcp.DeltaMetricProcessor(t,this._aggregationCardinalityLimit),this._temporalMetricStorage=new wcp.TemporalMetricProcessor(t,r),this._attributesProcessor=n}record(e,t){let n=new Rcp.AttributeHashMap;for(let[r,o]of e.entries())n.set(this._attributesProcessor.process(r),o);this._deltaMetricStorage.batchCumulate(n,t)}collect(e,t){let n=this._deltaMetricStorage.collect();return this._temporalMetricStorage.buildMetrics(e,this._instrumentDescriptor,n,t)}}B1n.AsyncMetricStorage=OCa});
export {LCa};
