// @ts-nocheck
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
import {checkHasTrustDialogAccepted,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {hSa,gSa} from "./m3443.ts";
import {getAuthHeaders,kk} from "../src/api/2037_withOAuth401Retry.ts";
import {Fg} from "./m5.ts";
import {ho} from "./m572.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {Ce,mo,Ct} from "./m197.ts";
import {isClaudeAISubscriber,getSubscriptionType,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {b,x} from "../runtime.ts";
import {ap} from "./m573.ts";
import {pg} from "./m2138.ts";
import {TUt} from "./m3424.ts";
class sro{endpoint;timeout;pendingExports=[];isShutdown=!1;constructor(e={}){let t=`${getOauthConfig().BASE_API_URL}/api/claude_code/metrics`;this.endpoint=t,this.timeout=e.timeout||5000}async export(e,t){if(this.isShutdown){t({code:d4e.ExportResultCode.FAILED,error:Error("Exporter has been shutdown")});return}let n=this.doExport(e,t);this.pendingExports.push(n),n.finally(()=>{let r=this.pendingExports.indexOf(n);if(r>-1)this.pendingExports.splice(r,1)})}async doExport(e,t){try{if(!(checkHasTrustDialogAccepted()||getIsNonInteractiveSession())){logForDebugging("BigQuery metrics export: trust not established, skipping"),t({code:d4e.ExportResultCode.SUCCESS});return}if(!(await hSa()).enabled){logForDebugging("Metrics export disabled by organization setting"),t({code:d4e.ExportResultCode.SUCCESS});return}let o=this.transformMetricsForInternal(e),s=getAuthHeaders();if(s.error){logForDebugging(`Metrics export failed: ${s.error}`),t({code:d4e.ExportResultCode.FAILED,error:Error(s.error)});return}let i={"Content-Type":"application/json","User-Agent":Fg(),...s.headers},a=await ho.post(this.endpoint,o,{timeout:this.timeout,headers:i});logForDebugging("BigQuery metrics exported successfully"),logForDebugging(`BigQuery API Response: ${TeamDeleteToolName(a.data,null,2)}`),t({code:d4e.ExportResultCode.SUCCESS})}catch(n){logForDebugging(`BigQuery metrics export failed: ${Ce(n)}`,{level:"error"}),t({code:d4e.ExportResultCode.FAILED,error:mo(n)})}}transformMetricsForInternal(e){let t=e.resource.attributes,n={"service.name":t["service.name"]||"claude-code","service.version":t["service.version"]||"unknown","os.type":t["os.type"]||"unknown","os.version":t["os.version"]||"unknown","host.arch":t["host.arch"]||"unknown","aggregation.temporality":this.selectAggregationTemporality()===oro.AggregationTemporality.DELTA?"delta":"cumulative"};if(t["wsl.version"])n["wsl.version"]=t["wsl.version"];if(isClaudeAISubscriber()){n["user.customer_type"]="claude_ai";let o=getSubscriptionType();if(o)n["user.subscription_type"]=o}else n["user.customer_type"]="api";return{resource_attributes:n,metrics:e.scopeMetrics.flatMap((o)=>o.metrics.map((s)=>({name:s.descriptor.name,description:s.descriptor.description,unit:s.descriptor.unit,data_points:this.extractDataPoints(s)})))}}extractDataPoints(e){return(e.dataPoints||[]).filter((n)=>typeof n.value==="number").map((n)=>({attributes:this.convertAttributes(n.attributes),value:n.value,timestamp:this.hrTimeToISOString(n.endTime||n.startTime||[Date.now()/1000,0])}))}async shutdown(){this.isShutdown=!0,await this.forceFlush(),logForDebugging("BigQuery metrics exporter shutdown complete")}async forceFlush(){await Promise.all(this.pendingExports),logForDebugging("BigQuery metrics exporter flush complete")}convertAttributes(e){let t={};if(e){for(let[n,r]of Object.entries(e))if(r!==void 0&&r!==null)t[n]=String(r)}return t}hrTimeToISOString(e){let[t,n]=e;return new Date(t*1000+n/1e6).toISOString()}selectAggregationTemporality(){return oro.AggregationTemporality.DELTA}}
var d4e,oro;
var _Sa=b(()=>{ap();Sc();gSa();lt();lo();tr();qe();Ct();kk();tn();d4e=x(pg(),1),oro=x(TUt(),1)});
export {sro,d4e,oro,_Sa};
