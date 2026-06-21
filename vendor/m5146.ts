// @ts-nocheck
import {mh,vC} from "./m5145.ts";
import {b} from "../runtime.ts";
function nR(e){return e==="completed"||e==="failed"||e==="killed"}
function q4t(e){for(let t of Object.values(e))if(L_m.has(t.type)&&!nR(t.status)&&!(t.type==="in_process_teammate"&&t.isIdle)&&!(t.type==="remote_agent"&&t.isLongRunning))return!0;return!1}
function d6n(e){for(let t of Object.values(e))if(t.type==="local_bash"&&!nR(t.status))return!0;return!1}
function N_m(e){return M_m[e]??"x"}
function d9(e){let t=N_m(e),n=VMl.randomBytes(8),r=t;for(let o=0;o<8;o++)r+=GMl[n[o]%GMl.length];return r}
function uI(e,t,n,r){return{id:e,type:t,status:"pending",description:n,toolUseId:r,startTime:Date.now(),outputFile:mh(e),outputOffset:0,notified:!1}}
var VMl,L_m,M_m,GMl="0123456789abcdefghijklmnopqrstuvwxyz";
var Ax=b(()=>{vC();VMl=require("crypto");L_m=new Set(["local_agent","remote_agent","in_process_teammate","local_workflow"]);M_m={local_bash:"b",local_agent:"a",remote_agent:"r",in_process_teammate:"t",local_workflow:"w",monitor_mcp:"m",mcp_task:"k",dream:"d"}});
export {nR,q4t,d6n,N_m,d9,uI,VMl,L_m,M_m,GMl,Ax};
