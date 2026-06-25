// @ts-nocheck
import {My,T3e} from "./m3275.ts";
import {rFt,cDn} from "../src/telemetry/3193_cwd.ts";
import {b} from "../runtime.ts";
class xPo{taskOutput;#e;#t;#n="backgrounded";#s=null;#i;result;constructor(e){this.#e=e.pid,this.#t=e.startTimeTicks,this.taskOutput=new My(e.taskId,null,!0),this.result=new Promise((t)=>{this.#i=t}),this.#s=setInterval(()=>void this.#a(),ORm),this.#s.unref()}async#a(){if(this.#n!=="backgrounded")return;let e=!0;try{if(process.kill(this.#e,0),this.#t!==void 0){let t=await tXn(this.#e);if(t!==null&&t!==this.#t)e=!1}}catch{e=!1}if(!e)await this.#o(!1)}async#o(e){if(this.#n!=="backgrounded")return;if(this.#s)clearInterval(this.#s),this.#s=null;this.#n=e?"killed":"completed";let t=e?this.#t!==void 0?"[SIGTERM requested for detached process tree (sent if identity still matched) \u2014 adopted handle released]":"[detached process still running \u2014 adopted handle released]":"[process exited while detached; exit code unknown]";await eXn.appendFile(this.taskOutput.path,`
${t}
`).catch(()=>{});let n=await this.taskOutput.getStdout();this.#i({code:-1,stdout:n,stderr:"",interrupted:e,backgroundTaskId:this.taskOutput.taskId})}get status(){return this.#n}background(){return!0}async kill(){DPo(this.#e,this.#t),await this.#o(!0)}cleanup(){if(this.#s)clearInterval(this.#s),this.#s=null;this.taskOutput.clear()}detach(){return this.#e}}
async function tXn(e){return null}
async function DPo(e,t){if(t===void 0)return;if(await tXn(e)!==t)return;await rFt(e,"SIGTERM").catch(()=>{})}
var eXn,ORm=1000;
var PPo=b(()=>{cDn();T3e();eXn=require("fs/promises")});
export {xPo,tXn,DPo,eXn,ORm,PPo};
