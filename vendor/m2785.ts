// @ts-nocheck
import {C2,Oi,Ni,YT} from "../src/tools/0323_ttl.ts";
import {b} from "../runtime.ts";
function GRn(e){let t=e.indexOf(`
`),n=(t===-1?e:e.slice(0,t)).trim();if(!n.startsWith("#")||n.startsWith("#!"))return;if(t!==-1&&Ukd(e.slice(t+1)))return;let r=n.replace(/^#+\s*/,"");if(!r||$kd(r))return;return r}
function Ukd(e){for(let t of e.split(`
`)){let n=t.trim();if(n==="")continue;if(n.startsWith("#"))continue;return!0}return!1}
function $kd(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n<32||n>=127&&n<=159)return!0}return!1}
class sWr{constructor(e){this._client=e}async*callToolStream(e,t=C2,n){let r=this._client,o={...n,task:n?.task??(r.isToolTask(e.name)?{}:void 0)},s=r.requestStream({method:"tools/call",params:e},t,o),i=r.getToolOutputValidator(e.name);for await(let a of s){if(a.type==="result"&&i){let l=a.result;if(!l.structuredContent&&!l.isError){yield{type:"error",error:new Oi(Ni.InvalidRequest,`Tool ${e.name} has an output schema but did not return structured content`)};return}if(l.structuredContent)try{let c=i(l.structuredContent);if(!c.valid){yield{type:"error",error:new Oi(Ni.InvalidParams,`Structured content does not match the tool's output schema: ${c.errorMessage}`)};return}}catch(c){if(c instanceof Oi){yield{type:"error",error:c};return}yield{type:"error",error:new Oi(Ni.InvalidParams,`Failed to validate structured content: ${c instanceof Error?c.message:String(c)}`)};return}}yield a}}async getTask(e,t){return this._client.getTask({taskId:e},t)}async getTaskResult(e,t,n){return this._client.getTaskResult({taskId:e},t,n)}async listTasks(e,t){return this._client.listTasks(e?{cursor:e}:void 0,t)}async cancelTask(e,t){return this._client.cancelTask({taskId:e},t)}requestStream(e,t,n){return this._client.requestStream(e,t,n)}}
var u9i=b(()=>{YT()});
export {GRn,Ukd,$kd,sWr,u9i};
