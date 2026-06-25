// @ts-nocheck
import {BIt,CQs} from "./m1785.ts";
import {LR,$It} from "./m1789.ts";
import {fMr,wQs} from "./m1788.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
import {Co} from "./m1722.ts";
import {ProtocolMode} from "./m1739.ts";
import {AzureCloudInstance} from "./m1730.ts";
import {LogLevel} from "./m1728.ts";
function kQs({auth:e,broker:t,cache:n,system:r,telemetry:o}){let s={...rWu,networkClient:new BIt(r?.proxyUrl,r?.customAgentOptions),loggerOptions:r?.loggerOptions||hMr,disableInternalRetries:r?.disableInternalRetries||!1};if(!!e.clientCertificate&&!e.clientCertificate.thumbprint&&!e.clientCertificate.thumbprintSha256)throw LR.createStateNotFoundError();return{auth:{...tWu,...e},broker:{...t},cache:{...nWu,...n},system:{...s,...r},telemetry:{...oWu,...o}}}
function HQs({clientCapabilities:e,managedIdentityIdParams:t,system:n}){let r=new fMr(t),o=n?.loggerOptions||hMr,s;if(n?.networkClient)s=n.networkClient;else s=new BIt(n?.proxyUrl,n?.customAgentOptions);return{clientCapabilities:e||[],managedIdentityId:r,system:{loggerOptions:o,networkClient:s},disableInternalRetries:n?.disableInternalRetries||!1}}
var tWu,nWu,hMr,rWu,oWu;
var gMr=b(()=>{iT();CQs();wQs();$It();/*! @azure/msal-node v3.8.1 2025-10-29 */tWu={clientId:Co.EMPTY_STRING,authority:Co.DEFAULT_AUTHORITY,clientSecret:Co.EMPTY_STRING,clientAssertion:Co.EMPTY_STRING,clientCertificate:{thumbprint:Co.EMPTY_STRING,thumbprintSha256:Co.EMPTY_STRING,privateKey:Co.EMPTY_STRING,x5c:Co.EMPTY_STRING},knownAuthorities:[],cloudDiscoveryMetadata:Co.EMPTY_STRING,authorityMetadata:Co.EMPTY_STRING,clientCapabilities:[],protocolMode:ProtocolMode.AAD,azureCloudOptions:{azureCloudInstance:AzureCloudInstance.None,tenant:Co.EMPTY_STRING},skipAuthorityMetadataCache:!1,encodeExtraQueryParams:!1},nWu={claimsBasedCachingEnabled:!1},hMr={loggerCallback:()=>{},piiLoggingEnabled:!1,logLevel:LogLevel.Info},rWu={loggerOptions:hMr,networkClient:new BIt,proxyUrl:Co.EMPTY_STRING,customAgentOptions:{},disableInternalRetries:!1},oWu={application:{appName:Co.EMPTY_STRING,appVersion:Co.EMPTY_STRING}}});
export {kQs,HQs,tWu,nWu,hMr,rWu,oWu,gMr};
