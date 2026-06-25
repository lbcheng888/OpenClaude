// @ts-nocheck
import {Vhn,ZOr} from "./m1747.ts";
import {dQe,$Or} from "./m1727.ts";
import {Logger,Lhn,LogLevel} from "./m1728.ts";
import {yQe,tLr} from "./m1749.ts";
import {ProtocolMode,dIt} from "./m1739.ts";
import {b} from "../runtime.ts";
import {dC,cQe,Co} from "./m1722.ts";
import {Nhn,pQe} from "./m1729.ts";
import {Fhn,AzureCloudInstance} from "./m1730.ts";
import {x0,jo} from "./m1726.ts";
import {uI,methodNotImplemented} from "./m1725.ts";
function FXs({authOptions:e,systemOptions:t,loggerOptions:n,cacheOptions:r,storageInterface:o,networkInterface:s,cryptoInterface:i,clientCredentials:a,libraryInfo:l,telemetry:c,serverTelemetryManager:u,persistencePlugin:d,serializableCache:p}){let m={...U5u,...n};return{authOptions:z5u(e),systemOptions:{...B5u,...t},loggerOptions:m,cacheOptions:{...$5u,...r},storageInterface:o||new Vhn(e.clientId,dQe,new Logger(m),new yQe),networkInterface:s||q5u,cryptoInterface:i||dQe,clientCredentials:a||G5u,libraryInfo:{...W5u,...l},telemetry:{...K5u,...c},serverTelemetryManager:u||null,persistencePlugin:d||null,serializableCache:p||null}}
function z5u(e){return{clientCapabilities:[],azureCloudOptions:V5u,skipAuthorityMetadataCache:!1,instanceAware:!1,encodeExtraQueryParams:!1,...e}}
function Khn(e){return e.authOptions.authority.options.protocolMode===ProtocolMode.OIDC}
var B5u,U5u,$5u,q5u,W5u,G5u,V5u,K5u;
var zhn=b(()=>{$Or();Lhn();dC();Nhn();Fhn();ZOr();dIt();x0();tLr();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */B5u={tokenRenewalOffsetSeconds:cQe,preventCorsPreflight:!1},U5u={loggerCallback:()=>{},piiLoggingEnabled:!1,logLevel:LogLevel.Info,correlationId:Co.EMPTY_STRING},$5u={claimsBasedCachingEnabled:!1},q5u={async sendGetRequestAsync(){throw jo(methodNotImplemented)},async sendPostRequestAsync(){throw jo(methodNotImplemented)}},W5u={sku:Co.SKU,version:pQe,cpu:Co.EMPTY_STRING,os:Co.EMPTY_STRING},G5u={clientSecret:Co.EMPTY_STRING,clientAssertion:void 0},V5u={azureCloudInstance:AzureCloudInstance.None,tenant:`${Co.DEFAULT_COMMON_TENANT}`},K5u={application:{appName:"",appVersion:""}}});
export {FXs,z5u,Khn,B5u,U5u,$5u,q5u,W5u,G5u,V5u,K5u,zhn};
