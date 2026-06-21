// @ts-nocheck
import {Ul,ln} from "../src/telemetry/0594_feature_name.ts";
import {isClaudeAISubscriber,hasProfileScope,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {withOAuth401Retry,fk} from "../src/api/2032_withOAuth401Retry.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {si,gT} from "./m2190.ts";
import {b} from "../runtime.ts";
async function bae(){return Ul("api_usage_fetch",async()=>{if(!isClaudeAISubscriber()||!hasProfileScope())return{};let e=0,t=await withOAuth401Retry(async()=>{e++,logForDebugging(`fetchUtilization: GET /api/oauth/usage (attempt ${e})`);let n=await si.get("/api/oauth/usage",{timeout:5000,headers:{"Content-Type":"application/json"},refreshOAuth:!0});if(!n.ok)throw Error(`Auth error: ${n.reason==="no-auth"?n.detail:n.reason}`);return n});return logForDebugging(`fetchUtilization: 200 after ${e} attempt(s)${e>1?" (401\u2192refresh\u2192retry succeeded)":""}`),t.data})}
var dnt=b(()=>{Ao();qe();fk();ln();gT()});
export {bae,dnt};
