// @ts-nocheck
import {clearCommandsCache,getCommands,clearCommandMemoizationCaches,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {getAgentDefinitionsWithOverrides,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {byt,Str} from "../src/config/5463_persistent.ts";
import {onGrowthBookRefresh,jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {xO,Xie} from "./m2677.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function PQl(e,t,n){let r=sVe.useCallback(async()=>{if(!e)return;try{clearCommandsCache();let s=await getCommands(e);if(t(s),n){let i=await getAgentDefinitionsWithOverrides(e);n(i)}}catch(s){if(s instanceof Error)Ie(s)}},[e,t,n]);sVe.useEffect(()=>byt.subscribe(r),[r]);let o=sVe.useCallback(async()=>{if(!e)return;try{clearCommandMemoizationCaches();let s=await getCommands(e);t(s)}catch(s){if(s instanceof Error)Ie(s)}},[e,t]);sVe.useEffect(()=>onGrowthBookRefresh(o),[o]),sVe.useEffect(()=>xO.subscribe(o),[o])}
var sVe;
var OQl=b(()=>{Mm();jn();kg();vn();Xie();Str();sVe=x(et(),1)});
export {PQl,sVe,OQl};
