// @ts-nocheck
import {getSystemPromptSectionCache,setSystemPromptSectionCacheEntry,clearSystemPromptSectionState,clearBetaHeaderLatches,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function TH(e,t){return{name:e,compute:t,cacheBreak:!1}}
async function mJa(e){let t=getSystemPromptSectionCache();return Promise.all(e.map(async(n)=>{if(!n.cacheBreak&&t.has(n.name))return t.get(n.name)??null;let r=await n.compute();return setSystemPromptSectionCacheEntry(n.name,r),r}))}
function eDe(){clearSystemPromptSectionState(),clearBetaHeaderLatches()}
var Mqt=b(()=>{lt()});
export {TH,mJa,eDe,Mqt};
