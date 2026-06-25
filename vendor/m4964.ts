// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {spawnForkFromDirective,pCo} from "../src/agent/4485_spawnForkFromDirective.ts";
import {hasPermissionsToUseTool,ly} from "../src/tools/5218_toolAlwaysAllowedRule.ts";
import {yw,jz} from "../src/config/2716_jz.ts";
import {Yje,Pa} from "./m720.ts";
var wPl={};
ft(wPl,{call:()=>fgm});
var fgm=async(e,t,n)=>{let r=n.trim();if(!r)return e("Usage: /fork \\<directive\\>",{display:"system"}),null;let o=await spawnForkFromDirective(r,t,t.canUseTool??hasPermissionsToUseTool);if(!o)return e(yw()?"Forking is not available in coordinator sessions. Use /branch instead.":"Cannot fork before the first conversation turn",{display:"system"}),null;return e(`${Yje} forked ${o.name} (${o.agentId.slice(-4)})`,{display:"system"}),null};
var kPl=b(()=>{Pa();jz();pCo();ly()});
export {wPl,fgm,kPl};
