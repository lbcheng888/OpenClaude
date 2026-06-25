// @ts-nocheck
import {Xe,Zs} from "./m2216.ts";
import {b2n,C0e} from "../src/hooks/4360_isCollapsible.ts";
import {isCronFeatureEnabled} from "../src/tui/3853_mode.ts";
import {S3n,Ypo} from "../src/agent/4040_Ypo.ts";
import {bG,hS} from "../src/agent/4362_toolUseCount.ts";
import {b} from "../runtime.ts";
function qTe(e){return e==="completed"||e==="failed"||e==="killed"}
function VIl(e,t){let{isIdle:n,awaitingApproval:r,hasError:o,shutdownRequested:s}=t??{};if(o)return Xe.cross;if(r)return Xe.questionMarkPrefix;if(s)return Xe.warning;if(e==="running"){if(n)return Xe.ellipsis;return Xe.play}if(e==="completed")return Xe.tick;if(e==="failed"||e==="killed")return Xe.cross;if(e==="paused")return Xe.hamburger;return Xe.bullet}
function KIl(e,t){let{isIdle:n,awaitingApproval:r,hasError:o,shutdownRequested:s}=t??{};if(o)return"error";if(r)return"warning";if(s)return"warning";if(n)return"background";if(e==="completed")return"success";if(e==="failed")return"error";if(e==="killed")return"warning";if(e==="paused")return"warning";return"background"}
function fgt(e){if(e.shutdownRequested)return"stopping";if(e.awaitingPlanApproval)return"awaiting approval";if(e.isIdle)return"idle";return(e.progress?.recentActivities&&b2n(e.progress.recentActivities))??e.progress?.lastActivity?.activityDescription??"working"}
function hgt(e){return isCronFeatureEnabled(e)&&e.type!=="local_workflow"&&!(S3n()&&(bG(e)||e.type==="in_process_teammate"))}
var WTe=b(()=>{Zs();hS();Ypo();C0e()});
export {qTe,VIl,KIl,fgt,hgt,WTe};
