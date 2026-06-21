// @ts-nocheck
import {b} from "../runtime.ts";
import {EBe,W8} from "./m1890.ts";
import {bBe,y4} from "./m1887.ts";
import {_v,Qd,ManagedIdentitySourceNames,gv,h4,A0,qR} from "./m1778.ts";
import {QJs,wBe} from "./m1895.ts";
var ZJs="/metadata/identity/oauth2/token",Nqu,Bqu="2018-02-01",Nxt;
var eXs=b(()=>{EBe();bBe();_v();QJs();/*! @azure/msal-node v3.8.1 2025-10-29 */Nqu=`http://169.254.169.254${ZJs}`;Nxt=class Nxt extends y4{constructor(e,t,n,r,o,s){super(e,t,n,r,o);this.identityEndpoint=s}static tryCreate(e,t,n,r,o){let s;if(process.env[Qd.AZURE_POD_IDENTITY_AUTHORITY_HOST])e.info(`[Managed Identity] Environment variable ${Qd.AZURE_POD_IDENTITY_AUTHORITY_HOST} for ${ManagedIdentitySourceNames.IMDS} returned endpoint: ${process.env[Qd.AZURE_POD_IDENTITY_AUTHORITY_HOST]}`),s=Nxt.getValidatedEnvVariableUrlString(Qd.AZURE_POD_IDENTITY_AUTHORITY_HOST,`${process.env[Qd.AZURE_POD_IDENTITY_AUTHORITY_HOST]}${ZJs}`,ManagedIdentitySourceNames.IMDS,e);else e.info(`[Managed Identity] Unable to find ${Qd.AZURE_POD_IDENTITY_AUTHORITY_HOST} environment variable for ${ManagedIdentitySourceNames.IMDS}, using the default endpoint.`),s=Nqu;return new Nxt(e,t,n,r,o,s)}createRequest(e,t){let n=new W8(gv.GET,this.identityEndpoint);if(n.headers[h4.METADATA_HEADER_NAME]="true",n.queryParameters[A0.API_VERSION]=Bqu,n.queryParameters[A0.RESOURCE]=e,t.idType!==qR.SYSTEM_ASSIGNED)n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(t.idType,!0)]=t.id;return n.retryPolicy=new wBe,n}}});
export {ZJs,Nqu,Bqu,Nxt,eXs};
