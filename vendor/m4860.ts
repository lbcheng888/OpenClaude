// @ts-nocheck
import {et,Ai} from "./m2208.ts";
import {RBn,LHe} from "../src/hooks/4340_isCollapsible.ts";
import {enforcementWarnDedup} from "../src/tui/3835_mode.ts";
import {MUn,uao} from "../src/agent/3972_uao.ts";
import {tG,RE} from "../src/agent/4342_toolUseCount.ts";
import {b} from "../runtime.ts";
function gye(e){return e==="completed"||e==="failed"||e==="killed"}
function Ubl(e,t){let{isIdle:n,awaitingApproval:r,hasError:o,shutdownRequested:s}=t??{};if(o)return et.cross;if(r)return et.questionMarkPrefix;if(s)return et.warning;if(e==="running"){if(n)return et.ellipsis;return et.play}if(e==="completed")return et.tick;if(e==="failed"||e==="killed")return et.cross;if(e==="paused")return et.hamburger;return et.bullet}
function $bl(e,t){let{isIdle:n,awaitingApproval:r,hasError:o,shutdownRequested:s}=t??{};if(o)return"error";if(r)return"warning";if(s)return"warning";if(n)return"background";if(e==="completed")return"success";if(e==="failed")return"error";if(e==="killed")return"warning";if(e==="paused")return"warning";return"background"}
function tft(e){if(e.shutdownRequested)return"stopping";if(e.awaitingPlanApproval)return"awaiting approval";if(e.isIdle)return"idle";return(e.progress?.recentActivities&&RBn(e.progress.recentActivities))??e.progress?.lastActivity?.activityDescription??"working"}
function nft(e){return enforcementWarnDedup(e)&&e.type!=="local_workflow"&&!(MUn()&&(tG(e)||e.type==="in_process_teammate"))}
var _ye=b(()=>{Ai();RE();uao();LHe()});
export {gye,Ubl,$bl,tft,nft,_ye};
