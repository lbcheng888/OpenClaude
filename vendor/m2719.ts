// @ts-nocheck
import {isPolicyAllowed,rd} from "./m2205.ts";
import {isFirstPartyProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {sS,UO} from "../src/config/2189_level.ts";
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,withOAuthRefreshLock,saveOAuthTokensIfNeeded,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {refreshOAuthToken,DH} from "../src/config/1288_storeOAuthAccountInfo.ts";
import {CLAUDE_AI_OAUTH_SCOPES,Dc} from "../src/api/0459_getOauthConfig.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function Twn(){if(!isPolicyAllowed("allow_projects_tool"))return{ok:!1,reason:"policy_disabled"};if(!isFirstPartyProvider())return{ok:!1,reason:"wrong_provider"};if(ra())return{ok:!1,reason:"essential_traffic_only"};let e=sS();if(e)return{ok:!0,accessToken:e,expanded:!1};await checkAndRefreshOAuthTokenIfNeeded();let t=getClaudeAIOAuthTokens();if(!t?.accessToken)return{ok:!1,reason:"no_token"};if(a8r(t.scopes))return{ok:!0,accessToken:t.accessToken,expanded:!1};if(!t.refreshToken)return{ok:!1,reason:"no_refresh"};try{return await withOAuthRefreshLock(async({lockedTokens:n})=>{if(!n?.refreshToken)return{ok:!1,reason:"no_refresh"};if(a8r(n.scopes)&&n.accessToken)return{ok:!0,accessToken:n.accessToken,expanded:!1};let r=await refreshOAuthToken(n.refreshToken,{clientId:n.clientId,scopes:[...CLAUDE_AI_OAUTH_SCOPES,JBi,XBi]});if(await saveOAuthTokensIfNeeded(r),!a8r(r.scopes))return{ok:!1,reason:"expand_failed",detail:"refresh succeeded but projects scopes not granted"};return{ok:!0,accessToken:r.accessToken,expanded:!0}})}catch(n){return{ok:!1,reason:"expand_failed",detail:Se(n)}}}
function a8r(e){return!!e&&e.includes(JBi)&&e.includes(XBi)}
var JBi="user:projects:read",XBi="user:projects:write";
var l8r=b(()=>{Dc();DH();rd();Ao();bt();li();Ap();UO()});
export {Twn,a8r,JBi,XBi,l8r};
