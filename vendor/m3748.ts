// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {si,gT} from "./m2190.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {K_,Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function fwa(){try{if(getGlobalConfig().claudeCodeFirstTokenDate!==void 0){Ie("api_first_token_date_fetch");return}let t=await si.get("/api/organization/claude_code_first_token_date",{auth:"async",timeout:1e4});if(!t.ok){if(t.reason==="no-auth")logForDebugging(`Failed to get auth headers for first-token-date fetch: ${t.detail}`,{level:"error"}),Oe("api_first_token_date_fetch","request_failed");return}let n=t.data?.first_token_date??null;if(n!==null){let r=new Date(n).getTime();if(isNaN(r)){De(Error(`Received invalid first_token_date from API: ${n}`)),Oe("api_first_token_date_fetch","invalid_date");return}}saveGlobalConfig((r)=>({...r,claudeCodeFirstTokenDate:n})),Ie("api_first_token_date_fetch")}catch(e){if(K_(e))logForDebugging(`Failed to fetch first token date: ${Se(e)}`,{level:"error"});else De(e);Oe("api_first_token_date_fetch","request_failed")}}
var Awa=b(()=>{Qn();qe();bt();Rn();ln();gT()});
export {fwa,Awa};
