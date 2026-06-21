// @ts-nocheck
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
var LSs,RSr=(e)=>Boolean(e)&&typeof e==="object"&&typeof e.aws_access_key_id==="string"&&typeof e.aws_secret_access_key==="string"&&["undefined","string"].indexOf(typeof e.aws_session_token)>-1&&["undefined","string"].indexOf(typeof e.aws_account_id)>-1,xSr=async(e,t)=>{t?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");let n={accessKeyId:e.aws_access_key_id,secretAccessKey:e.aws_secret_access_key,sessionToken:e.aws_session_token,...e.aws_credential_scope&&{credentialScope:e.aws_credential_scope},...e.aws_account_id&&{accountId:e.aws_account_id}};return LSs.setCredentialFeature(n,"CREDENTIALS_PROFILE","n")};
var MSs=b(()=>{LSs=M(r0(),1)});
export {LSs,RSr,xSr,MSs};
