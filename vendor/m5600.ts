// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {checkHasTrustDialogAccepted,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {yjn,U0e,hS} from "../src/config/4438_source.ts";
import {ax,gg} from "../src/agent/4445_resolvePluginRoot.ts";
import {Utc,$tc} from "../src/telemetry/5600_plugins.ts";
import {b} from "../runtime.ts";
async function qtc(e){if(logForDebugging("performStartupChecks called"),!checkHasTrustDialogAccepted()){logForDebugging("Trust not accepted for current directory - skipping plugin installations");return}try{if(logForDebugging("Starting background plugin installations"),await yjn())U0e(),ax("performStartupChecks: seed marketplaces changed"),e((n)=>{if(n.plugins.needsRefresh)return n;return{...n,plugins:{...n.plugins,needsRefresh:!0}}});await Utc(e)}catch(t){logForDebugging(`Error initiating background plugin installations: ${t}`)}}
var jtc=b(()=>{$tc();Qn();qe();hS();gg()});
export {qtc,jtc};
