// @ts-nocheck
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {uE,L1} from "./m2232.ts";
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {aZ,m5} from "./m2230.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {N7e,SA} from "../src/config/0689_timestamp.ts";
import {loadPluginHooks,z2e} from "./m2766.ts";
import {getMainThreadAgentType,lt} from "../src/session/0131_sent.ts";
import {executeSessionStartHooks,executeSetupHooks} from "./m5162.ts";
import {clearCommandsCache,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {resetSentSkillNames,createAttachmentMessage,Bv} from "../src/agent/4429_tryGetPDFReference.ts";
import {LF,axe} from "./m2767.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {u$i,OOt} from "./m2765.ts";
import {b} from "../runtime.ts";
import {yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
function m$i(){let e=N5r;return N5r=void 0,e}
function Snt(){let e=B5r;return B5r=void 0,e}
async function nW(e,{sessionId:t,sessionTitle:n,agentType:r,model:o,forceSyncExecution:s}={}){if(hc("hooks"))return[];let i=[],a=[],l=[],c,u=!1;if(uE()&&(Bl()||aZ()===null))logForDebugging(Bl()?"Skipping plugin hooks - safe mode disables plugins (managed settings-file hooks still run)":"Skipping plugin hooks - allowManagedHooksOnly is enabled and no managed plugins");else try{await N7e("load_plugin_hooks",()=>loadPluginHooks())}catch(p){let m=p instanceof Error?p.message:String(p),f="";if(m.includes("Failed to clone")||m.includes("network")||m.includes("ETIMEDOUT")||m.includes("ENOTFOUND"))f="This appears to be a network issue. Check your internet connection and try again.";else if(m.includes("Permission denied")||m.includes("EACCES")||m.includes("EPERM"))f="This appears to be a permissions issue. Check file permissions on ~/.claude/plugins/";else if(m.includes("Invalid")||m.includes("parse")||m.includes("JSON")||m.includes("schema"))f="This appears to be a configuration issue. Check your plugin settings in .claude/settings.json";else f="Please fix the plugin configuration or remove problematic plugins from your settings.";logForDebugging(`Warning: Failed to load plugin hooks. SessionStart hooks from plugins will not execute. Error: ${m}. ${f}`,{level:"error"})}let d=r??getMainThreadAgentType();for await(let p of executeSessionStartHooks(e,t,n,d,o,void 0,void 0,s)){if(p.message)i.push(p.message);if(p.additionalContexts&&p.additionalContexts.length>0)a.push(...p.additionalContexts);if(p.initialUserMessage)N5r=p.initialUserMessage;if(p.sessionTitle)c=p.sessionTitle;if(p.watchPaths&&p.watchPaths.length>0)l.push(...p.watchPaths);if(p.reloadSkills)u=!0}if(u)clearCommandsCache(),resetSentSkillNames(),LF.emit(),Ie("hook_session_start_reload_skills");if(B5r=e==="startup"||e==="resume"?c:void 0,l.length>0)u$i(l);if(a.length>0){let p=createAttachmentMessage({type:"hook_additional_context",content:a,hookName:"SessionStart",toolUseID:"SessionStart",hookEvent:"SessionStart"});i.push(p)}return i}
async function f$i(e,{forceSyncExecution:t}={}){if(hc("hooks"))return[];let n=[],r=[];if(uE()&&(Bl()||aZ()===null))logForDebugging(Bl()?"Skipping plugin hooks - safe mode disables plugins (managed settings-file hooks still run)":"Skipping plugin hooks - allowManagedHooksOnly is enabled and no managed plugins");else try{await loadPluginHooks()}catch(o){let s=o instanceof Error?o.message:String(o);logForDebugging(`Warning: Failed to load plugin hooks. Setup hooks from plugins will not execute. Error: ${s}`,{level:"warn"})}for await(let o of executeSetupHooks(e,void 0,void 0,t)){if(o.message)n.push(o.message);if(o.additionalContexts&&o.additionalContexts.length>0)r.push(...o.additionalContexts)}if(r.length>0){let o=createAttachmentMessage({type:"hook_additional_context",content:r,hookName:"Setup",toolUseID:"Setup",hookEvent:"Setup"});n.push(o)}return n}
var N5r,B5r;
var lxe=b(()=>{lt();Sf();ln();Bv();Iy();qe();SA();sn();OOt();L1();yp();z2e();m5();axe()});
export {m$i,Snt,nW,f$i,N5r,B5r,lxe};
