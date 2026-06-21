// @ts-nocheck
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var Xrs,Qrs,ENV_KEY="AWS_ACCESS_KEY_ID",ENV_SECRET="AWS_SECRET_ACCESS_KEY",ENV_SESSION="AWS_SESSION_TOKEN",ENV_EXPIRATION="AWS_CREDENTIAL_EXPIRATION",ENV_CREDENTIAL_SCOPE="AWS_CREDENTIAL_SCOPE",ENV_ACCOUNT_ID="AWS_ACCOUNT_ID",fromEnv=(e)=>async()=>{e?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");let t=process.env[ENV_KEY],n=process.env[ENV_SECRET],r=process.env[ENV_SESSION],o=process.env[ENV_EXPIRATION],s=process.env[ENV_CREDENTIAL_SCOPE],i=process.env[ENV_ACCOUNT_ID];if(t&&n){let a={accessKeyId:t,secretAccessKey:n,...r&&{sessionToken:r},...o&&{expiration:new Date(o)},...s&&{credentialScope:s},...i&&{accountId:i}};return Xrs.setCredentialFeature(a,"CREDENTIALS_ENV_VARS","g"),a}throw new Qrs.CredentialsProviderError("Unable to find environment variable credentials.",{logger:e?.logger})};
var ros=b(()=>{Xrs=M(r0(),1),Qrs=M(createDefaultGlobalConfig(),1)});
export {Xrs,Qrs,ENV_KEY,ENV_SECRET,ENV_SESSION,ENV_EXPIRATION,ENV_CREDENTIAL_SCOPE,ENV_ACCOUNT_ID,fromEnv,ros};
