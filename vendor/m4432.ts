// @ts-nocheck
import {_pt,ljn} from "./m4430.ts";
import {jt,wX,ws} from "./m228.ts";
import {RA,iF,CFe,Ev} from "./m2211.ts";
import {Gce,D6} from "../src/agent/5186_bigint.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {ln,Oe,Ie} from "../src/telemetry/0594_feature_name.ts";
import {N5,TT} from "./m2583.ts";
import {gg,loadAllPluginsCacheOnly} from "../src/agent/4445_resolvePluginRoot.ts";
async function Ytl(e,t,n){let r=[];return await _pt(e,async(o)=>{let s=await Xtl(o,t,n);if(s)r.push(s)},{logLabel:"output-styles"}),r}
async function Xtl(e,t,n){let r=jt();if(wX(r,e,n))return null;try{let o=await r.readFile(e,{encoding:"utf-8"}),{frontmatter:s,content:i}=RA(o,e,{normalizeKeys:!0}),a=Jtl.basename(e,".md"),l=(s.name!=null?String(s.name):void 0)||a,c=`${t}:${l}`,u=iF(s.description,c)??Gce(i,`Output style from ${t} plugin`);return{name:c,description:u,prompt:i.trim(),source:"plugin",forceForPlugin:CFe(s["force-for-plugin"]),keepCodingInstructions:CFe(s["keep-coding-instructions"])}}catch(o){return logForDebugging(`Failed to load output style from ${e}: ${o}`,{level:"error"}),null}}
function Bgo(){Ngo.cache?.clear?.()}
var Jtl,Ngo;
var ujn=b(()=>{ta();ln();N5();qe();Ev();ws();D6();gg();ljn();Jtl=require("path");Ngo=wn(async()=>{let{enabled:e,errors:t}=await loadAllPluginsCacheOnly(),n=[];if(t.length>0)logForDebugging(`Plugin loading errors: ${t.map((o)=>TT(o)).join(", ")}`);let r=null;for(let o of e){let s=new Set;if(o.outputStylesPath)try{let i=await Ytl(o.outputStylesPath,o.name,s);if(n.push(...i),i.length>0)logForDebugging(`Loaded ${i.length} output styles from plugin ${o.name} default directory`)}catch(i){r="plugin_load_output_styles_dir_failed",logForDebugging(`Failed to load output styles from plugin ${o.name} default directory: ${i}`,{level:"error"})}if(o.outputStylesPaths)for(let i of o.outputStylesPaths)try{let l=await jt().stat(i);if(l.isDirectory()){let c=await Ytl(i,o.name,s);if(n.push(...c),c.length>0)logForDebugging(`Loaded ${c.length} output styles from plugin ${o.name} custom path: ${i}`)}else if(l.isFile()&&i.endsWith(".md")){let c=await Xtl(i,o.name,s);if(c)n.push(c),logForDebugging(`Loaded output style from plugin ${o.name} custom file: ${i}`)}}catch(a){r="plugin_load_output_styles_path_failed",logForDebugging(`Failed to load output styles from plugin ${o.name} custom path ${i}: ${a}`,{level:"error"})}}if(logForDebugging(`Total plugin output styles loaded: ${n.length}`),r)Oe("plugin_load_output_styles",r);else Ie("plugin_load_output_styles");return n})});
export {Ytl,Xtl,Bgo,Jtl,Ngo,ujn};
