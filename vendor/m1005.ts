// @ts-nocheck
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
var ySs,TSs=(e,t,n)=>{if(t.Version!==1)throw Error(`Profile ${e} credential_process did not return Version 1.`);if(t.AccessKeyId===void 0||t.SecretAccessKey===void 0)throw Error(`Profile ${e} credential_process returned invalid credentials.`);if(t.Expiration){let s=new Date;if(new Date(t.Expiration)<s)throw Error(`Profile ${e} credential_process returned expired credentials.`)}let r=t.AccountId;if(!r&&n?.[e]?.aws_account_id)r=n[e].aws_account_id;let o={accessKeyId:t.AccessKeyId,secretAccessKey:t.SecretAccessKey,...t.SessionToken&&{sessionToken:t.SessionToken},...t.Expiration&&{expiration:new Date(t.Expiration)},...t.CredentialScope&&{credentialScope:t.CredentialScope},...r&&{accountId:r}};return ySs.setCredentialFeature(o,"CREDENTIALS_PROCESS","w"),o};
var SSs=b(()=>{ySs=M(r0(),1)});
export {ySs,TSs,SSs};
