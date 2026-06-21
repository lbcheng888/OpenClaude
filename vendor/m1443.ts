// @ts-nocheck
import {nwr,twr} from "./m1350.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {dYe,uYe} from "./m1442.ts";
import {b} from "../runtime.ts";
function o$s(e){return e?.name==="CredentialsProviderError"}
function r$s(e){if(!e||typeof e!=="object")return!1;let t=e;return typeof t.AccessKeyId==="string"&&typeof t.SecretAccessKey==="string"&&typeof t.SessionToken==="string"&&t.AccessKeyId.length>0&&t.SecretAccessKey.length>0&&t.SessionToken.length>0}
function s$s(e){if(!e||typeof e!=="object")return null;let t=e;if(r$s(t.Credentials))return t.Credentials;if(r$s(t))return t;return null}
async function i$s(){let{STSClient:e,GetCallerIdentityCommand:t}=await Promise.resolve().then(() => (nwr(),twr));await new e().send(new t({}))}
async function a$s(){try{logForDebugging("Clearing AWS credential provider cache");let{fromIni:e}=await Promise.resolve().then(() => (dYe(),uYe));await e({ignoreCache:!0})(),logForDebugging("AWS credential provider cache refreshed")}catch(e){logForDebugging("Failed to clear AWS credential cache (this is expected if no credentials are configured)")}}
var mRr=b(()=>{qe()});
export {o$s,r$s,s$s,i$s,a$s,mRr};
