// @ts-nocheck
import {d$,getOAuthHeaders,Dw} from "../src/api/2190_updateSessionTitle.ts";
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
import {fo} from "./m566.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
async function b8l(e){let{accessToken:t}=await d$();return{sessionUrl:`${getOauthConfig().BASE_API_URL}/v1/code/sessions/${e}`,headers:getOAuthHeaders(t)}}
async function E8l(e,t,n){let r=await fo.get(`${e.sessionUrl}/events`,{headers:e.headers,params:t,timeout:15000,validateStatus:()=>!0}).catch(()=>null);if(!r||r.status!==200)return logForDebugging(`[${n}] HTTP ${r?.status??"error"}`),null;let o=Array.isArray(r.data.data)?r.data.data:[],s=[];for(let a=o.length-1;a>=0;a--){let l=o[a];if(l?.payload)s.push({payload:l.payload,createdAt:l.created_at,source:l.source})}let i=r.data.next_cursor??null;return{events:s,firstId:i,hasMore:i!==null}}
async function C8l(e,t=S8l,n){let r=await E8l(e,{limit:t,sort_order:"desc"},"fetchLatestEvents");if(n?.reportFeatureHealth!==!1)if(r===null)Oe("assistant_history_load","http_error");else Ie("assistant_history_load");return r}
async function v8l(e,t,n=S8l){return E8l(e,{limit:n,sort_order:"desc",cursor:t},"fetchOlderEvents")}
var S8l=100;
var w8l=b(()=>{Gp();Dc();ln();qe();Dw()});
export {b8l,E8l,C8l,v8l,S8l,w8l};
