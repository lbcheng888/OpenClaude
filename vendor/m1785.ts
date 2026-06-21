// @ts-nocheck
import {pxt,x7s} from "./m1780.ts";
import {Iw,fxt} from "./m1784.ts";
import {B0r,D7s} from "./m1783.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
import {Ho} from "./m1717.ts";
import {ProtocolMode} from "./m1734.ts";
import {AzureCloudInstance} from "./m1725.ts";
import {LogLevel} from "./m1723.ts";
function P7s({auth:e,broker:t,cache:n,system:r,telemetry:o}){let s={...BFu,networkClient:new pxt(r?.proxyUrl,r?.customAgentOptions),loggerOptions:r?.loggerOptions||F0r,disableInternalRetries:r?.disableInternalRetries||!1};if(!!e.clientCertificate&&!e.clientCertificate.thumbprint&&!e.clientCertificate.thumbprintSha256)throw Iw.createStateNotFoundError();return{auth:{...MFu,...e},broker:{...t},cache:{...NFu,...n},system:{...s,...r},telemetry:{...FFu,...o}}}
function O7s({clientCapabilities:e,managedIdentityIdParams:t,system:n}){let r=new B0r(t),o=n?.loggerOptions||F0r,s;if(n?.networkClient)s=n.networkClient;else s=new pxt(n?.proxyUrl,n?.customAgentOptions);return{clientCapabilities:e||[],managedIdentityId:r,system:{loggerOptions:o,networkClient:s},disableInternalRetries:n?.disableInternalRetries||!1}}
var MFu,NFu,F0r,BFu,FFu;
var U0r=b(()=>{AT();x7s();D7s();fxt();/*! @azure/msal-node v3.8.1 2025-10-29 */MFu={clientId:Ho.EMPTY_STRING,authority:Ho.DEFAULT_AUTHORITY,clientSecret:Ho.EMPTY_STRING,clientAssertion:Ho.EMPTY_STRING,clientCertificate:{thumbprint:Ho.EMPTY_STRING,thumbprintSha256:Ho.EMPTY_STRING,privateKey:Ho.EMPTY_STRING,x5c:Ho.EMPTY_STRING},knownAuthorities:[],cloudDiscoveryMetadata:Ho.EMPTY_STRING,authorityMetadata:Ho.EMPTY_STRING,clientCapabilities:[],protocolMode:ProtocolMode.AAD,azureCloudOptions:{azureCloudInstance:AzureCloudInstance.None,tenant:Ho.EMPTY_STRING},skipAuthorityMetadataCache:!1,encodeExtraQueryParams:!1},NFu={claimsBasedCachingEnabled:!1},F0r={loggerCallback:()=>{},piiLoggingEnabled:!1,logLevel:LogLevel.Info},BFu={loggerOptions:F0r,networkClient:new pxt,proxyUrl:Ho.EMPTY_STRING,customAgentOptions:{},disableInternalRetries:!1},FFu={application:{appName:Ho.EMPTY_STRING,appVersion:Ho.EMPTY_STRING}}});
export {P7s,O7s,MFu,NFu,F0r,BFu,FFu,U0r};
