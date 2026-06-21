// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {fromEnv,ENV_SESSION,ENV_SECRET,ENV_KEY,ENV_EXPIRATION,ENV_CREDENTIAL_SCOPE,ENV_ACCOUNT_ID,ros} from "./m752.ts";
var oos={};
isFullscreenWithTTY(oos,{fromEnv:()=>fromEnv,ENV_SESSION:()=>ENV_SESSION,ENV_SECRET:()=>ENV_SECRET,ENV_KEY:()=>ENV_KEY,ENV_EXPIRATION:()=>ENV_EXPIRATION,ENV_CREDENTIAL_SCOPE:()=>ENV_CREDENTIAL_SCOPE,ENV_ACCOUNT_ID:()=>ENV_ACCOUNT_ID});
var Jnn=b(()=>{ros()});
export {oos,Jnn};
