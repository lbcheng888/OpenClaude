// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {getDynamicSkillStateKey} from "../src/tools/4332_displayName.ts";
import {aG,BIe} from "../src/config/4090_BIe.ts";
import {ta,wn} from "./m45.ts";
import {Sf,getSkillToolCommands,dropShadowedFallbackSkills} from "../src/tools/5142_toSlashCommands.ts";
var bSo={};
isFullscreenWithTTY(bSo,{skillIndexCacheKey:()=>skillIndexCacheKey,getSkillIndex:()=>getSkillIndex,clearSkillIndexCache:()=>clearSkillIndexCache});
function skillIndexCacheKey(e,t){return`${getDynamicSkillStateKey()}:${aG()}:${e}:${(t??[]).map((n)=>n.name).sort().join(",")}`}
function clearSkillIndexCache(){getSkillIndex.cache?.clear?.()}
var getSkillIndex;
var ESo=b(()=>{ta();Sf();BIe();getSkillIndex=wn(async(e,t)=>{let n=await getSkillToolCommands(e),r=new Set(n.map((i)=>i.name)),o=(t??[]).filter((i)=>!r.has(i.name));return dropShadowedFallbackSkills([...n,...o]).map((i)=>({name:i.name,description:i.description,whenToUse:i.whenToUse??""}))},skillIndexCacheKey);if(!(getSkillIndex.cache instanceof Map))getSkillIndex.cache=new Map});
export {bSo,skillIndexCacheKey,clearSkillIndexCache,getSkillIndex,ESo};
