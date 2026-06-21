// @ts-nocheck
import {isFirstPartyProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,withOAuthRefreshLock,saveOAuthTokensIfNeeded,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {l4n,C3t,u4n} from "../src/config/4283_level.ts";
import {refreshOAuthToken,DH} from "../src/config/1288_storeOAuthAccountInfo.ts";
import {fs,CLAUDE_AI_OAUTH_SCOPES,Dc} from "../src/api/0459_getOauthConfig.ts";
import {Se,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {dta} from "../src/config/3190_ISSUES_EXPLAINER.ts";
async function Zpo(){if(!isFirstPartyProvider())return{ok:!1,reason:"wrong_provider"};if(ra())return{ok:!1,reason:"essential_traffic_only"};await checkAndRefreshOAuthTokenIfNeeded();let e=getClaudeAIOAuthTokens();if(!e?.accessToken)return Xpo();if(x3t(e.scopes))return{ok:!0,accessToken:e.accessToken,expanded:!1};if(!e.refreshToken)return Xpo();if(Qpo){let r=await l4n();return r.ok?{ok:!0,accessToken:r.accessToken,expanded:!1}:{ok:!1,reason:"expand_failed",detail:"prior expansion attempt this session failed; not retrying"}}let t=await(async()=>{try{return await withOAuthRefreshLock(async({lockedTokens:r})=>{if(!r?.refreshToken)return Xpo();if(x3t(r.scopes)&&r.accessToken)return{ok:!0,accessToken:r.accessToken,expanded:!1};let o=await refreshOAuthToken(r.refreshToken,{clientId:r.clientId,scopes:fs([...CLAUDE_AI_OAUTH_SCOPES,MVa,NVa])});if(await saveOAuthTokensIfNeeded(o),!x3t(o.scopes))return Qpo=!0,{ok:!1,reason:"expand_failed",detail:"refresh succeeded but design scopes not granted"};return{ok:!0,accessToken:o.accessToken,expanded:!0}})}catch(r){return{ok:!1,reason:"expand_failed",detail:Se(r)}}})();if(t.ok||t.reason!=="expand_failed")return t;let n=await l4n();if(n.ok)return logForDebugging(`Design-scope expansion failed (${t.detail??"no detail"}); using the stored design credential instead.`),{ok:!0,accessToken:n.accessToken,expanded:!1};return t}
async function Xpo(){let e=await l4n();if(e.ok)return{ok:!0,accessToken:e.accessToken,expanded:!1};return{ok:!1,reason:e.reason,detail:e.detail}}
function x3t(e){return!!e&&e.includes(MVa)&&e.includes(NVa)}
function BVa(){if(!isFirstPartyProvider()||ra()||Qpo)return!1;let e=getClaudeAIOAuthTokens();return!!e?.accessToken&&!!e.refreshToken&&!x3t(e.scopes)}
function emo(){if(!isFirstPartyProvider()||ra())return!1;let e=getClaudeAIOAuthTokens();if(e?.accessToken){if(x3t(e.scopes)||e.refreshToken)return!1}return!C3t()?.accessToken}
var MVa="user:design:read",NVa="user:design:write",Qpo=!1;
var FVa=b(()=>{Dc();DH();Ao();qe();bt();li();Ap();u4n();dta(Zpo)});
export {Zpo,Xpo,x3t,BVa,emo,MVa,NVa,Qpo,FVa};
