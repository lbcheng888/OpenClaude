// @ts-nocheck
import {si,gT} from "./m2190.ts";
import {withOAuth401Retry,fk} from "../src/api/2032_withOAuth401Retry.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {Se,bt} from "./m195.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {isClaudeAISubscriber,hasProfileScope,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
import {u8,qMe} from "./m637.ts";
async function Y7d(){let e=await si.get("/api/claude_code/organizations/metrics_enabled",{auth:"async",timeout:5000,bypassEssentialTrafficOnly:!0});if(!e.ok)throw Error(e.reason==="no-auth"?`Auth error: ${e.detail}`:`metrics_enabled unavailable: ${e.reason}`);return e.data}
async function J7d(){try{let e=await withOAuth401Retry(Y7d,{also403Revoked:!0});return logForDebugging(`Metrics opt-out API response: enabled=${e.metrics_logging_enabled}`),Ie("api_metrics_opt_out_check"),{enabled:e.metrics_logging_enabled,hasError:!1}}catch(e){return logForDebugging(`Failed to check metrics opt-out status: ${Se(e)}`,{level:"error"}),Oe("api_metrics_opt_out_check","request_failed"),{enabled:!1,hasError:!0}}}
async function Qpa(){let e=await X7d();if(e.hasError)return e;let t=getGlobalConfig().metricsStatusCache;if(t!==void 0&&t.enabled===e.enabled&&Date.now()-t.timestamp<Zpa)return e;return saveGlobalConfig((r)=>({...r,metricsStatusCache:{enabled:e.enabled,timestamp:Date.now()}})),e}
async function ema(){if(isClaudeAISubscriber()&&!hasProfileScope())return{enabled:!1,hasError:!1};let e=getGlobalConfig().metricsStatusCache;if(e){if(Date.now()-e.timestamp>Zpa)Qpa().catch(De);return{enabled:e.enabled,hasError:!1}}return Qpa()}
var z7d=3600000,Zpa=86400000,X7d;
var tma=b(()=>{Ao();Qn();qe();bt();fk();Rn();u8();ln();gT();X7d=qMe(J7d,z7d)});
export {Y7d,J7d,Qpa,ema,z7d,Zpa,X7d,tma};
