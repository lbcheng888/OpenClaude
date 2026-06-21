// @ts-nocheck
import {Hg,Xt} from "../src/config/0228_encoding.ts";
import {mes,vB} from "./m682.ts";
import {Pt,Go} from "./m632.ts";
import {b} from "../runtime.ts";
function execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(e,t,n=10*Aes*fes){let r;if(t===void 0)r={};else if(t instanceof AbortSignal)r={abortSignal:t,timeout:n};else r=t;let{abortSignal:o,timeout:s=10*Aes*fes,input:i,stdio:a=["ignore","pipe","pipe"]}=r;o?.throwIfAborted();using l=Hg`exec: ${e.slice(0,200)}`;try{let c=mes(e,{env:process.env,maxBuffer:1e6,timeout:s,cwd:Pt(),stdio:a,reject:!1,input:i});if(!c.stdout)return null;return c.stdout.trim()||null}catch{return null}}
var fes=1000,Aes=60;
var Vfr=b(()=>{Go();vB();Xt()});
export {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING,fes,Aes,Vfr};
