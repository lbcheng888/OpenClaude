// @ts-nocheck
import {clearCommandsCache,getCommands,clearCommandMemoizationCaches,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {getAgentDefinitionsWithOverrides,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {oht,yXn} from "../src/config/5430_persistent.ts";
import {onGrowthBookRefresh,zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {buildDefaultSystemPromptSections,eae} from "./m2666.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function JWl(e,t,n){let r=A5e.useCallback(async()=>{if(!e)return;try{clearCommandsCache();let s=await getCommands(e);if(t(s),n){let i=await getAgentDefinitionsWithOverrides(e);n(i)}}catch(s){if(s instanceof Error)De(s)}},[e,t,n]);A5e.useEffect(()=>oht.subscribe(r),[r]);let o=A5e.useCallback(async()=>{if(!e)return;try{clearCommandMemoizationCaches();let s=await getCommands(e);t(s)}catch(s){if(s instanceof Error)De(s)}},[e,t]);A5e.useEffect(()=>onGrowthBookRefresh(o),[o]),A5e.useEffect(()=>buildDefaultSystemPromptSections.subscribe(o),[o])}
var A5e;
var XWl=b(()=>{Sf();zn();scrubPathsConfig();Rn();eae();yXn();A5e=M(Te(),1)});
export {JWl,A5e,XWl};
