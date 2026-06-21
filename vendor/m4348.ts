// @ts-nocheck
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {b} from "../runtime.ts";
function CJa(){EJa=!0;for(let e of Xfo)e();Xfo=[]}
async function vJa(e){if(EJa||bJa)return;if(!process.env.CLAUDE_MEMORY_STORES?.trim())return;if(!oqn)oqn=Promise.race([new Promise((t)=>Xfo.push(t)),sleep(SJa)]),oqn.then(()=>{bJa=!0});await Promise.race([oqn,sleep(SJa,e)])}
var SJa=2500,EJa=!1,oqn=null,bJa=!1,Xfo;
var Qfo=b(()=>{Xfo=[]});
export {CJa,vJa,SJa,EJa,oqn,bJa,Xfo,Qfo};
