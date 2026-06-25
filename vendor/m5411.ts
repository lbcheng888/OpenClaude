// @ts-nocheck
import {prepareApiRequest,getOAuthHeaders,NR} from "../src/api/2195_updateSessionTitle.ts";
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
import {ho} from "./m572.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
import {ap} from "./m573.ts";
async function iJl(e){let{accessToken:t}=await prepareApiRequest();return{sessionUrl:`${getOauthConfig().BASE_API_URL}/v1/code/sessions/${e}`,headers:getOAuthHeaders(t)}}
async function aJl(e,t,n){let r=await ho.get(`${e.sessionUrl}/events`,{headers:e.headers,params:t,timeout:15000,validateStatus:()=>!0}).catch(()=>null);if(!r||r.status!==200)return logForDebugging(`[${n}] HTTP ${r?.status??"error"}`),null;let o=Array.isArray(r.data.data)?r.data.data:[],s=[];for(let a=o.length-1;a>=0;a--){let l=o[a];if(l?.payload)s.push({payload:l.payload,createdAt:l.created_at,source:l.source})}let i=r.data.next_cursor??null;return{events:s,firstId:i,hasMore:i!==null}}
async function lJl(e,t=sJl,n){let r=await aJl(e,{limit:t,sort_order:"desc"},"fetchLatestEvents");if(n?.reportFeatureHealth!==!1)if(r===null)xe("assistant_history_load","http_error");else He("assistant_history_load");return r}
async function cJl(e,t,n=sJl){return aJl(e,{limit:n,sort_order:"desc",cursor:t},"fetchOlderEvents")}
var sJl=100;
var uJl=b(()=>{ap();Sc();mn();qe();NR()});
export {iJl,aJl,lJl,cJl,sJl,uJl};
