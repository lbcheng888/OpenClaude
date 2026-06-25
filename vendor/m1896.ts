// @ts-nocheck
import {b} from "../runtime.ts";
import {yBe,F3} from "./m1892.ts";
import {RA,wd,ManagedIdentitySourceNames,AA,L3,P0,ew} from "./m1783.ts";
import {TBe,o8} from "./m1895.ts";
var Kju="2019-08-01",SBe;
var Bni=b(()=>{yBe();RA();TBe();/*! @azure/msal-node v3.8.1 2025-10-29 */SBe=class SBe extends F3{constructor(e,t,n,r,o,s,i){super(e,t,n,r,o);this.identityEndpoint=s,this.identityHeader=i}static getEnvironmentVariables(){let e=process.env[wd.IDENTITY_ENDPOINT],t=process.env[wd.IDENTITY_HEADER];return[e,t]}static tryCreate(e,t,n,r,o){let[s,i]=SBe.getEnvironmentVariables();if(!s||!i)return e.info(`[Managed Identity] ${ManagedIdentitySourceNames.APP_SERVICE} managed identity is unavailable because one or both of the '${wd.IDENTITY_HEADER}' and '${wd.IDENTITY_ENDPOINT}' environment variables are not defined.`),null;let a=SBe.getValidatedEnvVariableUrlString(wd.IDENTITY_ENDPOINT,s,ManagedIdentitySourceNames.APP_SERVICE,e);return e.info(`[Managed Identity] Environment variables validation passed for ${ManagedIdentitySourceNames.APP_SERVICE} managed identity. Endpoint URI: ${a}. Creating ${ManagedIdentitySourceNames.APP_SERVICE} managed identity.`),new SBe(e,t,n,r,o,s,i)}createRequest(e,t){let n=new o8(AA.GET,this.identityEndpoint);if(n.headers[L3.APP_SERVICE_SECRET_HEADER_NAME]=this.identityHeader,n.queryParameters[P0.API_VERSION]=Kju,n.queryParameters[P0.RESOURCE]=e,t.idType!==ew.SYSTEM_ASSIGNED)n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(t.idType)]=t.id;return n}}});
export {Kju,SBe,Bni};
