// @ts-nocheck
import {aG,_9t} from "./m3889.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function DWe(e,t){return{markTypeInvoked(n){t((r)=>r.agentTypesInvokedThisSession.has(n)?r:{...r,agentTypesInvokedThisSession:new Set(r.agentTypesInvokedThisSession).add(n)})},registerName(n,r){if(n===aG){logForDebugging(`[registerName] refused reserved name "${n}" for ${r} \u2014 SendMessage routes it to the main conversation`);return}t((o)=>{if(o.agentNameRegistry.get(n)===r)return o;let s=new Map(o.agentNameRegistry);return s.set(n,r),{...o,agentNameRegistry:s}})},allocateName(n){let r=e(),o=r.agentNameRegistry,s=new Set(Object.values(r.teamContext?.teammates??{}).map((i)=>i.name));for(let i=1;;i++){let a=i===1?n:`${n}-${i}`;if(a!==aG&&!o.has(a)&&!s.has(a))return a}},clearTodos(n){t((r)=>{if(!(n in r.todos))return r;let{[n]:o,...s}=r.todos;return{...r,todos:s}})},setTeammate(n,r){t((o)=>{let s=o.teamContext;if(!s)return o;let i=s.teammates?.[n];if(r===void 0){if(!i)return o;let{[n]:a,...l}=s.teammates;return{...o,teamContext:{...s,teammates:l}}}if(i===r)return o;return{...o,teamContext:{...s,teammates:{...s.teammates,[n]:r}}}})}}}
var hjn;
var cgt=b(()=>{_9t();qe();hjn={markTypeInvoked(){},registerName(){},allocateName(e){return e},clearTodos(){},setTeammate(){}}});
export {DWe,hjn,cgt};
