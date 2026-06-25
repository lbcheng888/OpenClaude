// @ts-nocheck
import {B2,eS,zM} from "./m2240.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {If,vu} from "../src/mcp/2200_mcpServerName.ts";
import {fA,wm} from "./m707.ts";
import {getSettingsFilePathForSource,getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {bu,oS} from "../src/config/2605_event_name.ts";
import {dl,dn} from "../src/config/0137_namespace.ts";
import {Z7,k8} from "./m2238.ts";
import {ts,oh} from "./m2600.ts";
import {xwe,j2e,Uhe,slowOpTracer} from "../src/telemetry/2606_skill_name.ts";
import {e$,Fhe} from "../src/agent/2600_attributionMcpServer.ts";
import {b} from "../runtime.ts";
function Cfc(e,t){if(B2())return;if(buildMcpToolName("hooks"))return;let n=If(),r=eS(),o=new Set;for(let i of fA){if(r&&i!=="policySettings")continue;let a=getSettingsFilePathForSource(i);if(a){let c=Efc.resolve(a);if(o.has(c))continue;o.add(c)}let l=getSettingsForSource(i)?.hooks;if(!l)continue;for(let[c,u]of Object.entries(l))for(let d of u)for(let p of d.hooks)bu("hook_registered",{hook_event:c,hook_type:p.type,hook_source:i,safe_mode:String(dl()),...n&&d.matcher&&{hook_matcher:d.matcher}})}let s=r&&!dl()?Z7():null;for(let i of e){if(!i.hooksConfig)continue;if(r&&!s?.has(i.source))continue;let{marketplace:a}=ts(i.repository),l=xwe(j2e(i.name,a,t))||n;for(let[c,u]of Object.entries(i.hooksConfig))for(let d of u)for(let p of d.hooks)bu("hook_registered",{hook_event:c,hook_type:p.type,hook_source:"pluginHook",safe_mode:String(dl()),"plugin.name":l?i.name:e$,plugin_id_hash:Uhe(i.name,a),...n&&d.matcher&&{hook_matcher:d.matcher}})}}
var Efc;
var Afc=b(()=>{vu();ky();dn();zM();Fhe();k8();oh();wm();br();oS();slowOpTracer();Efc=require("path")});
export {Cfc,Efc,Afc};
