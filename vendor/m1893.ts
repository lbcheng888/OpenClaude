// @ts-nocheck
import {b} from "../runtime.ts";
import {EBe,W8} from "./m1890.ts";
import {bBe,y4} from "./m1887.ts";
import {_v,Qd,ManagedIdentitySourceNames,qR,gv,h4,A0} from "./m1778.ts";
import {HJe,MH} from "./m1782.ts";
import {fBe,zmn} from "./m1781.ts";
var vBe;
var JJs=b(()=>{EBe();bBe();_v();HJe();fBe();/*! @azure/msal-node v3.8.1 2025-10-29 */vBe=class vBe extends y4{constructor(e,t,n,r,o,s){super(e,t,n,r,o);this.msiEndpoint=s}static getEnvironmentVariables(){return[process.env[Qd.MSI_ENDPOINT]]}static tryCreate(e,t,n,r,o,s){let[i]=vBe.getEnvironmentVariables();if(!i)return e.info(`[Managed Identity] ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity is unavailable because the '${Qd.MSI_ENDPOINT} environment variable is not defined.`),null;let a=vBe.getValidatedEnvVariableUrlString(Qd.MSI_ENDPOINT,i,ManagedIdentitySourceNames.CLOUD_SHELL,e);if(e.info(`[Managed Identity] Environment variable validation passed for ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity. Endpoint URI: ${a}. Creating ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity.`),s.idType!==qR.SYSTEM_ASSIGNED)throw MH(zmn);return new vBe(e,t,n,r,o,i)}createRequest(e){let t=new W8(gv.POST,this.msiEndpoint);return t.headers[h4.METADATA_HEADER_NAME]="true",t.bodyParameters[A0.RESOURCE]=e,t}}});
export {vBe,JJs};
