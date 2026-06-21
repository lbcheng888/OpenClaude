// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {isFirstPartyProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber,getClaudeAIOAuthTokens,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
var upo={};
isFullscreenWithTTY(upo,{sanitizeSessionNamePrefix:()=>sanitizeSessionNamePrefix,getBridgeTokenOverride:()=>getBridgeTokenOverride,getBridgeSessionNamePrefix:()=>getBridgeSessionNamePrefix,getBridgeBaseUrlOverride:()=>getBridgeBaseUrlOverride,getBridgeBaseUrl:()=>getBridgeBaseUrl,getBridgeAccessToken:()=>getBridgeAccessToken});
function getBridgeTokenOverride(){return}
function getBridgeBaseUrlOverride(){return}
function getBridgeAccessToken(){let e=getBridgeTokenOverride();if(e!==void 0)return e;if(!isFirstPartyProvider()||!isClaudeAISubscriber())return;return getClaudeAIOAuthTokens()?.accessToken}
function getBridgeBaseUrl(){return getBridgeBaseUrlOverride()??getOauthConfig().BASE_API_URL}
function getBridgeSessionNamePrefix(){let e=process.env.CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX||e5a.hostname();return sanitizeSessionNamePrefix(e)||"remote-control"}
function sanitizeSessionNamePrefix(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
var e5a;
var tJ=b(()=>{Dc();Ao();li();e5a=require("os")});
export {upo,getBridgeTokenOverride,getBridgeBaseUrlOverride,getBridgeAccessToken,getBridgeBaseUrl,getBridgeSessionNamePrefix,sanitizeSessionNamePrefix,e5a,tJ};
