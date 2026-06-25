// @ts-nocheck
import {gf,wE} from "./m5177.ts";
import {b} from "../runtime.ts";
function lv(e){return e==="completed"||e==="failed"||e==="killed"}
function f5t(e){for(let t of Object.values(e))if(nkm.has(t.type)&&!lv(t.status)&&!(t.type==="in_process_teammate"&&t.isIdle)&&!(t.type==="remote_agent"&&t.isLongRunning))return!0;return!1}
function xWn(e){for(let t of Object.values(e))if(t.type==="local_bash"&&!lv(t.status))return!0;return!1}
function okm(e){return rkm[e]??"x"}
function M$(e){let t=okm(e),n=I3l.randomBytes(8),r=t;for(let o=0;o<8;o++)r+=H3l[n[o]%H3l.length];return r}
function av(e,t,n,r){return{id:e,type:t,status:"pending",description:n,toolUseId:r,startTime:Date.now(),outputFile:gf(e),outputOffset:0,notified:!1}}
var I3l,nkm,rkm,H3l="0123456789abcdefghijklmnopqrstuvwxyz";
var vw=b(()=>{wE();I3l=require("crypto");nkm=new Set(["local_agent","remote_agent","in_process_teammate","local_workflow"]);rkm={local_bash:"b",local_agent:"a",remote_agent:"r",in_process_teammate:"t",local_workflow:"w",monitor_mcp:"m",mcp_task:"k",dream:"d"}});
export {lv,f5t,xWn,okm,M$,av,I3l,nkm,rkm,H3l,vw};
