// @ts-nocheck
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
import {checkHasTrustDialogAccepted,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {ema,tma} from "./m3427.ts";
import {getAuthHeaders,fk} from "../src/api/2032_withOAuth401Retry.ts";
import {tg} from "../src/config/0048_ISSUES_EXPLAINER.ts";
import {fo} from "./m566.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Se,_o,bt} from "./m195.ts";
import {isClaudeAISubscriber,getSubscriptionType,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {b,M} from "../runtime.ts";
import {Gp} from "./m567.ts";
import {ag} from "./m2133.ts";
import {jNt} from "./m3408.ts";
class EQr{endpoint;timeout;pendingExports=[];isShutdown=!1;constructor(e={}){let t=`${getOauthConfig().BASE_API_URL}/api/claude_code/metrics`;this.endpoint=t,this.timeout=e.timeout||5000}async export(e,t){if(this.isShutdown){t({code:X9e.ExportResultCode.FAILED,error:Error("Exporter has been shutdown")});return}let n=this.doExport(e,t);this.pendingExports.push(n),n.finally(()=>{let r=this.pendingExports.indexOf(n);if(r>-1)this.pendingExports.splice(r,1)})}async doExport(e,t){try{if(!(checkHasTrustDialogAccepted()||getIsNonInteractiveSession())){logForDebugging("BigQuery metrics export: trust not established, skipping"),t({code:X9e.ExportResultCode.SUCCESS});return}if(!(await ema()).enabled){logForDebugging("Metrics export disabled by organization setting"),t({code:X9e.ExportResultCode.SUCCESS});return}let o=this.transformMetricsForInternal(e),s=getAuthHeaders();if(s.error){logForDebugging(`Metrics export failed: ${s.error}`),t({code:X9e.ExportResultCode.FAILED,error:Error(s.error)});return}let i={"Content-Type":"application/json","User-Agent":tg(),...s.headers},a=await fo.post(this.endpoint,o,{timeout:this.timeout,headers:i});logForDebugging("BigQuery metrics exported successfully"),logForDebugging(`BigQuery API Response: ${Le(a.data,null,2)}`),t({code:X9e.ExportResultCode.SUCCESS})}catch(n){logForDebugging(`BigQuery metrics export failed: ${Se(n)}`,{level:"error"}),t({code:X9e.ExportResultCode.FAILED,error:_o(n)})}}transformMetricsForInternal(e){let t=e.resource.attributes,n={"service.name":t["service.name"]||"claude-code","service.version":t["service.version"]||"unknown","os.type":t["os.type"]||"unknown","os.version":t["os.version"]||"unknown","host.arch":t["host.arch"]||"unknown","aggregation.temporality":this.selectAggregationTemporality()===bQr.AggregationTemporality.DELTA?"delta":"cumulative"};if(t["wsl.version"])n["wsl.version"]=t["wsl.version"];if(isClaudeAISubscriber()){n["user.customer_type"]="claude_ai";let o=getSubscriptionType();if(o)n["user.subscription_type"]=o}else n["user.customer_type"]="api";return{resource_attributes:n,metrics:e.scopeMetrics.flatMap((o)=>o.metrics.map((s)=>({name:s.descriptor.name,description:s.descriptor.description,unit:s.descriptor.unit,data_points:this.extractDataPoints(s)})))}}extractDataPoints(e){return(e.dataPoints||[]).filter((n)=>typeof n.value==="number").map((n)=>({attributes:this.convertAttributes(n.attributes),value:n.value,timestamp:this.hrTimeToISOString(n.endTime||n.startTime||[Date.now()/1000,0])}))}async shutdown(){this.isShutdown=!0,await this.forceFlush(),logForDebugging("BigQuery metrics exporter shutdown complete")}async forceFlush(){await Promise.all(this.pendingExports),logForDebugging("BigQuery metrics exporter flush complete")}convertAttributes(e){let t={};if(e){for(let[n,r]of Object.entries(e))if(r!==void 0&&r!==null)t[n]=String(r)}return t}hrTimeToISOString(e){let[t,n]=e;return new Date(t*1000+n/1e6).toISOString()}selectAggregationTemporality(){return bQr.AggregationTemporality.DELTA}}
var X9e,bQr;
var nma=b(()=>{Gp();Dc();tma();lt();Ao();Qn();qe();bt();fk();Xt();X9e=M(ag(),1),bQr=M(jNt(),1)});
export {EQr,X9e,bQr,nma};
