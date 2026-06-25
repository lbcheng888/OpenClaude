// @ts-nocheck
import {CredentialUnavailableError,cD} from "./m1637.ts";
import {b} from "../runtime.ts";
function xqu(e){return`The current credential is not configured to acquire tokens for tenant ${e}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`}
function EA(e,t,n=[],r){var o;let s;if(process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH)s=e;else if(e==="adfs")s=e;else s=(o=t===null||t===void 0?void 0:t.tenantId)!==null&&o!==void 0?o:e;if(e&&s!==e&&!n.includes("*")&&!n.some((i)=>i.localeCompare(s)===0)){let i=xqu(s);throw r===null||r===void 0||r.info(i),new CredentialUnavailableError(i)}return s}
var Tjs=b(()=>{cD()});
export {xqu,EA,Tjs};
