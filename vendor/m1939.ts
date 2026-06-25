// @ts-nocheck
import {ManagedIdentityCredential,K1r} from "./m1927.ts";
import {WorkloadIdentityCredential,k_n} from "./m1925.ts";
import {AzureDeveloperCliCredential,Y1r} from "./m1931.ts";
import {AzureCliCredential,j1r} from "./m1930.ts";
import {AzurePowerShellCredential,Q1r} from "./m1933.ts";
import {EnvironmentCredential,oNr} from "./m1938.ts";
import {b} from "../runtime.ts";
import {eNr,ChainedTokenCredential} from "./m1934.ts";
import {VS,Lp} from "./m1636.ts";
function UYu(e={}){var t,n,r,o;(t=e.retryOptions)!==null&&t!==void 0||(e.retryOptions={maxRetries:5,retryDelayInMs:800});let s=(n=e===null||e===void 0?void 0:e.managedIdentityClientId)!==null&&n!==void 0?n:process.env.AZURE_CLIENT_ID,i=(r=e===null||e===void 0?void 0:e.workloadIdentityClientId)!==null&&r!==void 0?r:s,a=e===null||e===void 0?void 0:e.managedIdentityResourceId,l=process.env.AZURE_FEDERATED_TOKEN_FILE,c=(o=e===null||e===void 0?void 0:e.tenantId)!==null&&o!==void 0?o:process.env.AZURE_TENANT_ID;if(a){let u=Object.assign(Object.assign({},e),{resourceId:a});return new ManagedIdentityCredential(u)}if(l&&i){let u=Object.assign(Object.assign({},e),{tenantId:c});return new ManagedIdentityCredential(i,u)}if(s){let u=Object.assign(Object.assign({},e),{clientId:s});return new ManagedIdentityCredential(u)}return new ManagedIdentityCredential(e)}
function $Yu(e){var t,n,r;let o=(t=e===null||e===void 0?void 0:e.managedIdentityClientId)!==null&&t!==void 0?t:process.env.AZURE_CLIENT_ID,s=(n=e===null||e===void 0?void 0:e.workloadIdentityClientId)!==null&&n!==void 0?n:o,i=process.env.AZURE_FEDERATED_TOKEN_FILE,a=(r=e===null||e===void 0?void 0:e.tenantId)!==null&&r!==void 0?r:process.env.AZURE_TENANT_ID;if(i&&s){let l=Object.assign(Object.assign({},e),{tenantId:a,clientId:s,tokenFilePath:i});return new WorkloadIdentityCredential(l)}if(a){let l=Object.assign(Object.assign({},e),{tenantId:a});return new WorkloadIdentityCredential(l)}return new WorkloadIdentityCredential(e)}
function qYu(e={}){let t=e.processTimeoutInMs;return new AzureDeveloperCliCredential(Object.assign({processTimeoutInMs:t},e))}
function WYu(e={}){let t=e.processTimeoutInMs;return new AzureCliCredential(Object.assign({processTimeoutInMs:t},e))}
function GYu(e={}){let t=e.processTimeoutInMs;return new AzurePowerShellCredential(Object.assign({processTimeoutInMs:t},e))}
function VYu(e={}){return new EnvironmentCredential(e)}
class ioi{constructor(e,t){this.credentialName=e,this.credentialUnavailableErrorMessage=t}getToken(){return sNr.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`),Promise.resolve(null)}}
var sNr,DefaultAzureCredential;
var iNr=b(()=>{K1r();j1r();Y1r();Q1r();eNr();oNr();k_n();VS();sNr=Lp("DefaultAzureCredential");DefaultAzureCredential=class DefaultAzureCredential extends ChainedTokenCredential{constructor(e){let t=process.env.AZURE_TOKEN_CREDENTIALS?process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase():void 0,n=[WYu,GYu,qYu],r=[VYu,$Yu,UYu],o=[];if(t)switch(t){case"dev":o=n;break;case"prod":o=r;break;default:{let i=`Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev'.`;throw sNr.warning(i),Error(i)}}else o=[...r,...n];let s=o.map((i)=>{try{return i(e)}catch(a){return sNr.warning(`Skipped ${i.name} because of an error creating the credential: ${a}`),new ioi(i.name,a.message)}});super(...s)}}});
export {UYu,$Yu,qYu,WYu,GYu,VYu,ioi,sNr,DefaultAzureCredential,iNr};
