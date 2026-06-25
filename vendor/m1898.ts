// @ts-nocheck
import {b} from "../runtime.ts";
import {TBe,o8} from "./m1895.ts";
import {yBe,F3} from "./m1892.ts";
import {RA,wd,ManagedIdentitySourceNames,ew,AA,L3,P0} from "./m1783.ts";
import {kQe,dI} from "./m1787.ts";
import {uBe,Ign} from "./m1786.ts";
var bBe;
var Vni=b(()=>{TBe();yBe();RA();kQe();uBe();/*! @azure/msal-node v3.8.1 2025-10-29 */bBe=class bBe extends F3{constructor(e,t,n,r,o,s){super(e,t,n,r,o);this.msiEndpoint=s}static getEnvironmentVariables(){return[process.env[wd.MSI_ENDPOINT]]}static tryCreate(e,t,n,r,o,s){let[i]=bBe.getEnvironmentVariables();if(!i)return e.info(`[Managed Identity] ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity is unavailable because the '${wd.MSI_ENDPOINT} environment variable is not defined.`),null;let a=bBe.getValidatedEnvVariableUrlString(wd.MSI_ENDPOINT,i,ManagedIdentitySourceNames.CLOUD_SHELL,e);if(e.info(`[Managed Identity] Environment variable validation passed for ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity. Endpoint URI: ${a}. Creating ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity.`),s.idType!==ew.SYSTEM_ASSIGNED)throw dI(Ign);return new bBe(e,t,n,r,o,i)}createRequest(e){let t=new o8(AA.POST,this.msiEndpoint);return t.headers[L3.METADATA_HEADER_NAME]="true",t.bodyParameters[P0.RESOURCE]=e,t}}});
export {bBe,Vni};
