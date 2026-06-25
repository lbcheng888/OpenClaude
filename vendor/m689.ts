// @ts-nocheck
import {$g,tn} from "../src/config/0230_encoding.ts";
import {uis,zN} from "./m688.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {b} from "../runtime.ts";
function execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(e,t,n=10*pis*dis){let r;if(t===void 0)r={};else if(t instanceof AbortSignal)r={abortSignal:t,timeout:n};else r=t;let{abortSignal:o,timeout:s=10*pis*dis,input:i,stdio:a=["ignore","pipe","pipe"]}=r;o?.throwIfAborted();using l=$g`exec: ${e.slice(0,200)}`;try{let c=uis(e,{env:process.env,maxBuffer:1e6,timeout:s,cwd:isTmuxControlMode(),stdio:a,reject:!1,input:i});if(!c.stdout)return null;return c.stdout.trim()||null}catch{return null}}
var dis=1000,pis=60;
var bTr=b(()=>{Po();zN();tn()});
export {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING,dis,pis,bTr};
