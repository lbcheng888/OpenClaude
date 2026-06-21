// @ts-nocheck
import {RBe,tXs} from "./m1897.ts";
import {ManagedIdentitySourceNames,_v} from "./m1778.ts";
import {CBe,WJs} from "./m1891.ts";
import {xBe,nXs} from "./m1898.ts";
import {vBe,JJs} from "./m1893.ts";
import {BCe,YJs} from "./m1892.ts";
import {Nxt,eXs} from "./m1896.ts";
import {MH,HJe} from "./m1782.ts";
import {Ymn,fBe} from "./m1781.ts";
import {b} from "../runtime.ts";
class efe{constructor(e,t,n,r,o){this.logger=e,this.nodeStorage=t,this.networkClient=n,this.cryptoProvider=r,this.disableInternalRetries=o}async sendManagedIdentityTokenRequest(e,t,n,r){if(!efe.identitySource)efe.identitySource=this.selectManagedIdentitySource(this.logger,this.nodeStorage,this.networkClient,this.cryptoProvider,this.disableInternalRetries,t);return efe.identitySource.acquireTokenWithManagedIdentity(e,t,n,r)}allEnvironmentVariablesAreDefined(e){return Object.values(e).every((t)=>t!==void 0)}getManagedIdentitySource(){return efe.sourceName=this.allEnvironmentVariablesAreDefined(RBe.getEnvironmentVariables())?ManagedIdentitySourceNames.SERVICE_FABRIC:this.allEnvironmentVariablesAreDefined(CBe.getEnvironmentVariables())?ManagedIdentitySourceNames.APP_SERVICE:this.allEnvironmentVariablesAreDefined(xBe.getEnvironmentVariables())?ManagedIdentitySourceNames.MACHINE_LEARNING:this.allEnvironmentVariablesAreDefined(vBe.getEnvironmentVariables())?ManagedIdentitySourceNames.CLOUD_SHELL:this.allEnvironmentVariablesAreDefined(BCe.getEnvironmentVariables())?ManagedIdentitySourceNames.AZURE_ARC:ManagedIdentitySourceNames.DEFAULT_TO_IMDS,efe.sourceName}selectManagedIdentitySource(e,t,n,r,o,s){let i=RBe.tryCreate(e,t,n,r,o,s)||CBe.tryCreate(e,t,n,r,o)||xBe.tryCreate(e,t,n,r,o)||vBe.tryCreate(e,t,n,r,o,s)||BCe.tryCreate(e,t,n,r,o,s)||Nxt.tryCreate(e,t,n,r,o);if(!i)throw MH(Ymn);return i}}
var rXs=b(()=>{WJs();YJs();JJs();eXs();tXs();HJe();_v();nXs();fBe();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {efe,rXs};
