// @ts-nocheck
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var j_s,validateSsoProfile=(e,t)=>{let{sso_start_url:n,sso_account_id:r,sso_region:o,sso_role_name:s}=e;if(!n||!r||!o||!s)throw new j_s.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(e).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,{tryNextLink:!1,logger:t});return e};
var jTr=b(()=>{j_s=M(createDefaultGlobalConfig(),1)});
export {j_s,validateSsoProfile,jTr};
