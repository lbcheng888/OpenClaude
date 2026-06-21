// @ts-nocheck
import {b} from "../runtime.ts";
import {bBe,y4} from "./m1887.ts";
import {_v,Qd,ManagedIdentitySourceNames,gv,h4,A0,qR} from "./m1778.ts";
import {EBe,W8} from "./m1890.ts";
var Rqu="2019-08-01",CBe;
var WJs=b(()=>{bBe();_v();EBe();/*! @azure/msal-node v3.8.1 2025-10-29 */CBe=class CBe extends y4{constructor(e,t,n,r,o,s,i){super(e,t,n,r,o);this.identityEndpoint=s,this.identityHeader=i}static getEnvironmentVariables(){let e=process.env[Qd.IDENTITY_ENDPOINT],t=process.env[Qd.IDENTITY_HEADER];return[e,t]}static tryCreate(e,t,n,r,o){let[s,i]=CBe.getEnvironmentVariables();if(!s||!i)return e.info(`[Managed Identity] ${ManagedIdentitySourceNames.APP_SERVICE} managed identity is unavailable because one or both of the '${Qd.IDENTITY_HEADER}' and '${Qd.IDENTITY_ENDPOINT}' environment variables are not defined.`),null;let a=CBe.getValidatedEnvVariableUrlString(Qd.IDENTITY_ENDPOINT,s,ManagedIdentitySourceNames.APP_SERVICE,e);return e.info(`[Managed Identity] Environment variables validation passed for ${ManagedIdentitySourceNames.APP_SERVICE} managed identity. Endpoint URI: ${a}. Creating ${ManagedIdentitySourceNames.APP_SERVICE} managed identity.`),new CBe(e,t,n,r,o,s,i)}createRequest(e,t){let n=new W8(gv.GET,this.identityEndpoint);if(n.headers[h4.APP_SERVICE_SECRET_HEADER_NAME]=this.identityHeader,n.queryParameters[A0.API_VERSION]=Rqu,n.queryParameters[A0.RESOURCE]=e,t.idType!==qR.SYSTEM_ASSIGNED)n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(t.idType)]=t.id;return n}}});
export {Rqu,CBe,WJs};
