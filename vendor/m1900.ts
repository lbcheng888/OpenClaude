// @ts-nocheck
import {O7s,U0r} from "./m1785.ts";
import {Logger} from "./m1723.ts";
import {Dfn,BQ,BJe} from "./m1875.ts";
import {Ho,b1,oE} from "./m1717.ts";
import {hBe,nfn} from "./m1798.ts";
import {mJe} from "./m1722.ts";
import {CryptoProvider,gxt} from "./m1795.ts";
import {ProtocolMode} from "./m1734.ts";
import {O0r,_v,ManagedIdentitySourceNames} from "./m1778.ts";
import {ZD} from "./m1756.ts";
import {ClientCredentialClient,Ofn} from "./m1882.ts";
import {efe,rXs} from "./m1899.ts";
import {ABe,efn} from "./m1793.ts";
import {KS} from "./m1727.ts";
import {ClientConfigurationErrorCodes} from "./m1726.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
class ManagedIdentityApplication{constructor(e){this.config=O7s(e||{}),this.logger=new Logger(this.config.system.loggerOptions,Dfn,BQ);let t={canonicalAuthority:Ho.DEFAULT_AUTHORITY};if(!ManagedIdentityApplication.nodeStorage)ManagedIdentityApplication.nodeStorage=new hBe(this.logger,this.config.managedIdentityId.id,mJe,t);this.networkClient=this.config.system.networkClient,this.cryptoProvider=new CryptoProvider;let n={protocolMode:ProtocolMode.AAD,knownAuthorities:[O0r],cloudDiscoveryMetadata:"",authorityMetadata:""};this.fakeAuthority=new ZD(O0r,this.networkClient,ManagedIdentityApplication.nodeStorage,n,this.logger,this.cryptoProvider.createNewGuid(),void 0,!0),this.fakeClientCredentialClient=new ClientCredentialClient({authOptions:{clientId:this.config.managedIdentityId.id,authority:this.fakeAuthority}}),this.managedIdentityClient=new efe(this.logger,ManagedIdentityApplication.nodeStorage,this.networkClient,this.cryptoProvider,this.config.disableInternalRetries),this.hashUtils=new ABe}async acquireToken(e){if(!e.resource)throw KS(ClientConfigurationErrorCodes.urlEmptyError);let t={forceRefresh:e.forceRefresh,resource:e.resource.replace("/.default",""),scopes:[e.resource.replace("/.default","")],authority:this.fakeAuthority.canonicalAuthority,correlationId:this.cryptoProvider.createNewGuid(),claims:e.claims,clientCapabilities:this.config.clientCapabilities};if(t.forceRefresh)return this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority);let[n,r]=await this.fakeClientCredentialClient.getCachedAuthenticationResult(t,this.config,this.cryptoProvider,this.fakeAuthority,ManagedIdentityApplication.nodeStorage);if(t.claims){let o=this.managedIdentityClient.getManagedIdentitySource();if(n&&qqu.includes(o)){let s=this.hashUtils.sha256(n.accessToken).toString(b1.HEX);t.revokedTokenSha256Hash=s}return this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority)}if(n){if(r===oE.PROACTIVELY_REFRESHED){this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.");let o=!0;await this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority,o)}return n}else return this.acquireTokenFromManagedIdentity(t,this.config.managedIdentityId,this.fakeAuthority)}async acquireTokenFromManagedIdentity(e,t,n,r){return this.managedIdentityClient.sendManagedIdentityTokenRequest(e,t,n,r)}getManagedIdentitySource(){return efe.sourceName||this.managedIdentityClient.getManagedIdentitySource()}}
var qqu;
var oXs=b(()=>{AT();U0r();BJe();gxt();Ofn();rXs();nfn();_v();efn();/*! @azure/msal-node v3.8.1 2025-10-29 */qqu=[ManagedIdentitySourceNames.SERVICE_FABRIC]});
export {ManagedIdentityApplication,qqu,oXs};
