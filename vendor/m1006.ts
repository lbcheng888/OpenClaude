// @ts-nocheck
import {TSs,SSs} from "./m1005.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
import {I2} from "./m600.ts";
var Wsn,bSs,ESs,CSs,vSs=async(e,t,n)=>{let r=t[e];if(t[e]){let o=r.credential_process;if(o!==void 0){let s=CSs.promisify(bSs.externalDataInterceptor?.getTokenRecord?.().exec??ESs.exec);try{let{stdout:i}=await s(o),a;try{a=JSON.parse(i.trim())}catch{throw Error(`Profile ${e} credential_process returned invalid JSON.`)}return TSs(e,a,t)}catch(i){throw new Wsn.CredentialsProviderError(i.message,{logger:n})}}else throw new Wsn.CredentialsProviderError(`Profile ${e} did not contain credential_process.`,{logger:n})}else throw new Wsn.CredentialsProviderError(`Profile ${e} could not be found in shared credentials file.`,{logger:n})};
var wSs=b(()=>{SSs();Wsn=M(createDefaultGlobalConfig(),1),bSs=M(I2(),1),ESs=require("child_process"),CSs=require("util")});
export {Wsn,bSs,ESs,CSs,vSs,wSs};
