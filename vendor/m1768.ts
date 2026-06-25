// @ts-nocheck
import {ft,b} from "../runtime.ts";
var InteractionRequiredAuthErrorCodes={};
ft(InteractionRequiredAuthErrorCodes,{uxNotAllowed:()=>uxNotAllowed,refreshTokenExpired:()=>refreshTokenExpired,noTokensFound:()=>noTokensFound,nativeAccountUnavailable:()=>nativeAccountUnavailable,loginRequired:()=>loginRequired,interactionRequired:()=>interactionRequired,consentRequired:()=>consentRequired,badToken:()=>badToken});
var noTokensFound="no_tokens_found",nativeAccountUnavailable="native_account_unavailable",refreshTokenExpired="refresh_token_expired",uxNotAllowed="ux_not_allowed",interactionRequired="interaction_required",consentRequired="consent_required",loginRequired="login_required",badToken="bad_token";
var dgn=b(()=>{/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {InteractionRequiredAuthErrorCodes,noTokensFound,nativeAccountUnavailable,refreshTokenExpired,uxNotAllowed,interactionRequired,consentRequired,loginRequired,badToken,dgn};
