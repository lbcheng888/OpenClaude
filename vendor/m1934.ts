// @ts-nocheck
import {ManagedIdentityCredential,hPr} from "./m1922.ts";
import {WorkloadIdentityCredential,Vfn} from "./m1920.ts";
import {AzureDeveloperCliCredential,yPr} from "./m1926.ts";
import {AzureCliCredential,_Pr} from "./m1925.ts";
import {AzurePowerShellCredential,bPr} from "./m1928.ts";
import {EnvironmentCredential,xPr} from "./m1933.ts";
import {b} from "../runtime.ts";
import {CPr,ChainedTokenCredential} from "./m1929.ts";
import {GS,hm} from "./m1631.ts";
function S6u(e={}){var t,n,r,o;(t=e.retryOptions)!==null&&t!==void 0||(e.retryOptions={maxRetries:5,retryDelayInMs:800});let s=(n=e===null||e===void 0?void 0:e.managedIdentityClientId)!==null&&n!==void 0?n:process.env.AZURE_CLIENT_ID,i=(r=e===null||e===void 0?void 0:e.workloadIdentityClientId)!==null&&r!==void 0?r:s,a=e===null||e===void 0?void 0:e.managedIdentityResourceId,l=process.env.AZURE_FEDERATED_TOKEN_FILE,c=(o=e===null||e===void 0?void 0:e.tenantId)!==null&&o!==void 0?o:process.env.AZURE_TENANT_ID;if(a){let u=Object.assign(Object.assign({},e),{resourceId:a});return new ManagedIdentityCredential(u)}if(l&&i){let u=Object.assign(Object.assign({},e),{tenantId:c});return new ManagedIdentityCredential(i,u)}if(s){let u=Object.assign(Object.assign({},e),{clientId:s});return new ManagedIdentityCredential(u)}return new ManagedIdentityCredential(e)}
function b6u(e){var t,n,r;let o=(t=e===null||e===void 0?void 0:e.managedIdentityClientId)!==null&&t!==void 0?t:process.env.AZURE_CLIENT_ID,s=(n=e===null||e===void 0?void 0:e.workloadIdentityClientId)!==null&&n!==void 0?n:o,i=process.env.AZURE_FEDERATED_TOKEN_FILE,a=(r=e===null||e===void 0?void 0:e.tenantId)!==null&&r!==void 0?r:process.env.AZURE_TENANT_ID;if(i&&s){let l=Object.assign(Object.assign({},e),{tenantId:a,clientId:s,tokenFilePath:i});return new WorkloadIdentityCredential(l)}if(a){let l=Object.assign(Object.assign({},e),{tenantId:a});return new WorkloadIdentityCredential(l)}return new WorkloadIdentityCredential(e)}
function E6u(e={}){let t=e.processTimeoutInMs;return new AzureDeveloperCliCredential(Object.assign({processTimeoutInMs:t},e))}
function C6u(e={}){let t=e.processTimeoutInMs;return new AzureCliCredential(Object.assign({processTimeoutInMs:t},e))}
function v6u(e={}){let t=e.processTimeoutInMs;return new AzurePowerShellCredential(Object.assign({processTimeoutInMs:t},e))}
function w6u(e={}){return new EnvironmentCredential(e)}
class dQs{constructor(e,t){this.credentialName=e,this.credentialUnavailableErrorMessage=t}getToken(){return kPr.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`),Promise.resolve(null)}}
var kPr,DefaultAzureCredential;
var HPr=b(()=>{hPr();_Pr();yPr();bPr();CPr();xPr();Vfn();GS();kPr=hm("DefaultAzureCredential");DefaultAzureCredential=class DefaultAzureCredential extends ChainedTokenCredential{constructor(e){let t=process.env.AZURE_TOKEN_CREDENTIALS?process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase():void 0,n=[C6u,v6u,E6u],r=[w6u,b6u,S6u],o=[];if(t)switch(t){case"dev":o=n;break;case"prod":o=r;break;default:{let i=`Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev'.`;throw kPr.warning(i),Error(i)}}else o=[...r,...n];let s=o.map((i)=>{try{return i(e)}catch(a){return kPr.warning(`Skipped ${i.name} because of an error creating the credential: ${a}`),new dQs(i.name,a.message)}});super(...s)}}});
export {S6u,b6u,E6u,C6u,v6u,w6u,dQs,kPr,DefaultAzureCredential,HPr};
