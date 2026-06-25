// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
import {Ni} from "./m127.ts";
function f9n(e){bdo.emit(e);let t=Date.now(),n=m$a.get(e);if(n!==void 0&&t-n<sIp)return;m$a.set(e,t),saveGlobalConfig((r)=>{let o=r.skillUsage?.[e];return{...r,skillUsage:{...r.skillUsage,[e]:{usageCount:(o?.usageCount??0)+1,lastUsedAt:t}}}})}
function c6e(e){let n=getGlobalConfig().skillUsage?.[e];if(!n)return 0;let r=(Date.now()-n.lastUsedAt)/86400000,o=Math.pow(0.5,r/7);return n.usageCount*Math.max(o,0.1)}
var sIp=60000,bdo,m$a;
var u6e=b(()=>{tr();ig();bdo=Ni(),m$a=new Map});
export {f9n,c6e,sIp,bdo,m$a,u6e};
