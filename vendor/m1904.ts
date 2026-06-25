// @ts-nocheck
import {CBe,Jni} from "./m1902.ts";
import {ManagedIdentitySourceNames,RA} from "./m1783.ts";
import {SBe,Bni} from "./m1896.ts";
import {ABe,Xni} from "./m1903.ts";
import {bBe,Vni} from "./m1898.ts";
import {bRe,Gni} from "./m1897.ts";
import {u0t,Yni} from "./m1901.ts";
import {dI,kQe} from "./m1787.ts";
import {xgn,uBe} from "./m1786.ts";
import {b} from "../runtime.ts";
class cfe{constructor(e,t,n,r,o){this.logger=e,this.nodeStorage=t,this.networkClient=n,this.cryptoProvider=r,this.disableInternalRetries=o}async sendManagedIdentityTokenRequest(e,t,n,r){if(!cfe.identitySource)cfe.identitySource=this.selectManagedIdentitySource(this.logger,this.nodeStorage,this.networkClient,this.cryptoProvider,this.disableInternalRetries,t);return cfe.identitySource.acquireTokenWithManagedIdentity(e,t,n,r)}allEnvironmentVariablesAreDefined(e){return Object.values(e).every((t)=>t!==void 0)}getManagedIdentitySource(){return cfe.sourceName=this.allEnvironmentVariablesAreDefined(CBe.getEnvironmentVariables())?ManagedIdentitySourceNames.SERVICE_FABRIC:this.allEnvironmentVariablesAreDefined(SBe.getEnvironmentVariables())?ManagedIdentitySourceNames.APP_SERVICE:this.allEnvironmentVariablesAreDefined(ABe.getEnvironmentVariables())?ManagedIdentitySourceNames.MACHINE_LEARNING:this.allEnvironmentVariablesAreDefined(bBe.getEnvironmentVariables())?ManagedIdentitySourceNames.CLOUD_SHELL:this.allEnvironmentVariablesAreDefined(bRe.getEnvironmentVariables())?ManagedIdentitySourceNames.AZURE_ARC:ManagedIdentitySourceNames.DEFAULT_TO_IMDS,cfe.sourceName}selectManagedIdentitySource(e,t,n,r,o,s){let i=CBe.tryCreate(e,t,n,r,o,s)||SBe.tryCreate(e,t,n,r,o)||ABe.tryCreate(e,t,n,r,o)||bBe.tryCreate(e,t,n,r,o,s)||bRe.tryCreate(e,t,n,r,o,s)||u0t.tryCreate(e,t,n,r,o);if(!i)throw dI(xgn);return i}}
var Qni=b(()=>{Bni();Gni();Vni();Yni();Jni();kQe();RA();Xni();uBe();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {cfe,Qni};
