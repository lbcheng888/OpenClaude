// @ts-nocheck
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {eS,zM} from "./m2240.ts";
import {dl,dn} from "../src/config/0137_namespace.ts";
import {Z7,k8} from "./m2238.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Oje,pf} from "../src/config/0693_timestamp.ts";
import {loadPluginHooks,e9e} from "./m2778.ts";
import {getMainThreadAgentType,lt} from "../src/session/0132_sent.ts";
import {executeSessionStartHooks,executeSetupHooks} from "./m5195.ts";
import {clearCommandsCache,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {resetSentSkillNames,createAttachmentMessage,GA} from "../src/agent/4451_tryGetPDFReference.ts";
import {oB,zke} from "./m2779.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {t8i,m1t} from "./m2777.ts";
import {b} from "../runtime.ts";
import {Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
function o8i(){let e=gzr;return gzr=void 0,e}
function vot(){let e=_zr;return _zr=void 0,e}
async function gW(e,{sessionId:t,sessionTitle:n,agentType:r,model:o,forceSyncExecution:s}={}){if(buildMcpToolName("hooks"))return[];let i=[],a=[],l=[],c,u=!1;if(eS()&&(dl()||Z7()===null))logForDebugging(dl()?"Skipping plugin hooks - safe mode disables plugins (managed settings-file hooks still run)":"Skipping plugin hooks - allowManagedHooksOnly is enabled and no managed plugins");else try{await Oje("load_plugin_hooks",()=>loadPluginHooks())}catch(p){let m=p instanceof Error?p.message:String(p),f="";if(m.includes("Failed to clone")||m.includes("network")||m.includes("ETIMEDOUT")||m.includes("ENOTFOUND"))f="This appears to be a network issue. Check your internet connection and try again.";else if(m.includes("Permission denied")||m.includes("EACCES")||m.includes("EPERM"))f="This appears to be a permissions issue. Check file permissions on ~/.claude/plugins/";else if(m.includes("Invalid")||m.includes("parse")||m.includes("JSON")||m.includes("schema"))f="This appears to be a configuration issue. Check your plugin settings in .claude/settings.json";else f="Please fix the plugin configuration or remove problematic plugins from your settings.";logForDebugging(`Warning: Failed to load plugin hooks. SessionStart hooks from plugins will not execute. Error: ${m}. ${f}`,{level:"error"})}let d=r??getMainThreadAgentType();for await(let p of executeSessionStartHooks(e,t,n,d,o,void 0,void 0,s)){if(p.message)i.push(p.message);if(p.additionalContexts&&p.additionalContexts.length>0)a.push(...p.additionalContexts);if(p.initialUserMessage)gzr=p.initialUserMessage;if(p.sessionTitle)c=p.sessionTitle;if(p.watchPaths&&p.watchPaths.length>0)l.push(...p.watchPaths);if(p.reloadSkills)u=!0}if(u)clearCommandsCache(),resetSentSkillNames(),oB.emit(),He("hook_session_start_reload_skills");if(_zr=e==="startup"||e==="resume"?c:void 0,l.length>0)t8i(l);if(a.length>0){let p=createAttachmentMessage({type:"hook_additional_context",content:a,hookName:"SessionStart",toolUseID:"SessionStart",hookEvent:"SessionStart"});i.push(p)}return i}
async function s8i(e,{forceSyncExecution:t}={}){if(buildMcpToolName("hooks"))return[];let n=[],r=[];if(eS()&&(dl()||Z7()===null))logForDebugging(dl()?"Skipping plugin hooks - safe mode disables plugins (managed settings-file hooks still run)":"Skipping plugin hooks - allowManagedHooksOnly is enabled and no managed plugins");else try{await loadPluginHooks()}catch(o){let s=o instanceof Error?o.message:String(o);logForDebugging(`Warning: Failed to load plugin hooks. Setup hooks from plugins will not execute. Error: ${s}`,{level:"warn"})}for await(let o of executeSetupHooks(e,void 0,void 0,t)){if(o.message)n.push(o.message);if(o.additionalContexts&&o.additionalContexts.length>0)r.push(...o.additionalContexts)}if(r.length>0){let o=createAttachmentMessage({type:"hook_additional_context",content:r,hookName:"Setup",toolUseID:"Setup",hookEvent:"Setup"});n.push(o)}return n}
var gzr,_zr;
var jke=b(()=>{lt();Mm();mn();GA();ky();qe();pf();dn();m1t();zM();Wd();e9e();k8();zke()});
export {o8i,vot,gW,s8i,gzr,_zr,jke};
