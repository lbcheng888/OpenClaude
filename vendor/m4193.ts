// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Wt,CX,ps} from "./m230.ts";
import {$2,oz} from "./m2254.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Bw,Nte} from "./m4186.ts";
import {Wi,Hn} from "./m100.ts";
import {mn,xe,He} from "../src/telemetry/0600_feature_name.ts";
import {Q8,fT} from "./m2594.ts";
import {path,loadAllPluginsCacheOnly} from "../src/agent/4467_resolvePluginRoot.ts";
var GKa={};
ft(GKa,{loadPluginWorkflows:()=>loadPluginWorkflows,clearPluginWorkflowCache:()=>clearPluginWorkflowCache});
async function $Ka(e,t,n,r,o){let s=Wt(),i;try{i=await s.readdir(e)}catch{return[]}return(await Promise.all(i.map(async(l)=>{if(!(l.isFile()||l.isSymbolicLink()))return null;if(!l.name.endsWith(".js"))return null;return WKa(qKa.join(e,l.name),t,n,r,o)}))).filter((l)=>l!==null)}
async function WKa(e,t,n,r,o){let s=Wt();if(CX(s,e,o))return null;try{let i=await s.readFile(e,{encoding:"utf-8"});if(i.length>$2)return logForDebugging(`Plugin workflow ${e} exceeds ${$2} bytes \u2014 skipping`,{level:"warn"}),null;let a=Bw(i);if("error"in a)return logForDebugging(`Plugin workflow ${e} has invalid meta: ${a.error} \u2014 skipping`,{level:"warn"}),null;let l=`${t}:${a.meta.name}`;return{source:"plugin",plugin:n,pluginManifest:r,name:l,description:a.meta.description,whenToUse:a.meta.whenToUse,phases:a.meta.phases,script:i,filePath:e}}catch(i){return logForDebugging(`Failed to load workflow from ${e}: ${i}`,{level:"error"}),null}}
function clearPluginWorkflowCache(){loadPluginWorkflows.cache?.clear?.()}
var qKa,loadPluginWorkflows;
var rgo=b(()=>{Wi();mn();Nte();oz();Q8();qe();ps();path();qKa=require("path");loadPluginWorkflows=Hn(async()=>{let{enabled:e,errors:t}=await loadAllPluginsCacheOnly(),n=[];if(t.length>0)logForDebugging(`Plugin loading errors: ${t.map((o)=>fT(o)).join(", ")}`);let r=null;for(let o of e){let s=new Set;if(o.workflowsPath)try{let i=await $Ka(o.workflowsPath,o.name,o.source,o.manifest,s);if(n.push(...i),i.length>0)logForDebugging(`Loaded ${i.length} workflows from plugin ${o.name} default directory`)}catch(i){r="plugin_load_workflows_dir_failed",logForDebugging(`Failed to load workflows from plugin ${o.name} default directory: ${i}`,{level:"error"})}if(o.workflowsPaths)for(let i of o.workflowsPaths)try{let l=await Wt().stat(i);if(l.isDirectory()){let c=await $Ka(i,o.name,o.source,o.manifest,s);if(n.push(...c),c.length>0)logForDebugging(`Loaded ${c.length} workflows from plugin ${o.name} custom path: ${i}`)}else if(l.isFile()&&i.endsWith(".js")){let c=await WKa(i,o.name,o.source,o.manifest,s);if(c)n.push(c),logForDebugging(`Loaded workflow from plugin ${o.name} custom file: ${i}`)}}catch(a){r="plugin_load_workflows_path_failed",logForDebugging(`Failed to load workflows from plugin ${o.name} custom path ${i}: ${a}`,{level:"error"})}}if(logForDebugging(`Total plugin workflows loaded: ${n.length}`),r)xe("plugin_load_workflows",r);else He("plugin_load_workflows");return n})});
export {GKa,$Ka,WKa,clearPluginWorkflowCache,qKa,loadPluginWorkflows,rgo};
