// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {fromEnv,ENV_SESSION,ENV_SECRET,ENV_KEY,ENV_EXPIRATION,ENV_CREDENTIAL_SCOPE,ENV_ACCOUNT_ID,Xcs} from "./m757.ts";
var Qcs={};
ft(Qcs,{fromEnv:()=>fromEnv,ENV_SESSION:()=>ENV_SESSION,ENV_SECRET:()=>ENV_SECRET,ENV_KEY:()=>ENV_KEY,ENV_EXPIRATION:()=>ENV_EXPIRATION,ENV_CREDENTIAL_SCOPE:()=>ENV_CREDENTIAL_SCOPE,ENV_ACCOUNT_ID:()=>ENV_ACCOUNT_ID});
var Psn=b(()=>{Xcs()});
export {Qcs,Psn};
