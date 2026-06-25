// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var NAs,validateSsoProfile=(e,t)=>{let{sso_start_url:n,sso_account_id:r,sso_region:o,sso_role_name:s}=e;if(!n||!r||!o||!s)throw new NAs.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(e).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,{tryNextLink:!1,logger:t});return e};
var yRr=b(()=>{NAs=x(Vg(),1)});
export {NAs,validateSsoProfile,yRr};
