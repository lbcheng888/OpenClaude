// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {isFirstPartyProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber,getClaudeAIOAuthTokens,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
var s_o={};
ft(s_o,{sanitizeSessionNamePrefix:()=>sanitizeSessionNamePrefix,getBridgeTokenOverride:()=>getBridgeTokenOverride,getBridgeSessionNamePrefix:()=>getBridgeSessionNamePrefix,getBridgeBaseUrlOverride:()=>getBridgeBaseUrlOverride,getBridgeBaseUrl:()=>getBridgeBaseUrl,getBridgeAccessToken:()=>getBridgeAccessToken});
function getBridgeTokenOverride(){return}
function getBridgeBaseUrlOverride(){return}
function getBridgeAccessToken(){let e=getBridgeTokenOverride();if(e!==void 0)return e;if(!isFirstPartyProvider()||!isClaudeAISubscriber())return;return getClaudeAIOAuthTokens()?.accessToken}
function getBridgeBaseUrl(){return getBridgeBaseUrlOverride()??getOauthConfig().BASE_API_URL}
function getBridgeSessionNamePrefix(){let e=process.env.CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX||Tja.hostname();return sanitizeSessionNamePrefix(e)||"remote-control"}
function sanitizeSessionNamePrefix(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
var Tja;
var BY=b(()=>{Sc();lo();Ps();Tja=require("os")});
export {s_o,getBridgeTokenOverride,getBridgeBaseUrlOverride,getBridgeAccessToken,getBridgeBaseUrl,getBridgeSessionNamePrefix,sanitizeSessionNamePrefix,Tja,BY};
