// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {spawnForkFromDirective,g_o} from "../src/agent/4463_spawnForkFromDirective.ts";
import {hasPermissionsToUseTool,ay} from "../src/tools/5184_toolAlwaysAllowedRule.ts";
import {ix,Sz} from "../src/config/2704_Sz.ts";
import {X7e,sl} from "./m715.ts";
var pwl={};
isFullscreenWithTTY(pwl,{call:()=>nam});
var nam=async(e,t,n)=>{let r=n.trim();if(!r)return e("Usage: /fork \\<directive\\>",{display:"system"}),null;let o=await spawnForkFromDirective(r,t,t.canUseTool??hasPermissionsToUseTool);if(!o)return e(ix()?"Forking is not available in coordinator sessions. Use /branch instead.":"Cannot fork before the first conversation turn",{display:"system"}),null;return e(`${X7e} forked ${o.name} (${o.agentId.slice(-4)})`,{display:"system"}),null};
var mwl=b(()=>{sl();Sz();g_o();ay()});
export {pwl,nam,mwl};
