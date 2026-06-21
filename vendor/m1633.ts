// @ts-nocheck
import {CredentialUnavailableError,JD} from "./m1632.ts";
import {b} from "../runtime.ts";
function p1u(e){return`The current credential is not configured to acquire tokens for tenant ${e}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`}
function Av(e,t,n=[],r){var o;let s;if(process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH)s=e;else if(e==="adfs")s=e;else s=(o=t===null||t===void 0?void 0:t.tenantId)!==null&&o!==void 0?o:e;if(e&&s!==e&&!n.includes("*")&&!n.some((i)=>i.localeCompare(s)===0)){let i=p1u(s);throw r===null||r===void 0||r.info(i),new CredentialUnavailableError(i)}return s}
var C5s=b(()=>{JD()});
export {p1u,Av,C5s};
