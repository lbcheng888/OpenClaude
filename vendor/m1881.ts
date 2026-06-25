// @ts-nocheck
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
import {yF} from "./m1767.ts";
import {CA} from "./m1759.ts";
import {Ik} from "./m1773.ts";
import {zp} from "./m1743.ts";
import {A2} from "./m1751.ts";
import {La} from "./m1753.ts";
import {aQe,P3} from "./m1722.ts";
import {w2} from "./m1774.ts";
import {uE} from "./m1733.ts";
import {NM} from "./m1742.ts";
var UsernamePasswordClient;
var f1r=b(()=>{iT();/*! @azure/msal-node v3.8.1 2025-10-29 */UsernamePasswordClient=class UsernamePasswordClient extends yF{constructor(e){super(e)}async acquireToken(e){this.logger.info("in acquireToken call in username-password client");let t=CA.nowSeconds(),n=await this.executeTokenRequest(this.authority,e),r=new Ik(this.config.authOptions.clientId,this.cacheManager,this.cryptoUtils,this.logger,this.config.serializableCache,this.config.persistencePlugin);return r.validateTokenResponse(n.body),r.handleServerTokenResponse(n.body,this.authority,t,e)}async executeTokenRequest(e,t){let n=this.createTokenQueryParameters(t),r=zp.appendQueryString(e.tokenEndpoint,n),o=await this.createTokenRequestBody(t),s=this.createTokenRequestHeaders({credential:t.username,type:A2.UPN}),i={clientId:this.config.authOptions.clientId,authority:e.canonicalAuthority,scopes:t.scopes,claims:t.claims,authenticationScheme:t.authenticationScheme,resourceRequestMethod:t.resourceRequestMethod,resourceRequestUri:t.resourceRequestUri,shrClaims:t.shrClaims,sshKid:t.sshKid};return this.executePostToTokenEndpoint(r,o,s,i,t.correlationId)}async createTokenRequestBody(e){let t=new Map;if(La.addClientId(t,this.config.authOptions.clientId),La.addUsername(t,e.username),La.addPassword(t,e.password),La.addScopes(t,e.scopes),La.addResponseType(t,aQe.IDTOKEN_TOKEN),La.addGrantType(t,P3.RESOURCE_OWNER_PASSWORD_GRANT),La.addClientInfo(t),La.addLibraryInfo(t,this.config.libraryInfo),La.addApplicationTelemetry(t,this.config.telemetry.application),La.addThrottling(t),this.serverTelemetryManager)La.addServerTelemetry(t,this.serverTelemetryManager);let n=e.correlationId||this.config.cryptoInterface.createNewGuid();if(La.addCorrelationId(t,n),this.config.clientCredentials.clientSecret)La.addClientSecret(t,this.config.clientCredentials.clientSecret);let r=this.config.clientCredentials.clientAssertion;if(r)La.addClientAssertion(t,await w2(r.assertion,this.config.authOptions.clientId,e.resourceRequestUri)),La.addClientAssertionType(t,r.assertionType);if(!uE.isEmptyObj(e.claims)||this.config.authOptions.clientCapabilities&&this.config.authOptions.clientCapabilities.length>0)La.addClaims(t,e.claims,this.config.authOptions.clientCapabilities);if(this.config.systemOptions.preventCorsPreflight&&e.username)La.addCcsUpn(t,e.username);return NM.mapToQueryString(t)}}});
export {UsernamePasswordClient,f1r};
