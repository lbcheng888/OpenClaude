// @ts-nocheck
import {b} from "../runtime.ts";
import {TBe,o8} from "./m1895.ts";
import {yBe,F3} from "./m1892.ts";
import {RA,wd,ManagedIdentitySourceNames,AA,L3,P0,ew} from "./m1783.ts";
import {zni,EBe} from "./m1900.ts";
var jni="/metadata/identity/oauth2/token",nYu,rYu="2018-02-01",u0t;
var Yni=b(()=>{TBe();yBe();RA();zni();/*! @azure/msal-node v3.8.1 2025-10-29 */nYu=`http://169.254.169.254${jni}`;u0t=class u0t extends F3{constructor(e,t,n,r,o,s){super(e,t,n,r,o);this.identityEndpoint=s}static tryCreate(e,t,n,r,o){let s;if(process.env[wd.AZURE_POD_IDENTITY_AUTHORITY_HOST])e.info(`[Managed Identity] Environment variable ${wd.AZURE_POD_IDENTITY_AUTHORITY_HOST} for ${ManagedIdentitySourceNames.IMDS} returned endpoint: ${process.env[wd.AZURE_POD_IDENTITY_AUTHORITY_HOST]}`),s=u0t.getValidatedEnvVariableUrlString(wd.AZURE_POD_IDENTITY_AUTHORITY_HOST,`${process.env[wd.AZURE_POD_IDENTITY_AUTHORITY_HOST]}${jni}`,ManagedIdentitySourceNames.IMDS,e);else e.info(`[Managed Identity] Unable to find ${wd.AZURE_POD_IDENTITY_AUTHORITY_HOST} environment variable for ${ManagedIdentitySourceNames.IMDS}, using the default endpoint.`),s=nYu;return new u0t(e,t,n,r,o,s)}createRequest(e,t){let n=new o8(AA.GET,this.identityEndpoint);if(n.headers[L3.METADATA_HEADER_NAME]="true",n.queryParameters[P0.API_VERSION]=rYu,n.queryParameters[P0.RESOURCE]=e,t.idType!==ew.SYSTEM_ASSIGNED)n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(t.idType,!0)]=t.id;return n.retryPolicy=new EBe,n}}});
export {jni,nYu,rYu,u0t,Yni};
