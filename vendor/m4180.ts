// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {jt,wX,ws} from "./m228.ts";
import {_$,fsModule} from "./m2246.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {AI,Mce} from "./m4173.ts";
import {ta,wn} from "./m45.ts";
import {ln,Oe,Ie} from "../src/telemetry/0594_feature_name.ts";
import {N5,TT} from "./m2583.ts";
import {gg,loadAllPluginsCacheOnly} from "../src/agent/4445_resolvePluginRoot.ts";
var N6a={};
isFullscreenWithTTY(N6a,{loadPluginWorkflows:()=>loadPluginWorkflows,clearPluginWorkflowCache:()=>clearPluginWorkflowCache});
async function O6a(e,t,n,r,o){let s=jt(),i;try{i=await s.readdir(e)}catch{return[]}return(await Promise.all(i.map(async(l)=>{if(!(l.isFile()||l.isSymbolicLink()))return null;if(!l.name.endsWith(".js"))return null;return M6a(L6a.join(e,l.name),t,n,r,o)}))).filter((l)=>l!==null)}
async function M6a(e,t,n,r,o){let s=jt();if(wX(s,e,o))return null;try{let i=await s.readFile(e,{encoding:"utf-8"});if(i.length>_$)return logForDebugging(`Plugin workflow ${e} exceeds ${_$} bytes \u2014 skipping`,{level:"warn"}),null;let a=AI(i);if("error"in a)return logForDebugging(`Plugin workflow ${e} has invalid meta: ${a.error} \u2014 skipping`,{level:"warn"}),null;let l=`${t}:${a.meta.name}`;return{source:"plugin",plugin:n,pluginManifest:r,name:l,description:a.meta.description,whenToUse:a.meta.whenToUse,phases:a.meta.phases,script:i,filePath:e}}catch(i){return logForDebugging(`Failed to load workflow from ${e}: ${i}`,{level:"error"}),null}}
function clearPluginWorkflowCache(){loadPluginWorkflows.cache?.clear?.()}
var L6a,loadPluginWorkflows;
var fdo=b(()=>{ta();ln();Mce();fsModule();N5();qe();ws();gg();L6a=require("path");loadPluginWorkflows=wn(async()=>{let{enabled:e,errors:t}=await loadAllPluginsCacheOnly(),n=[];if(t.length>0)logForDebugging(`Plugin loading errors: ${t.map((o)=>TT(o)).join(", ")}`);let r=null;for(let o of e){let s=new Set;if(o.workflowsPath)try{let i=await O6a(o.workflowsPath,o.name,o.source,o.manifest,s);if(n.push(...i),i.length>0)logForDebugging(`Loaded ${i.length} workflows from plugin ${o.name} default directory`)}catch(i){r="plugin_load_workflows_dir_failed",logForDebugging(`Failed to load workflows from plugin ${o.name} default directory: ${i}`,{level:"error"})}if(o.workflowsPaths)for(let i of o.workflowsPaths)try{let l=await jt().stat(i);if(l.isDirectory()){let c=await O6a(i,o.name,o.source,o.manifest,s);if(n.push(...c),c.length>0)logForDebugging(`Loaded ${c.length} workflows from plugin ${o.name} custom path: ${i}`)}else if(l.isFile()&&i.endsWith(".js")){let c=await M6a(i,o.name,o.source,o.manifest,s);if(c)n.push(c),logForDebugging(`Loaded workflow from plugin ${o.name} custom file: ${i}`)}}catch(a){r="plugin_load_workflows_path_failed",logForDebugging(`Failed to load workflows from plugin ${o.name} custom path ${i}: ${a}`,{level:"error"})}}if(logForDebugging(`Total plugin workflows loaded: ${n.length}`),r)Oe("plugin_load_workflows",r);else Ie("plugin_load_workflows");return n})});
export {N6a,O6a,M6a,clearPluginWorkflowCache,L6a,loadPluginWorkflows,fdo};
