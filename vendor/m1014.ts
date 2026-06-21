// @ts-nocheck
import {UCt,HSr} from "./m1013.ts";
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
var jSs,WSs=(e)=>Boolean(e)&&typeof e==="object"&&typeof e.web_identity_token_file==="string"&&typeof e.role_arn==="string"&&["undefined","string"].indexOf(typeof e.role_session_name)>-1,GSs=async(e,t)=>Promise.resolve().then(() => (UCt(),HSr)).then(({fromTokenFile:n})=>n({webIdentityTokenFile:e.web_identity_token_file,roleArn:e.role_arn,roleSessionName:e.role_session_name,roleAssumerWithWebIdentity:t.roleAssumerWithWebIdentity,logger:t.logger,parentClientConfig:t.parentClientConfig})().then((r)=>jSs.setCredentialFeature(r,"CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN","q")));
var VSs=b(()=>{jSs=M(r0(),1)});
export {jSs,WSs,GSs,VSs};
