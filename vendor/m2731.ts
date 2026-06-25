// @ts-nocheck
import {isPolicyAllowed,Bu} from "./m2213.ts";
import {isFirstPartyProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {ZT,sO} from "../src/config/2194_level.ts";
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,withOAuthRefreshLock,saveOAuthTokensIfNeeded,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {refreshOAuthToken,aI} from "../src/config/1293_storeOAuthAccountInfo.ts";
import {CLAUDE_AI_OAUTH_SCOPES,Sc} from "../src/api/0465_getOauthConfig.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function cHn(){if(!isPolicyAllowed("allow_projects_tool"))return{ok:!1,reason:"policy_disabled"};if(!isFirstPartyProvider())return{ok:!1,reason:"wrong_provider"};if(Vi())return{ok:!1,reason:"essential_traffic_only"};let e=ZT();if(e)return{ok:!0,accessToken:e,expanded:!1};await checkAndRefreshOAuthTokenIfNeeded();let t=getClaudeAIOAuthTokens();if(!t?.accessToken)return{ok:!1,reason:"no_token"};if(FKr(t.scopes))return{ok:!0,accessToken:t.accessToken,expanded:!1};if(!t.refreshToken)return{ok:!1,reason:"no_refresh"};try{return await withOAuthRefreshLock(async({lockedTokens:n})=>{if(!n?.refreshToken)return{ok:!1,reason:"no_refresh"};if(FKr(n.scopes)&&n.accessToken)return{ok:!0,accessToken:n.accessToken,expanded:!1};let r=await refreshOAuthToken(n.refreshToken,{clientId:n.clientId,scopes:[...CLAUDE_AI_OAUTH_SCOPES,L4i,M4i]});if(await saveOAuthTokensIfNeeded(r),!FKr(r.scopes))return{ok:!1,reason:"expand_failed",detail:"refresh succeeded but projects scopes not granted"};return{ok:!0,accessToken:r.accessToken,expanded:!0}})}catch(n){return{ok:!1,reason:"expand_failed",detail:Ce(n)}}}
function FKr(e){return!!e&&e.includes(L4i)&&e.includes(M4i)}
var L4i="user:projects:read",M4i="user:projects:write";
var BKr=b(()=>{Sc();aI();Bu();lo();Ct();Ps();$d();sO()});
export {cHn,FKr,L4i,M4i,BKr};
