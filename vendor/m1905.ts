// @ts-nocheck
import {HQs,gMr} from "./m1790.ts";
import {Logger} from "./m1728.ts";
import {f_n,OQ,MQe} from "./m1880.ts";
import {Co,MM,cE} from "./m1722.ts";
import {pBe,Fgn} from "./m1803.ts";
import {dQe} from "./m1727.ts";
import {CryptoProvider,GIt} from "./m1800.ts";
import {ProtocolMode} from "./m1739.ts";
import {uMr,RA,ManagedIdentitySourceNames} from "./m1783.ts";
import {pD} from "./m1761.ts";
import {ClientCredentialClient,g_n} from "./m1887.ts";
import {cfe,Qni} from "./m1904.ts";
import {dBe,Mgn} from "./m1798.ts";
import {zS} from "./m1732.ts";
import {ClientConfigurationErrorCodes} from "./m1731.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
class ManagedIdentityApplication{constructor(e){this.config=HQs(e||{}),this.logger=new Logger(this.config.system.loggerOptions,f_n,OQ);let t={canonicalAuthority:Co.DEFAULT_AUTHORITY};if(!ManagedIdentityApplication.nodeStorage)ManagedIdentityApplication.nodeStorage=new pBe(this.logger,this.config.managedIdentityId.id,dQe,t);this.networkClient=this.config.system.networkClient,this.cryptoProvider=new CryptoProvider;let n={protocolMode:ProtocolMode.AAD,knownAuthorities:[uMr],cloudDiscoveryMetadata:"",authorityMetadata:""};this.fakeAuthority=new pD(uMr,this.networkClient,ManagedIdentityApplication.nodeStorage,n,this.logger,this.cryptoProvider.createNewGuid(),void 0,!0),this.fakeClientCredentialClient=new ClientCredentialClient({authOptions:{clientId:this.config.managedIdentityId.id,authority:this.fakeAuthority}}),this.managedIdentityClient=new cfe(this.logger,ManagedIdentityApplication.nodeStorage,this.networkClient,this.cryptoProvider,this.config.disableInternalRetries),this.hashUtils=new dBe}async acquireToken(e){if(!e.resource)throw zS(ClientConfigurationErrorCodes.urlEmptyError);let t={forceRefresh:e.forceRefresh,resource:e.resource.replace("/.default",""),scopes:[e.resource.replace("/.default","")],authority:this.fakeAuthority.canonicalAuthority,correlationId:this.cryptoProvider.createNewGuid(),claims:e.claims,clientCapabilities:this.config.clientCapabilities};if(t.forceRefresh)return this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority);let[n,r]=await this.fakeClientCredentialClient.getCachedAuthenticationResult(t,this.config,this.cryptoProvider,this.fakeAuthority,ManagedIdentityApplication.nodeStorage);if(t.claims){let o=this.managedIdentityClient.getManagedIdentitySource();if(n&&aYu.includes(o)){let s=this.hashUtils.sha256(n.accessToken).toString(MM.HEX);t.revokedTokenSha256Hash=s}return this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority)}if(n){if(r===cE.PROACTIVELY_REFRESHED){this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.");let o=!0;await this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority,o)}return n}else return this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority)}async acquireTokenFromManagedIdentity(e,t,n,r){return this.managedIdentityClient.sendManagedIdentityTokenRequest(e,t,n,r)}getManagedIdentitySource(){return cfe.sourceName||this.managedIdentityClient.getManagedIdentitySource()}}
var aYu;
var Zni=b(()=>{iT();gMr();MQe();GIt();g_n();Qni();Fgn();RA();Mgn();/*! @azure/msal-node v3.8.1 2025-10-29 */aYu=[ManagedIdentitySourceNames.SERVICE_FABRIC]});
export {ManagedIdentityApplication,aYu,Zni};
