// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {getDynamicSkillStateKey} from "../src/tools/4352_displayName.ts";
import {runForkedQuery,sxe} from "../src/config/3967_sxe.ts";
import {Wi,Hn} from "./m100.ts";
import {Mm,getSkillToolCommands,dropShadowedFallbackSkills} from "../src/tools/5174_toSlashCommands.ts";
var Mvo={};
ft(Mvo,{skillIndexCacheKey:()=>skillIndexCacheKey,getSkillIndex:()=>getSkillIndex,clearSkillIndexCache:()=>clearSkillIndexCache});
function skillIndexCacheKey(e,t){return`${getDynamicSkillStateKey()}:${runForkedQuery()}:${e}:${(t??[]).map((n)=>n.name).sort().join(",")}`}
function clearSkillIndexCache(){getSkillIndex.cache?.clear?.()}
var getSkillIndex;
var Nvo=b(()=>{Wi();Mm();sxe();getSkillIndex=Hn(async(e,t)=>{let n=await getSkillToolCommands(e),r=new Set(n.map((i)=>i.name)),o=(t??[]).filter((i)=>!r.has(i.name));return dropShadowedFallbackSkills([...n,...o]).map((i)=>({name:i.name,description:i.description,whenToUse:i.whenToUse??""}))},skillIndexCacheKey);if(!(getSkillIndex.cache instanceof Map))getSkillIndex.cache=new Map});
export {Mvo,skillIndexCacheKey,clearSkillIndexCache,getSkillIndex,Nvo};
