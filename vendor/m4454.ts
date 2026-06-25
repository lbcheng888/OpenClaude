// @ts-nocheck
import {yft,kGn} from "./m4452.ts";
import {Wt,CX,ps} from "./m230.ts";
import {xf,HF,bUe,HA} from "./m2219.ts";
import {$ce,Xq} from "../src/agent/5220_bigint.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {mn,xe,He} from "../src/telemetry/0600_feature_name.ts";
import {Q8,fT} from "./m2594.ts";
import {path,loadAllPluginsCacheOnly} from "../src/agent/4467_resolvePluginRoot.ts";
async function Lll(e,t,n){let r=[];return await yft(e,async(o)=>{let s=await Nll(o,t,n);if(s)r.push(s)},{logLabel:"output-styles"}),r}
async function Nll(e,t,n){let r=Wt();if(CX(r,e,n))return null;try{let o=await r.readFile(e,{encoding:"utf-8"}),{frontmatter:s,content:i}=xf(o,e,{normalizeKeys:!0}),a=Mll.basename(e,".md"),l=(s.name!=null?String(s.name):void 0)||a,c=`${t}:${l}`,u=HF(s.description,c)??$ce(i,`Output style from ${t} plugin`);return{name:c,description:u,prompt:i.trim(),source:"plugin",forceForPlugin:bUe(s["force-for-plugin"]),keepCodingInstructions:bUe(s["keep-coding-instructions"])}}catch(o){return logForDebugging(`Failed to load output style from ${e}: ${o}`,{level:"error"}),null}}
function DEo(){xEo.cache?.clear?.()}
var Mll,xEo;
var IGn=b(()=>{Wi();mn();Q8();qe();HA();ps();Xq();path();kGn();Mll=require("path");xEo=Hn(async()=>{let{enabled:e,errors:t}=await loadAllPluginsCacheOnly(),n=[];if(t.length>0)logForDebugging(`Plugin loading errors: ${t.map((o)=>fT(o)).join(", ")}`);let r=null;for(let o of e){let s=new Set;if(o.outputStylesPath)try{let i=await Lll(o.outputStylesPath,o.name,s);if(n.push(...i),i.length>0)logForDebugging(`Loaded ${i.length} output styles from plugin ${o.name} default directory`)}catch(i){r="plugin_load_output_styles_dir_failed",logForDebugging(`Failed to load output styles from plugin ${o.name} default directory: ${i}`,{level:"error"})}if(o.outputStylesPaths)for(let i of o.outputStylesPaths)try{let l=await Wt().stat(i);if(l.isDirectory()){let c=await Lll(i,o.name,s);if(n.push(...c),c.length>0)logForDebugging(`Loaded ${c.length} output styles from plugin ${o.name} custom path: ${i}`)}else if(l.isFile()&&i.endsWith(".md")){let c=await Nll(i,o.name,s);if(c)n.push(c),logForDebugging(`Loaded output style from plugin ${o.name} custom file: ${i}`)}}catch(a){r="plugin_load_output_styles_path_failed",logForDebugging(`Failed to load output styles from plugin ${o.name} custom path ${i}: ${a}`,{level:"error"})}}if(logForDebugging(`Total plugin output styles loaded: ${n.length}`),r)xe("plugin_load_output_styles",r);else He("plugin_load_output_styles");return n})});
export {Lll,Nll,DEo,Mll,xEo,IGn};
