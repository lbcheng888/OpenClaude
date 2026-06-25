// @ts-nocheck
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
var Hws,nvr=(e)=>Boolean(e)&&typeof e==="object"&&typeof e.aws_access_key_id==="string"&&typeof e.aws_secret_access_key==="string"&&["undefined","string"].indexOf(typeof e.aws_session_token)>-1&&["undefined","string"].indexOf(typeof e.aws_account_id)>-1,rvr=async(e,t)=>{t?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");let n={accessKeyId:e.aws_access_key_id,secretAccessKey:e.aws_secret_access_key,sessionToken:e.aws_session_token,...e.aws_credential_scope&&{credentialScope:e.aws_credential_scope},...e.aws_account_id&&{accountId:e.aws_account_id}};return Hws.setCredentialFeature(n,"CREDENTIALS_PROFILE","n")};
var Iws=b(()=>{Hws=x(b0(),1)});
export {Hws,nvr,rvr,Iws};
