// @ts-nocheck
import {getSystemPromptSectionCache,setSystemPromptSectionCacheEntry,clearSystemPromptSectionState,clearBetaHeaderLatches,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function Zk(e,t){return{name:e,compute:t,cacheBreak:!1}}
async function KWa(e){let t=getSystemPromptSectionCache();return Promise.all(e.map(async(n)=>{if(!n.cacheBreak&&t.has(n.name))return t.get(n.name)??null;let r=await n.compute();return setSystemPromptSectionCacheEntry(n.name,r),r}))}
function a0e(){clearSystemPromptSectionState(),clearBetaHeaderLatches()}
var y3t=b(()=>{lt()});
export {Zk,KWa,a0e,y3t};
