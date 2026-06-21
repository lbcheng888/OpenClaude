// @ts-nocheck
import {X} from "../runtime.ts";
import {FNt} from "./m3385.ts";
import {Lda} from "./m3387.ts";
import {Yee} from "./m3362.ts";
import {Uda} from "./m3392.ts";
import {Kda} from "./m3394.ts";
import {Yda} from "./m3395.ts";
import {rpa} from "./m3397.ts";
import {spa} from "./m3398.ts";
import {aPn} from "./m3399.ts";
var dpa=X((lPn)=>{Object.defineProperty(lPn,"__esModule",{value:!0});lPn.MeterSharedState=void 0;var i7d=FNt(),a7d=Lda(),l7d=Yee(),c7d=Uda(),u7d=Kda(),d7d=Yda(),p7d=rpa(),m7d=spa(),f7d=aPn();class upa{_meterProviderSharedState;_instrumentationScope;metricStorageRegistry=new u7d.MetricStorageRegistry;observableRegistry=new p7d.ObservableRegistry;meter;constructor(e,t){this._meterProviderSharedState=e,this._instrumentationScope=t,this.meter=new a7d.Meter(this)}registerMetricStorage(e){let t=this._registerMetricStorage(e,m7d.SyncMetricStorage);if(t.length===1)return t[0];return new d7d.MultiMetricStorage(t)}registerAsyncMetricStorage(e){return this._registerMetricStorage(e,c7d.AsyncMetricStorage)}async collect(e,t,n){let r=await this.observableRegistry.observe(t,n?.timeoutMillis),o=this.metricStorageRegistry.getStorages(e);if(o.length===0)return null;let s=o.map((i)=>i.collect(e,t)).filter(l7d.isNotNullish);if(s.length===0)return{errors:r};return{scopeMetrics:{scope:this._instrumentationScope,metrics:s},errors:r}}_registerMetricStorage(e,t){let r=this._meterProviderSharedState.viewRegistry.findViews(e,this._instrumentationScope).map((o)=>{let s=(0,i7d.createInstrumentDescriptorWithView)(o,e),i=this.metricStorageRegistry.findOrUpdateCompatibleStorage(s);if(i!=null)return i;let a=o.aggregation.createAggregator(s),l=new t(s,a,o.attributesProcessor,this._meterProviderSharedState.metricCollectors,o.aggregationCardinalityLimit);return this.metricStorageRegistry.register(l),l});if(r.length===0){let s=this._meterProviderSharedState.selectAggregations(e.type).map(([i,a])=>{let l=this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(i,e);if(l!=null)return l;let c=a.createAggregator(e),u=i.selectCardinalityLimit(e.type),d=new t(e,c,(0,f7d.createNoopAttributesProcessor)(),[i],u);return this.metricStorageRegistry.registerForCollector(i,d),d});r=r.concat(s)}return r}}lPn.MeterSharedState=upa});
export {dpa};
