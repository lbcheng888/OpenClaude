// @ts-nocheck
import {Q} from "../runtime.ts";
import {n$t} from "./m3722.ts";
import {V0a} from "./m3724.ts";
import {J0a} from "./m3729.ts";
import {rxa} from "./m3731.ts";
import {sxa} from "./m3732.ts";
import {mxa} from "./m3734.ts";
import {hxa} from "./m3735.ts";
import {NBn} from "./m3736.ts";
var bxa=Q((FBn)=>{Object.defineProperty(FBn,"__esModule",{value:!0});FBn.MeterSharedState=void 0;var kSp=n$t(),HSp=V0a(),ISp=J0a(),xSp=rxa(),DSp=sxa(),PSp=mxa(),OSp=hxa(),LSp=NBn();class Sxa{metricStorageRegistry=new xSp.MetricStorageRegistry;observableRegistry=new PSp.ObservableRegistry;meter;_meterProviderSharedState;_instrumentationScope;constructor(e,t){this.meter=new HSp.Meter(this),this._meterProviderSharedState=e,this._instrumentationScope=t}registerMetricStorage(e){let t=this._registerMetricStorage(e,OSp.SyncMetricStorage);if(t.length===1)return t[0];return new DSp.MultiMetricStorage(t)}registerAsyncMetricStorage(e){return this._registerMetricStorage(e,ISp.AsyncMetricStorage)}async collect(e,t,n){let r=await this.observableRegistry.observe(t,n?.timeoutMillis),o=this.metricStorageRegistry.getStorages(e);if(o.length===0)return null;let s=[];if(o.forEach((i)=>{let a=i.collect(e,t);if(a!=null)s.push(a)}),s.length===0)return{errors:r};return{scopeMetrics:{scope:this._instrumentationScope,metrics:s},errors:r}}_registerMetricStorage(e,t){let r=this._meterProviderSharedState.viewRegistry.findViews(e,this._instrumentationScope).map((o)=>{let s=(0,kSp.createInstrumentDescriptorWithView)(o,e),i=this.metricStorageRegistry.findOrUpdateCompatibleStorage(s);if(i!=null)return i;let a=o.aggregation.createAggregator(s),l=new t(s,a,o.attributesProcessor,this._meterProviderSharedState.metricCollectors,o.aggregationCardinalityLimit);return this.metricStorageRegistry.register(l),l});if(r.length===0){let s=this._meterProviderSharedState.selectAggregations(e.type).map(([i,a])=>{let l=this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(i,e);if(l!=null)return l;let c=a.createAggregator(e),u=i.selectCardinalityLimit(e.type),d=new t(e,c,(0,LSp.createNoopAttributesProcessor)(),[i],u);return this.metricStorageRegistry.registerForCollector(i,d),d});r=r.concat(s)}return r}}FBn.MeterSharedState=Sxa});
export {bxa};
