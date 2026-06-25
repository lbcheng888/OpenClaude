// @ts-nocheck
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {b} from "../runtime.ts";
function Znl(){Qnl=!0;for(let e of zTo)e();zTo=[]}
async function erl(e){if(Qnl||Xnl)return;if(!process.env.CLAUDE_MEMORY_STORES?.trim())return;if(!b8n)b8n=Promise.race([new Promise((t)=>zTo.push(t)),sleep(Jnl)]),b8n.then(()=>{Xnl=!0});await Promise.race([b8n,sleep(Jnl,e)])}
var Jnl=2500,Qnl=!1,b8n=null,Xnl=!1,zTo;
var jTo=b(()=>{zTo=[]});
export {Znl,erl,Jnl,Qnl,b8n,Xnl,zTo,jTo};
