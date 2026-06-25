// @ts-nocheck
import {xIr,IIr} from "./m1355.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {lXe,aXe} from "./m1447.ts";
import {b} from "../runtime.ts";
function Z6s(e){return e?.name==="CredentialsProviderError"}
function Q6s(e){if(!e||typeof e!=="object")return!1;let t=e;return typeof t.AccessKeyId==="string"&&typeof t.SecretAccessKey==="string"&&typeof t.SessionToken==="string"&&t.AccessKeyId.length>0&&t.SecretAccessKey.length>0&&t.SessionToken.length>0}
function e5s(e){if(!e||typeof e!=="object")return null;let t=e;if(Q6s(t.Credentials))return t.Credentials;if(Q6s(t))return t;return null}
async function t5s(){let{STSClient:e,GetCallerIdentityCommand:t}=await Promise.resolve().then(() => (xIr(),IIr));await new e().send(new t({}))}
async function n5s(){try{logForDebugging("Clearing AWS credential provider cache");let{fromIni:e}=await Promise.resolve().then(() => (lXe(),aXe));await e({ignoreCache:!0})(),logForDebugging("AWS credential provider cache refreshed")}catch(e){logForDebugging("Failed to clear AWS credential cache (this is expected if no credentials are configured)")}}
var q0r=b(()=>{qe()});
export {Z6s,Q6s,e5s,t5s,n5s,q0r};
