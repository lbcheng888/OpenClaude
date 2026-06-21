// @ts-nocheck
import {h$,uE,L1} from "./m2232.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {wA,$u} from "../src/mcp/2194_mcpServerName.ts";
import {Tw,mf} from "./m702.ts";
import {getSettingsFilePathForSource,getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Ou,uS} from "../src/config/2594_event_name.ts";
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {aZ,m5} from "./m2230.ts";
import {gs,sh} from "./m2589.ts";
import {zwe,zUe,RAe,tx} from "../src/telemetry/2595_skill_name.ts";
import {I$,vAe} from "../src/agent/2589_attributionMcpServer.ts";
import {b} from "../runtime.ts";
function Osc(e,t){if(h$())return;if(hc("hooks"))return;let n=wA(),r=uE(),o=new Set;for(let i of Tw){if(r&&i!=="policySettings")continue;let a=getSettingsFilePathForSource(i);if(a){let c=Psc.resolve(a);if(o.has(c))continue;o.add(c)}let l=getSettingsForSource(i)?.hooks;if(!l)continue;for(let[c,u]of Object.entries(l))for(let d of u)for(let p of d.hooks)Ou("hook_registered",{hook_event:c,hook_type:p.type,hook_source:i,safe_mode:String(Bl()),...n&&d.matcher&&{hook_matcher:d.matcher}})}let s=r&&!Bl()?aZ():null;for(let i of e){if(!i.hooksConfig)continue;if(r&&!s?.has(i.source))continue;let{marketplace:a}=gs(i.repository),l=zwe(zUe(i.name,a,t))||n;for(let[c,u]of Object.entries(i.hooksConfig))for(let d of u)for(let p of d.hooks)Ou("hook_registered",{hook_event:c,hook_type:p.type,hook_source:"pluginHook",safe_mode:String(Bl()),"plugin.name":l?i.name:I$,plugin_id_hash:RAe(i.name,a),...n&&d.matcher&&{hook_matcher:d.matcher}})}}
var Psc;
var Lsc=b(()=>{$u();Iy();sn();L1();vAe();m5();sh();mf();yr();uS();tx();Psc=require("path")});
export {Osc,Psc,Lsc};
