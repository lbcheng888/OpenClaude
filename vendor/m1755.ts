// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {fT,eh,QD,fse,iRt,Nme,uJe,aC} from "./m1717.ts";
import {nowSeconds,HCe} from "./m1754.ts";
import {extractTokenClaims,yJe} from "./m1736.ts";
import {ls,m0} from "./m1721.ts";
import {tokenClaimsCnfRequiredForSignedJwt,LH} from "./m1720.ts";
var n$={};
isFullscreenWithTTY(n$,{updateCloudDiscoveryMetadata:()=>updateCloudDiscoveryMetadata,updateAuthorityEndpointMetadata:()=>updateAuthorityEndpointMetadata,isThrottlingEntity:()=>isThrottlingEntity,isServerTelemetryEntity:()=>isServerTelemetryEntity,isRefreshTokenEntity:()=>isRefreshTokenEntity,isIdTokenEntity:()=>isIdTokenEntity,isCredentialEntity:()=>isCredentialEntity,isAuthorityMetadataExpired:()=>isAuthorityMetadataExpired,isAuthorityMetadataEntity:()=>isAuthorityMetadataEntity,isAppMetadataEntity:()=>isAppMetadataEntity,isAccessTokenEntity:()=>isAccessTokenEntity,generateAuthorityMetadataExpiresAt:()=>generateAuthorityMetadataExpiresAt,generateAppMetadataKey:()=>generateAppMetadataKey,createRefreshTokenEntity:()=>createRefreshTokenEntity,createIdTokenEntity:()=>createIdTokenEntity,createAccessTokenEntity:()=>createAccessTokenEntity});
function createIdTokenEntity(e,t,n,r,o){return{credentialType:fT.ID_TOKEN,homeAccountId:e,environment:t,clientId:r,secret:n,realm:o,lastUpdatedAt:Date.now().toString()}}
function createAccessTokenEntity(e,t,n,r,o,s,i,a,l,c,u,d,p,m,f){let A={homeAccountId:e,credentialType:fT.ACCESS_TOKEN,secret:n,cachedAt:nowSeconds().toString(),expiresOn:i.toString(),extendedExpiresOn:a.toString(),environment:t,clientId:r,realm:o,target:s,tokenType:u||eh.BEARER,lastUpdatedAt:Date.now().toString()};if(d)A.userAssertionHash=d;if(c)A.refreshOn=c.toString();if(m)A.requestedClaims=m,A.requestedClaimsHash=f;if(A.tokenType?.toLowerCase()!==eh.BEARER.toLowerCase())switch(A.credentialType=fT.ACCESS_TOKEN_WITH_AUTH_SCHEME,A.tokenType){case eh.POP:let h=extractTokenClaims(n,l);if(!h?.cnf?.kid)throw ls(tokenClaimsCnfRequiredForSignedJwt);A.keyId=h.cnf.kid;break;case eh.SSH:A.keyId=p}return A}
function createRefreshTokenEntity(e,t,n,r,o,s,i){let a={credentialType:fT.REFRESH_TOKEN,homeAccountId:e,environment:t,clientId:r,secret:n,lastUpdatedAt:Date.now().toString()};if(s)a.userAssertionHash=s;if(o)a.familyId=o;if(i)a.expiresOn=i.toString();return a}
function isCredentialEntity(e){return e.hasOwnProperty("homeAccountId")&&e.hasOwnProperty("environment")&&e.hasOwnProperty("credentialType")&&e.hasOwnProperty("clientId")&&e.hasOwnProperty("secret")}
function isAccessTokenEntity(e){if(!e)return!1;return isCredentialEntity(e)&&e.hasOwnProperty("realm")&&e.hasOwnProperty("target")&&(e.credentialType===fT.ACCESS_TOKEN||e.credentialType===fT.ACCESS_TOKEN_WITH_AUTH_SCHEME)}
function isIdTokenEntity(e){if(!e)return!1;return isCredentialEntity(e)&&e.hasOwnProperty("realm")&&e.credentialType===fT.ID_TOKEN}
function isRefreshTokenEntity(e){if(!e)return!1;return isCredentialEntity(e)&&e.credentialType===fT.REFRESH_TOKEN}
function isServerTelemetryEntity(e,t){let n=e.indexOf(QD.CACHE_KEY)===0,r=!0;if(t)r=t.hasOwnProperty("failedRequests")&&t.hasOwnProperty("errors")&&t.hasOwnProperty("cacheHits");return n&&r}
function isThrottlingEntity(e,t){let n=!1;if(e)n=e.indexOf(fse.THROTTLING_PREFIX)===0;let r=!0;if(t)r=t.hasOwnProperty("throttleTime");return n&&r}
function generateAppMetadataKey({environment:e,clientId:t}){return[iRt,e,t].join(Nme.CACHE_KEY_SEPARATOR).toLowerCase()}
function isAppMetadataEntity(e,t){if(!t)return!1;return e.indexOf(iRt)===0&&t.hasOwnProperty("clientId")&&t.hasOwnProperty("environment")}
function isAuthorityMetadataEntity(e,t){if(!t)return!1;return e.indexOf(uJe.CACHE_KEY)===0&&t.hasOwnProperty("aliases")&&t.hasOwnProperty("preferred_cache")&&t.hasOwnProperty("preferred_network")&&t.hasOwnProperty("canonical_authority")&&t.hasOwnProperty("authorization_endpoint")&&t.hasOwnProperty("token_endpoint")&&t.hasOwnProperty("issuer")&&t.hasOwnProperty("aliasesFromNetwork")&&t.hasOwnProperty("endpointsFromNetwork")&&t.hasOwnProperty("expiresAt")&&t.hasOwnProperty("jwks_uri")}
function generateAuthorityMetadataExpiresAt(){return nowSeconds()+uJe.REFRESH_TIME_SECONDS}
function updateAuthorityEndpointMetadata(e,t,n){e.authorization_endpoint=t.authorization_endpoint,e.token_endpoint=t.token_endpoint,e.end_session_endpoint=t.end_session_endpoint,e.issuer=t.issuer,e.endpointsFromNetwork=n,e.jwks_uri=t.jwks_uri}
function updateCloudDiscoveryMetadata(e,t,n){e.aliases=t.aliases,e.preferred_cache=t.preferred_cache,e.preferred_network=t.preferred_network,e.aliasesFromNetwork=n}
function isAuthorityMetadataExpired(e){return e.expiresAt<=nowSeconds()}
var Smn=b(()=>{yJe();m0();aC();HCe();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {n$,createIdTokenEntity,createAccessTokenEntity,createRefreshTokenEntity,isCredentialEntity,isAccessTokenEntity,isIdTokenEntity,isRefreshTokenEntity,isServerTelemetryEntity,isThrottlingEntity,generateAppMetadataKey,isAppMetadataEntity,isAuthorityMetadataEntity,generateAuthorityMetadataExpiresAt,updateAuthorityEndpointMetadata,updateCloudDiscoveryMetadata,isAuthorityMetadataExpired,Smn};
