// @ts-nocheck
import {b} from "../runtime.ts";
import {DIt,yF} from "./m1767.ts";
import {mRe,wasClockTurnedBack,isTokenExpired} from "./m1759.ts";
import {x0,jo} from "./m1726.ts";
import {MIt,Ik} from "./m1773.ts";
import {dC,cE} from "./m1722.ts";
import {uRe,uE} from "./m1733.ts";
import {_Qe,extractTokenClaims,checkMaxAge} from "./m1741.ts";
import {IQ,no} from "./m1748.ts";
import {ofe,Lh} from "./m1757.ts";
import {sgn,jXs} from "./m1761.ts";
import {uI,tokenRefreshRequired,noAccountInSilentRequest,authTimeNotFound} from "./m1725.ts";
var Tgn;
var nQs=b(()=>{DIt();mRe();x0();MIt();dC();uRe();_Qe();IQ();ofe();sgn();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */Tgn=class Tgn extends yF{constructor(e,t){super(e,t)}async acquireCachedToken(e){this.performanceClient?.addQueueMeasurement(no.SilentFlowClientAcquireCachedToken,e.correlationId);let t=cE.NOT_APPLICABLE;if(e.forceRefresh||!this.config.cacheOptions.claimsBasedCachingEnabled&&!uE.isEmptyObj(e.claims))throw this.setCacheOutcome(cE.FORCE_REFRESH_OR_CLAIMS,e.correlationId),jo(tokenRefreshRequired);if(!e.account)throw jo(noAccountInSilentRequest);let n=e.account.tenantId||jXs(e.authority),r=this.cacheManager.getTokenKeys(),o=this.cacheManager.getAccessToken(e.account,e,r,n);if(!o)throw this.setCacheOutcome(cE.NO_CACHED_ACCESS_TOKEN,e.correlationId),jo(tokenRefreshRequired);else if(wasClockTurnedBack(o.cachedAt)||isTokenExpired(o.expiresOn,this.config.systemOptions.tokenRenewalOffsetSeconds))throw this.setCacheOutcome(cE.CACHED_ACCESS_TOKEN_EXPIRED,e.correlationId),jo(tokenRefreshRequired);else if(o.refreshOn&&isTokenExpired(o.refreshOn,0))t=cE.PROACTIVELY_REFRESHED;let s=e.authority||this.authority.getPreferredCache(),i={account:this.cacheManager.getAccount(this.cacheManager.generateAccountKey(e.account),e.correlationId),accessToken:o,idToken:this.cacheManager.getIdToken(e.account,e.correlationId,r,n,this.performanceClient),refreshToken:null,appMetadata:this.cacheManager.readAppMetadataFromCache(s)};if(this.setCacheOutcome(t,e.correlationId),this.config.serverTelemetryManager)this.config.serverTelemetryManager.incrementCacheHits();return[await Lh(this.generateResultFromCacheRecord.bind(this),no.SilentFlowClientGenerateResultFromCacheRecord,this.logger,this.performanceClient,e.correlationId)(i,e),t]}setCacheOutcome(e,t){if(this.serverTelemetryManager?.setCacheOutcome(e),this.performanceClient?.addFields({cacheOutcome:e},t),e!==cE.NOT_APPLICABLE)this.logger.info(`Token refresh is required due to cache outcome: ${e}`)}async generateResultFromCacheRecord(e,t){this.performanceClient?.addQueueMeasurement(no.SilentFlowClientGenerateResultFromCacheRecord,t.correlationId);let n;if(e.idToken)n=extractTokenClaims(e.idToken.secret,this.config.cryptoInterface.base64Decode);if(t.maxAge||t.maxAge===0){let r=n?.auth_time;if(!r)throw jo(authTimeNotFound);checkMaxAge(r,t.maxAge)}return Ik.generateAuthenticationResult(this.cryptoUtils,this.authority,e,!0,t,n)}}});
export {Tgn,nQs};
