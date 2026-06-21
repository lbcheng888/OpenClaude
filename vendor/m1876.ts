// @ts-nocheck
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
import {YB} from "./m1762.ts";
import {hv} from "./m1754.ts";
import {hk} from "./m1768.ts";
import {Dm} from "./m1738.ts";
import {t$} from "./m1746.ts";
import {Ja} from "./m1748.ts";
import {cJe,f4} from "./m1717.ts";
import {o$} from "./m1769.ts";
import {sE} from "./m1728.ts";
import {E1} from "./m1737.ts";
var UsernamePasswordClient;
var BDr=b(()=>{AT();/*! @azure/msal-node v3.8.1 2025-10-29 */UsernamePasswordClient=class UsernamePasswordClient extends YB{constructor(e){super(e)}async acquireToken(e){this.logger.info("in acquireToken call in username-password client");let t=hv.nowSeconds(),n=await this.executeTokenRequest(this.authority,e),r=new hk(this.config.authOptions.clientId,this.cacheManager,this.cryptoUtils,this.logger,this.config.serializableCache,this.config.persistencePlugin);return r.validateTokenResponse(n.body),r.handleServerTokenResponse(n.body,this.authority,t,e)}async executeTokenRequest(e,t){let n=this.createTokenQueryParameters(t),r=Dm.appendQueryString(e.tokenEndpoint,n),o=await this.createTokenRequestBody(t),s=this.createTokenRequestHeaders({credential:t.username,type:t$.UPN}),i={clientId:this.config.authOptions.clientId,authority:e.canonicalAuthority,scopes:t.scopes,claims:t.claims,authenticationScheme:t.authenticationScheme,resourceRequestMethod:t.resourceRequestMethod,resourceRequestUri:t.resourceRequestUri,shrClaims:t.shrClaims,sshKid:t.sshKid};return this.executePostToTokenEndpoint(r,o,s,i,t.correlationId)}async createTokenRequestBody(e){let t=new Map;if(Ja.addClientId(t,this.config.authOptions.clientId),Ja.addUsername(t,e.username),Ja.addPassword(t,e.password),Ja.addScopes(t,e.scopes),Ja.addResponseType(t,cJe.IDTOKEN_TOKEN),Ja.addGrantType(t,f4.RESOURCE_OWNER_PASSWORD_GRANT),Ja.addClientInfo(t),Ja.addLibraryInfo(t,this.config.libraryInfo),Ja.addApplicationTelemetry(t,this.config.telemetry.application),Ja.addThrottling(t),this.serverTelemetryManager)Ja.addServerTelemetry(t,this.serverTelemetryManager);let n=e.correlationId||this.config.cryptoInterface.createNewGuid();if(Ja.addCorrelationId(t,n),this.config.clientCredentials.clientSecret)Ja.addClientSecret(t,this.config.clientCredentials.clientSecret);let r=this.config.clientCredentials.clientAssertion;if(r)Ja.addClientAssertion(t,await o$(r.assertion,this.config.authOptions.clientId,e.resourceRequestUri)),Ja.addClientAssertionType(t,r.assertionType);if(!sE.isEmptyObj(e.claims)||this.config.authOptions.clientCapabilities&&this.config.authOptions.clientCapabilities.length>0)Ja.addClaims(t,e.claims,this.config.authOptions.clientCapabilities);if(this.config.systemOptions.preventCorsPreflight&&e.username)Ja.addCcsUpn(t,e.username);return E1.mapToQueryString(t)}}});
export {UsernamePasswordClient,BDr};
