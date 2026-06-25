// @ts-nocheck
import {isFirstPartyProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,withOAuthRefreshLock,saveOAuthTokensIfNeeded,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {g5n,Wqt,y5n} from "../src/config/4301_level.ts";
import {refreshOAuthToken,aI} from "../src/config/1293_storeOAuthAccountInfo.ts";
import {os,CLAUDE_AI_OAUTH_SCOPES,Sc} from "../src/api/0465_getOauthConfig.ts";
import {Ce,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {hla} from "../src/config/3205_ISSUES_EXPLAINER.ts";
async function Y_o(){if(!isFirstPartyProvider())return{ok:!1,reason:"wrong_provider"};if(Vi())return{ok:!1,reason:"essential_traffic_only"};await checkAndRefreshOAuthTokenIfNeeded();let e=getClaudeAIOAuthTokens();if(!e?.accessToken)return z_o();if(zqt(e.scopes))return{ok:!0,accessToken:e.accessToken,expanded:!1};if(!e.refreshToken)return z_o();if(j_o){let r=await g5n();return r.ok?{ok:!0,accessToken:r.accessToken,expanded:!1}:{ok:!1,reason:"expand_failed",detail:"prior expansion attempt this session failed; not retrying"}}let t=await(async()=>{try{return await withOAuthRefreshLock(async({lockedTokens:r})=>{if(!r?.refreshToken)return z_o();if(zqt(r.scopes)&&r.accessToken)return{ok:!0,accessToken:r.accessToken,expanded:!1};let o=await refreshOAuthToken(r.refreshToken,{clientId:r.clientId,scopes:os([...CLAUDE_AI_OAUTH_SCOPES,rQa,oQa])});if(await saveOAuthTokensIfNeeded(o),!zqt(o.scopes))return j_o=!0,{ok:!1,reason:"expand_failed",detail:"refresh succeeded but design scopes not granted"};return{ok:!0,accessToken:o.accessToken,expanded:!0}})}catch(r){return{ok:!1,reason:"expand_failed",detail:Ce(r)}}})();if(t.ok||t.reason!=="expand_failed")return t;let n=await g5n();if(n.ok)return logForDebugging(`Design-scope expansion failed (${t.detail??"no detail"}); using the stored design credential instead.`),{ok:!0,accessToken:n.accessToken,expanded:!1};return t}
async function z_o(){let e=await g5n();if(e.ok)return{ok:!0,accessToken:e.accessToken,expanded:!1};return{ok:!1,reason:e.reason,detail:e.detail}}
function zqt(e){return!!e&&e.includes(rQa)&&e.includes(oQa)}
function sQa(){if(!isFirstPartyProvider()||Vi()||j_o)return!1;let e=getClaudeAIOAuthTokens();return!!e?.accessToken&&!!e.refreshToken&&!zqt(e.scopes)}
function J_o(){if(!isFirstPartyProvider()||Vi())return!1;let e=getClaudeAIOAuthTokens();if(e?.accessToken){if(zqt(e.scopes)||e.refreshToken)return!1}return!Wqt()?.accessToken}
var rQa="user:design:read",oQa="user:design:write",j_o=!1;
var iQa=b(()=>{Sc();aI();lo();qe();Ct();Ps();$d();y5n();hla(Y_o)});
export {Y_o,z_o,zqt,sQa,J_o,rQa,oQa,j_o,iQa};
