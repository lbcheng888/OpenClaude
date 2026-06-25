// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {checkHasTrustDialogAccepted,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {BGn,MDe,dS} from "../src/config/4460_source.ts";
import {clearPluginCache,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {kuc,Huc} from "../src/telemetry/5638_plugins.ts";
import {b} from "../runtime.ts";
async function Iuc(e){if(logForDebugging("performStartupChecks called"),!checkHasTrustDialogAccepted()){logForDebugging("Trust not accepted for current directory - skipping plugin installations");return}try{if(logForDebugging("Starting background plugin installations"),await BGn())MDe(),clearPluginCache("performStartupChecks: seed marketplaces changed"),e((n)=>{if(n.plugins.needsRefresh)return n;return{...n,plugins:{...n.plugins,needsRefresh:!0}}});await kuc(e)}catch(t){logForDebugging(`Error initiating background plugin installations: ${t}`)}}
var xuc=b(()=>{Huc();tr();qe();dS();path()});
export {Iuc,xuc};
