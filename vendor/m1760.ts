// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {sT,Qf,dD,mse,PHt,Kme,lQe,dC} from "./m1722.ts";
import {nowSeconds,mRe} from "./m1759.ts";
import {extractTokenClaims,_Qe} from "./m1741.ts";
import {jo,x0} from "./m1726.ts";
import {tokenClaimsCnfRequiredForSignedJwt,uI} from "./m1725.ts";
var R2={};
ft(R2,{updateCloudDiscoveryMetadata:()=>updateCloudDiscoveryMetadata,updateAuthorityEndpointMetadata:()=>updateAuthorityEndpointMetadata,isThrottlingEntity:()=>isThrottlingEntity,isServerTelemetryEntity:()=>isServerTelemetryEntity,isRefreshTokenEntity:()=>isRefreshTokenEntity,isIdTokenEntity:()=>isIdTokenEntity,isCredentialEntity:()=>isCredentialEntity,isAuthorityMetadataExpired:()=>isAuthorityMetadataExpired,isAuthorityMetadataEntity:()=>isAuthorityMetadataEntity,isAppMetadataEntity:()=>isAppMetadataEntity,isAccessTokenEntity:()=>isAccessTokenEntity,generateAuthorityMetadataExpiresAt:()=>generateAuthorityMetadataExpiresAt,generateAppMetadataKey:()=>generateAppMetadataKey,createRefreshTokenEntity:()=>createRefreshTokenEntity,createIdTokenEntity:()=>createIdTokenEntity,createAccessTokenEntity:()=>createAccessTokenEntity});
function createIdTokenEntity(e,t,n,r,o){return{credentialType:sT.ID_TOKEN,homeAccountId:e,environment:t,clientId:r,secret:n,realm:o,lastUpdatedAt:Date.now().toString()}}
function createAccessTokenEntity(e,t,n,r,o,s,i,a,l,c,u,d,p,m,f){let h={homeAccountId:e,credentialType:sT.ACCESS_TOKEN,secret:n,cachedAt:nowSeconds().toString(),expiresOn:i.toString(),extendedExpiresOn:a.toString(),environment:t,clientId:r,realm:o,target:s,tokenType:u||Qf.BEARER,lastUpdatedAt:Date.now().toString()};if(d)h.userAssertionHash=d;if(c)h.refreshOn=c.toString();if(m)h.requestedClaims=m,h.requestedClaimsHash=f;if(h.tokenType?.toLowerCase()!==Qf.BEARER.toLowerCase())switch(h.credentialType=sT.ACCESS_TOKEN_WITH_AUTH_SCHEME,h.tokenType){case Qf.POP:let g=extractTokenClaims(n,l);if(!g?.cnf?.kid)throw jo(tokenClaimsCnfRequiredForSignedJwt);h.keyId=g.cnf.kid;break;case Qf.SSH:h.keyId=p}return h}
function createRefreshTokenEntity(e,t,n,r,o,s,i){let a={credentialType:sT.REFRESH_TOKEN,homeAccountId:e,environment:t,clientId:r,secret:n,lastUpdatedAt:Date.now().toString()};if(s)a.userAssertionHash=s;if(o)a.familyId=o;if(i)a.expiresOn=i.toString();return a}
function isCredentialEntity(e){return e.hasOwnProperty("homeAccountId")&&e.hasOwnProperty("environment")&&e.hasOwnProperty("credentialType")&&e.hasOwnProperty("clientId")&&e.hasOwnProperty("secret")}
function isAccessTokenEntity(e){if(!e)return!1;return isCredentialEntity(e)&&e.hasOwnProperty("realm")&&e.hasOwnProperty("target")&&(e.credentialType===sT.ACCESS_TOKEN||e.credentialType===sT.ACCESS_TOKEN_WITH_AUTH_SCHEME)}
function isIdTokenEntity(e){if(!e)return!1;return isCredentialEntity(e)&&e.hasOwnProperty("realm")&&e.credentialType===sT.ID_TOKEN}
function isRefreshTokenEntity(e){if(!e)return!1;return isCredentialEntity(e)&&e.credentialType===sT.REFRESH_TOKEN}
function isServerTelemetryEntity(e,t){let n=e.indexOf(dD.CACHE_KEY)===0,r=!0;if(t)r=t.hasOwnProperty("failedRequests")&&t.hasOwnProperty("errors")&&t.hasOwnProperty("cacheHits");return n&&r}
function isThrottlingEntity(e,t){let n=!1;if(e)n=e.indexOf(mse.THROTTLING_PREFIX)===0;let r=!0;if(t)r=t.hasOwnProperty("throttleTime");return n&&r}
function generateAppMetadataKey({environment:e,clientId:t}){return[PHt,e,t].join(Kme.CACHE_KEY_SEPARATOR).toLowerCase()}
function isAppMetadataEntity(e,t){if(!t)return!1;return e.indexOf(PHt)===0&&t.hasOwnProperty("clientId")&&t.hasOwnProperty("environment")}
function isAuthorityMetadataEntity(e,t){if(!t)return!1;return e.indexOf(lQe.CACHE_KEY)===0&&t.hasOwnProperty("aliases")&&t.hasOwnProperty("preferred_cache")&&t.hasOwnProperty("preferred_network")&&t.hasOwnProperty("canonical_authority")&&t.hasOwnProperty("authorization_endpoint")&&t.hasOwnProperty("token_endpoint")&&t.hasOwnProperty("issuer")&&t.hasOwnProperty("aliasesFromNetwork")&&t.hasOwnProperty("endpointsFromNetwork")&&t.hasOwnProperty("expiresAt")&&t.hasOwnProperty("jwks_uri")}
function generateAuthorityMetadataExpiresAt(){return nowSeconds()+lQe.REFRESH_TIME_SECONDS}
function updateAuthorityEndpointMetadata(e,t,n){e.authorization_endpoint=t.authorization_endpoint,e.token_endpoint=t.token_endpoint,e.end_session_endpoint=t.end_session_endpoint,e.issuer=t.issuer,e.endpointsFromNetwork=n,e.jwks_uri=t.jwks_uri}
function updateCloudDiscoveryMetadata(e,t,n){e.aliases=t.aliases,e.preferred_cache=t.preferred_cache,e.preferred_network=t.preferred_network,e.aliasesFromNetwork=n}
function isAuthorityMetadataExpired(e){return e.expiresAt<=nowSeconds()}
var rgn=b(()=>{_Qe();x0();dC();mRe();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {R2,createIdTokenEntity,createAccessTokenEntity,createRefreshTokenEntity,isCredentialEntity,isAccessTokenEntity,isIdTokenEntity,isRefreshTokenEntity,isServerTelemetryEntity,isThrottlingEntity,generateAppMetadataKey,isAppMetadataEntity,isAuthorityMetadataEntity,generateAuthorityMetadataExpiresAt,updateAuthorityEndpointMetadata,updateCloudDiscoveryMetadata,isAuthorityMetadataExpired,rgn};
