// @ts-nocheck
import {Q} from "../runtime.ts";
import {hUt} from "./m3401.ts";
import {Jya} from "./m3403.ts";
import {Wee} from "./m3378.ts";
import {tTa} from "./m3408.ts";
import {lTa} from "./m3410.ts";
import {uTa} from "./m3411.ts";
import {yTa} from "./m3413.ts";
import {STa} from "./m3414.ts";
import {eMn} from "./m3415.ts";
var vTa=Q((tMn)=>{Object.defineProperty(tMn,"__esModule",{value:!0});tMn.MeterSharedState=void 0;var znp=hUt(),jnp=Jya(),Ynp=Wee(),Jnp=tTa(),Xnp=lTa(),Qnp=uTa(),Znp=yTa(),erp=STa(),trp=eMn();class RTa{_meterProviderSharedState;_instrumentationScope;metricStorageRegistry=new Xnp.MetricStorageRegistry;observableRegistry=new Znp.ObservableRegistry;meter;constructor(e,t){this._meterProviderSharedState=e,this._instrumentationScope=t,this.meter=new jnp.Meter(this)}registerMetricStorage(e){let t=this._registerMetricStorage(e,erp.SyncMetricStorage);if(t.length===1)return t[0];return new Qnp.MultiMetricStorage(t)}registerAsyncMetricStorage(e){return this._registerMetricStorage(e,Jnp.AsyncMetricStorage)}async collect(e,t,n){let r=await this.observableRegistry.observe(t,n?.timeoutMillis),o=this.metricStorageRegistry.getStorages(e);if(o.length===0)return null;let s=o.map((i)=>i.collect(e,t)).filter(Ynp.isNotNullish);if(s.length===0)return{errors:r};return{scopeMetrics:{scope:this._instrumentationScope,metrics:s},errors:r}}_registerMetricStorage(e,t){let r=this._meterProviderSharedState.viewRegistry.findViews(e,this._instrumentationScope).map((o)=>{let s=(0,znp.createInstrumentDescriptorWithView)(o,e),i=this.metricStorageRegistry.findOrUpdateCompatibleStorage(s);if(i!=null)return i;let a=o.aggregation.createAggregator(s),l=new t(s,a,o.attributesProcessor,this._meterProviderSharedState.metricCollectors,o.aggregationCardinalityLimit);return this.metricStorageRegistry.register(l),l});if(r.length===0){let s=this._meterProviderSharedState.selectAggregations(e.type).map(([i,a])=>{let l=this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(i,e);if(l!=null)return l;let c=a.createAggregator(e),u=i.selectCardinalityLimit(e.type),d=new t(e,c,(0,trp.createNoopAttributesProcessor)(),[i],u);return this.metricStorageRegistry.registerForCollector(i,d),d});r=r.concat(s)}return r}}tMn.MeterSharedState=RTa});
export {vTa};
