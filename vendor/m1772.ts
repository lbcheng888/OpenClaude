// @ts-nocheck
import {b} from "../runtime.ts";
import {sxt,YB} from "./m1762.ts";
import {HCe,wasClockTurnedBack,isTokenExpired} from "./m1754.ts";
import {m0,ls} from "./m1721.ts";
import {cxt,hk} from "./m1768.ts";
import {aC,oE} from "./m1717.ts";
import {RCe,sE} from "./m1728.ts";
import {yJe,extractTokenClaims,checkMaxAge} from "./m1736.ts";
import {OQ,Zr} from "./m1743.ts";
import {Yme,Ih} from "./m1752.ts";
import {Emn,ZVs} from "./m1756.ts";
import {LH,tokenRefreshRequired,noAccountInSilentRequest,authTimeNotFound} from "./m1720.ts";
var Nmn;
var a7s=b(()=>{sxt();HCe();m0();cxt();aC();RCe();yJe();OQ();Yme();Emn();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */Nmn=class Nmn extends YB{constructor(e,t){super(e,t)}async acquireCachedToken(e){this.performanceClient?.addQueueMeasurement(Zr.SilentFlowClientAcquireCachedToken,e.correlationId);let t=oE.NOT_APPLICABLE;if(e.forceRefresh||!this.config.cacheOptions.claimsBasedCachingEnabled&&!sE.isEmptyObj(e.claims))throw this.setCacheOutcome(oE.FORCE_REFRESH_OR_CLAIMS,e.correlationId),ls(tokenRefreshRequired);if(!e.account)throw ls(noAccountInSilentRequest);let n=e.account.tenantId||ZVs(e.authority),r=this.cacheManager.getTokenKeys(),o=this.cacheManager.getAccessToken(e.account,e,r,n);if(!o)throw this.setCacheOutcome(oE.NO_CACHED_ACCESS_TOKEN,e.correlationId),ls(tokenRefreshRequired);else if(wasClockTurnedBack(o.cachedAt)||isTokenExpired(o.expiresOn,this.config.systemOptions.tokenRenewalOffsetSeconds))throw this.setCacheOutcome(oE.CACHED_ACCESS_TOKEN_EXPIRED,e.correlationId),ls(tokenRefreshRequired);else if(o.refreshOn&&isTokenExpired(o.refreshOn,0))t=oE.PROACTIVELY_REFRESHED;let s=e.authority||this.authority.getPreferredCache(),i={account:this.cacheManager.getAccount(this.cacheManager.generateAccountKey(e.account),e.correlationId),accessToken:o,idToken:this.cacheManager.getIdToken(e.account,e.correlationId,r,n,this.performanceClient),refreshToken:null,appMetadata:this.cacheManager.readAppMetadataFromCache(s)};if(this.setCacheOutcome(t,e.correlationId),this.config.serverTelemetryManager)this.config.serverTelemetryManager.incrementCacheHits();return[await Ih(this.generateResultFromCacheRecord.bind(this),Zr.SilentFlowClientGenerateResultFromCacheRecord,this.logger,this.performanceClient,e.correlationId)(i,e),t]}setCacheOutcome(e,t){if(this.serverTelemetryManager?.setCacheOutcome(e),this.performanceClient?.addFields({cacheOutcome:e},t),e!==oE.NOT_APPLICABLE)this.logger.info(`Token refresh is required due to cache outcome: ${e}`)}async generateResultFromCacheRecord(e,t){this.performanceClient?.addQueueMeasurement(Zr.SilentFlowClientGenerateResultFromCacheRecord,t.correlationId);let n;if(e.idToken)n=extractTokenClaims(e.idToken.secret,this.config.cryptoInterface.base64Decode);if(t.maxAge||t.maxAge===0){let r=n?.auth_time;if(!r)throw ls(authTimeNotFound);checkMaxAge(r,t.maxAge)}return hk.generateAuthenticationResult(this.cryptoUtils,this.authority,e,!0,t,n)}}});
export {Nmn,a7s};
