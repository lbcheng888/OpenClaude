// @ts-nocheck
import {X} from "../runtime.ts";
import {wFt} from "./m3706.ts";
import {HCa} from "./m3708.ts";
import {LCa} from "./m3713.ts";
import {qCa} from "./m3715.ts";
import {WCa} from "./m3716.ts";
import {QCa} from "./m3718.ts";
import {eva} from "./m3719.ts";
import {W1n} from "./m3720.ts";
var iva=X((G1n)=>{Object.defineProperty(G1n,"__esModule",{value:!0});G1n.MeterSharedState=void 0;var $cp=wFt(),qcp=HCa(),jcp=LCa(),Wcp=qCa(),Gcp=WCa(),Vcp=QCa(),Kcp=eva(),zcp=W1n();class sva{metricStorageRegistry=new Wcp.MetricStorageRegistry;observableRegistry=new Vcp.ObservableRegistry;meter;_meterProviderSharedState;_instrumentationScope;constructor(e,t){this.meter=new qcp.Meter(this),this._meterProviderSharedState=e,this._instrumentationScope=t}registerMetricStorage(e){let t=this._registerMetricStorage(e,Kcp.SyncMetricStorage);if(t.length===1)return t[0];return new Gcp.MultiMetricStorage(t)}registerAsyncMetricStorage(e){return this._registerMetricStorage(e,jcp.AsyncMetricStorage)}async collect(e,t,n){let r=await this.observableRegistry.observe(t,n?.timeoutMillis),o=this.metricStorageRegistry.getStorages(e);if(o.length===0)return null;let s=[];if(o.forEach((i)=>{let a=i.collect(e,t);if(a!=null)s.push(a)}),s.length===0)return{errors:r};return{scopeMetrics:{scope:this._instrumentationScope,metrics:s},errors:r}}_registerMetricStorage(e,t){let r=this._meterProviderSharedState.viewRegistry.findViews(e,this._instrumentationScope).map((o)=>{let s=(0,$cp.createInstrumentDescriptorWithView)(o,e),i=this.metricStorageRegistry.findOrUpdateCompatibleStorage(s);if(i!=null)return i;let a=o.aggregation.createAggregator(s),l=new t(s,a,o.attributesProcessor,this._meterProviderSharedState.metricCollectors,o.aggregationCardinalityLimit);return this.metricStorageRegistry.register(l),l});if(r.length===0){let s=this._meterProviderSharedState.selectAggregations(e.type).map(([i,a])=>{let l=this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(i,e);if(l!=null)return l;let c=a.createAggregator(e),u=i.selectCardinalityLimit(e.type),d=new t(e,c,(0,zcp.createNoopAttributesProcessor)(),[i],u);return this.metricStorageRegistry.registerForCollector(i,d),d});r=r.concat(s)}return r}}G1n.MeterSharedState=sva});
export {iva};
