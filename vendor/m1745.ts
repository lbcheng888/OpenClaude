// @ts-nocheck
import {cmn,EIr} from "./m1742.ts";
import {mJe,dIr} from "./m1722.ts";
import {Logger,Zpn,LogLevel} from "./m1723.ts";
import {TJe,vIr} from "./m1744.ts";
import {ProtocolMode,BRt} from "./m1734.ts";
import {b} from "../runtime.ts";
import {aC,dJe,Ho} from "./m1717.ts";
import {tmn,fJe} from "./m1724.ts";
import {nmn,AzureCloudInstance} from "./m1725.ts";
import {m0,ls} from "./m1721.ts";
import {LH,methodNotImplemented} from "./m1720.ts";
function jVs({authOptions:e,systemOptions:t,loggerOptions:n,cacheOptions:r,storageInterface:o,networkInterface:s,cryptoInterface:i,clientCredentials:a,libraryInfo:l,telemetry:c,serverTelemetryManager:u,persistencePlugin:d,serializableCache:p}){let m={...SBu,...n};return{authOptions:xBu(e),systemOptions:{...TBu,...t},loggerOptions:m,cacheOptions:{...bBu,...r},storageInterface:o||new cmn(e.clientId,mJe,new Logger(m),new TJe),networkInterface:s||EBu,cryptoInterface:i||mJe,clientCredentials:a||vBu,libraryInfo:{...CBu,...l},telemetry:{...RBu,...c},serverTelemetryManager:u||null,persistencePlugin:d||null,serializableCache:p||null}}
function xBu(e){return{clientCapabilities:[],azureCloudOptions:wBu,skipAuthorityMetadataCache:!1,instanceAware:!1,encodeExtraQueryParams:!1,...e}}
function umn(e){return e.authOptions.authority.options.protocolMode===ProtocolMode.OIDC}
var TBu,SBu,bBu,EBu,CBu,vBu,wBu,RBu;
var dmn=b(()=>{dIr();Zpn();aC();tmn();nmn();EIr();BRt();m0();vIr();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */TBu={tokenRenewalOffsetSeconds:dJe,preventCorsPreflight:!1},SBu={loggerCallback:()=>{},piiLoggingEnabled:!1,logLevel:LogLevel.Info,correlationId:Ho.EMPTY_STRING},bBu={claimsBasedCachingEnabled:!1},EBu={async sendGetRequestAsync(){throw ls(methodNotImplemented)},async sendPostRequestAsync(){throw ls(methodNotImplemented)}},CBu={sku:Ho.SKU,version:fJe,cpu:Ho.EMPTY_STRING,os:Ho.EMPTY_STRING},vBu={clientSecret:Ho.EMPTY_STRING,clientAssertion:void 0},wBu={azureCloudInstance:AzureCloudInstance.None,tenant:`${Ho.DEFAULT_COMMON_TENANT}`},RBu={application:{appName:"",appVersion:""}}});
export {jVs,xBu,umn,TBu,SBu,bBu,EBu,CBu,vBu,wBu,RBu,dmn};
