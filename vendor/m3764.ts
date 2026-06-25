// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {Vs,lT} from "./m2195.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {__export,Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function xDa(){try{if(getGlobalConfig().claudeCodeFirstTokenDate!==void 0){He("api_first_token_date_fetch");return}let t=await Vs.get("/api/organization/claude_code_first_token_date",{auth:"async",timeout:1e4});if(!t.ok){if(t.reason==="no-auth")logForDebugging(`Failed to get auth headers for first-token-date fetch: ${t.detail}`,{level:"error"}),xe("api_first_token_date_fetch","request_failed");return}let n=t.data?.first_token_date??null;if(n!==null){let r=new Date(n).getTime();if(isNaN(r)){Ie(Error(`Received invalid first_token_date from API: ${n}`)),xe("api_first_token_date_fetch","invalid_date");return}}saveGlobalConfig((r)=>({...r,claudeCodeFirstTokenDate:n})),He("api_first_token_date_fetch")}catch(e){if(__export(e))logForDebugging(`Failed to fetch first token date: ${Ce(e)}`,{level:"error"});else Ie(e);xe("api_first_token_date_fetch","request_failed")}}
var DDa=b(()=>{tr();qe();Ct();vn();mn();lT()});
export {xDa,DDa};
