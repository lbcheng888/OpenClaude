// @ts-nocheck
import {mwt,svr} from "./m1018.ts";
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
var Nws,Fws=(e)=>Boolean(e)&&typeof e==="object"&&typeof e.web_identity_token_file==="string"&&typeof e.role_arn==="string"&&["undefined","string"].indexOf(typeof e.role_session_name)>-1,Bws=async(e,t)=>Promise.resolve().then(() => (mwt(),svr)).then(({fromTokenFile:n})=>n({webIdentityTokenFile:e.web_identity_token_file,roleArn:e.role_arn,roleSessionName:e.role_session_name,roleAssumerWithWebIdentity:t.roleAssumerWithWebIdentity,logger:t.logger,parentClientConfig:t.parentClientConfig})().then((r)=>Nws.setCredentialFeature(r,"CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN","q")));
var Uws=b(()=>{Nws=x(b0(),1)});
export {Nws,Fws,Bws,Uws};
